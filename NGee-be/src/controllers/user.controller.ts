import { UserModel, IUserModel } from '../models/user.model'
import { CommentModel, ICommentModel } from '../models/comment.model'
import { PostModel, IPostModel } from '../models/post.model'
import {
  NotificationModel,
  INotificationModel,
} from '../models/notification.model'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Request, Response, NextFunction } from 'express'
import { promisify } from 'util'
import { processProfilePhoto } from '../utils/imageProcessing'
import { normalizeImagePath } from '../utils/normalizeImagePath'
import mailSender from '../services/MailingService'
import { v4 } from 'uuid'

const generateJwt = (id: string) => {
  return jwt.sign({ id }, process.env['JWT_SECRET'] as string, {
    expiresIn: process.env['JWT_EXPIRES_IN'],
  })
}

export class UserController {
  public static async signUp(req: Request, res: Response) {
    try {
      const { name, email, photo, password, passwordConfirm } = req.body
      if (!name || !email || !password || !passwordConfirm) throw 'error'
      const activationHash = v4()
      await UserModel.create({
        name: name,
        email: email,
        photo: photo,
        password: password,
        passwordConfirm: passwordConfirm,
        accountActivationHash: activationHash,
        activated: false,
        isAdmin: false,
      })
      await mailSender(
        email,
        `${process.env.FRONTEND_URL}/activate/${activationHash}`,
        'Activate your account here'
      )
      res.status(201).json({ status: 'Success' })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  }
  public static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      if (!email || !password) throw 'password and email are required'

      const user: IUserModel | null = (await UserModel.findOne({
        email: email,
      })) as IUserModel
      if (!user || !user.activated) throw 'User does not exist'
      //Never trust error with await like below.
      const correct: boolean = await user.comparePasswords(
        password,
        user.password
      )
      if (correct) {
        const token = generateJwt(user.id)
        res.status(201).json({
          token,
          data: {
            name: user.name,
            userId: user.id,
            photo: normalizeImagePath(user.photo),
          },
        })
      } else throw 'Wrong password or email'
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  }
  public static async activateProfile(req: Request, res: Response) {
    try {
      const { activationHash } = req.body
      if (!activationHash) throw 'error'
      const user = (await UserModel.findOne({
        accountActivationHash: activationHash,
      })) as IUserModel
      if (!user) throw new Error('Fail')
      await UserModel.updateOne(
        { accountActivationHash: activationHash },
        { $set: { activated: true } }
      )
      res.status(201).json({ status: 'Success' })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  }
  public static async uploadPhoto(req: Request, res: Response) {
    try {
      if (!req.body.userId) throw 'error'
      const user = (await UserModel.findOne({
        _id: req.body.userId,
      })) as IUserModel
      if (!user) throw 'Fail'
      const newPath = await processProfilePhoto(
        req.file.path,
        req.file.destination,
        req.file.originalname,
        user.photo
      )
      await UserModel.updateOne(
        { _id: req.body.userId },
        { $set: { photo: newPath } }
      )
      res.status(200).json({ data: { photo: `${req.file.originalname}.jpg` } })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  }
  public static async changeEmail(req: Request, res: Response) {
    try {
      const { userId, email, password } = req.body
      if (!email || !password || !userId) throw 'error'
      const activationHash = v4()

      const user = (await UserModel.findOne({
        _id: userId,
      })) as IUserModel
      if (!user) throw 'There is no user with this id'
      const isEmailTaken = (await UserModel.findOne({
        email: email,
      })) as IUserModel

      if (isEmailTaken) throw 'Email taken'
      //Never trust error with await like below.
      const correct: boolean = await user!.comparePasswords(
        password,
        user.password
      )
      if (!correct) throw 'Wrong Password'
      await UserModel.updateOne(
        { _id: userId },
        {
          $set: {
            email: email,
            accountActivationHash: activationHash,
            activated: false,
          },
        }
      )
      await mailSender(
        email,
        `${process.env.FRONTEND_URL}/activate/${activationHash}`,
        'Activate your account here'
      )
      res.status(201).json({ status: 'Success' })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  }
  public static async changePassword(req: Request, res: Response) {
    try {
      const { userId, oldPassword, newPassword, newPasswordConfirm } = req.body
      if (!userId || !oldPassword || !newPassword || !newPasswordConfirm)
        throw 'error'
      const user = (await UserModel.findOne({
        _id: userId,
      })) as IUserModel
      console.log(req.body)
      if (!user) throw 'There is no user with this id'
      //Never trust error with await like below.
      const correct: boolean = await user!.comparePasswords(
        oldPassword,
        user.password
      )
      console.log(correct)
      if (!correct || newPassword !== newPasswordConfirm) throw 'Wrong Password'
      const test = await UserModel.updateOne(
        { _id: userId },
        {
          $set: {
            password: await bcrypt.hash(newPassword, 12),
            passwordConfirm: '',
          },
        }
      )
      console.log(test)
      res.status(201).json({ status: 'Success' })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  }
  public static async changeNickname(req: Request, res: Response) {
    try {
      const { userId, newNickname, password } = req.body
      if (!newNickname || !password || !userId) throw 'error'
      const user = (await UserModel.findById(userId)) as IUserModel
      if (!user) throw 'There is no user with this id'
      //Never trust error with await like below.
      const correct: boolean = await user!.comparePasswords(
        password,
        user.password
      )
      if (!correct) throw 'Wrong Password'
      await UserModel.updateOne(
        { _id: userId },
        { $set: { name: newNickname } }
      )
      res.status(201).json({ data: { name: newNickname } })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  }
  public static async deleteAccount(req: Request, res: Response) {
    try {
      const { userId, password } = req.body
      if (!userId || !password) throw 'error'
      const user = (await UserModel.findById(userId)) as IUserModel
      if (!user) throw 'There is no user with this id'
      //Never trust error with await like below.
      const correct: boolean = await user!.comparePasswords(
        password,
        user.password
      )
      if (!correct) throw 'Wrong Password'
      const userPosts = await PostModel.find({ createdBy: userId })
      const userComments = await CommentModel.find({ createdBy: userId })
      await Promise.all(
        userPosts.map(async (post) => {
          await PostModel.deleteOne({ _id: post._id })
        })
      )
      await Promise.all(
        userComments.map(async (comment) => {
          await CommentModel.deleteOne({ _id: comment._id })
        })
      )
      await UserModel.deleteOne({ _id: userId })
      res.status(201).json({ status: 'Success' })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  }

  public static async orderResetPassword(req: Request, res: Response) {
    try {
      const { email } = req.body
      if (!email) throw 'error'
      const user = (await UserModel.findOne({
        email,
      })) as IUserModel
      if (!user) throw 'There is no user with this id'
      const emergencyId = v4()
      await UserModel.updateOne(
        { _id: user.id },
        { $set: { emergencyId: emergencyId } }
      )
      await mailSender(
        email,
        `${process.env.FRONTEND_URL}/resetpassword/${emergencyId}`,
        'Reset your password here'
      )
      res.status(201).json({ status: 'Success' })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  }

  public static async resetPassword(req: Request, res: Response) {
    try {
      const { emergencyId, newPassword, newPasswordConfirm } = req.body
      if (!emergencyId || !newPassword || !newPasswordConfirm) throw 'error'
      const user = (await UserModel.findOne({
        emergencyId: emergencyId,
      })) as IUserModel
      if (!user) throw 'There is no user with this id'
      if (newPassword !== newPasswordConfirm) throw 'Passwords are wrong'
      await UserModel.updateOne(
        {
          _id: user.id,
        },
        {
          $set: {
            password: await bcrypt.hash(newPassword, 12),
            passwordConfirm: '',
            emergencyId: null,
          },
        }
      )
      res.status(201).json({ status: 'Success' })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  }
  public static async notificationUpdate(req: Request, res: Response) {
    try {
      const { userId, notificationId } = req.body
      if (!userId) throw 'error'
      const user = (await UserModel.findById(userId)) as IUserModel
      if (!user) throw 'There is no user with this id'
      await NotificationModel.updateOne(
        {
          _id: notificationId,
        },
        {
          $set: {
            watched: true,
          },
        }
      )
      res.status(201).json({ data: { notificationId } })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  }

  public static async getNotifications(req: Request, res: Response) {
    try {
      const { userId } = req.body
      if (!userId) throw 'error'
      const notifications = ((await NotificationModel.find(
        {
          userId: userId,
        },
        {},
        { sort: { date: -1 } }
      )) as unknown) as INotificationModel[]
      console.log(notifications)
      res.status(201).json({
        data: {
          notifications: notifications.filter(
            (notification, index) => index <= 5
          ),
        },
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  }

  // Auth Middleware
  public static async Authorize(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')
      ) {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) throw 'Token not found, please log in'

        const verified = ((await promisify(jwt.verify)(
          token,
          process.env['JWT_SECRET'] as string
        )) as unknown) as { id: string; iat: number; exp: number }

        const isUserAlive = await UserModel.findById(verified.id)

        if (!isUserAlive) throw 'there is no user with that id'
      } else {
        throw 'token is required'
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
    next()
  }
}
