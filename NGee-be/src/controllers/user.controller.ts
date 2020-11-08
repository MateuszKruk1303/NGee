import { UserModel, IUserModel } from '../models/user.model'
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { promisify } from 'util'

const generateJwt = (id: string) => {
  return jwt.sign({ id }, process.env['JWT_SECRET'] as string, {
    expiresIn: process.env['JWT_EXPIRES_IN'],
  })
}

export abstract class UserController {
  public static async signUp(req: Request, res: Response) {
    try {
      const newUser = (await UserModel.create({
        name: req.body.name,
        email: req.body.email,
        photo: req.body.photo,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
      })) as IUserModel

      const token = generateJwt(newUser.id)

      res.status(201).json({
        token,
        data: {
          name: newUser.name,
          userId: newUser.id,
        },
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({ status: err })
    }
  }
  public static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      if (!email || !password) throw 'password and email are required'

      const user: IUserModel | null = (await UserModel.findOne({
        email: email,
      })) as IUserModel

      if (!user) throw 'Fail'

      const correct: boolean = await user!.comparePasswords(
        password,
        user!.password
      )

      if (correct) {
        const token = generateJwt(user.id)
        res.status(201).json({
          token,
          data: {
            name: user.name,
            userId: user.id,
          },
        })
      } else throw 'Fail'
    } catch (err) {
      console.log(err)
      res.status(500).json({ status: err })
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

        const verified = (await promisify(jwt.verify)(
          //IIFE | jwt.verify jest asynchroniczne i przyjmuje callback jako argument
          //Funkcja jest dziwna, ponieważ nie zwraca wartości bezpośrednio, ale do callbacka który jest przekazywany jako 3-ci argument
          // wtedy jeżeli chcemy wykorzystać wartość verified, to trzeba robić to w callbacku, a tego nie chcemy...
          token,
          process.env['JWT_SECRET'] as string
        )) as { id: string; iat: number; exp: number }

        const isUserAlive = await UserModel.findById(verified.id)

        if (!isUserAlive) throw 'there is no user with that id'
      } else {
        throw 'token is required'
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({ status: err })
    }
    next()
  }
}
