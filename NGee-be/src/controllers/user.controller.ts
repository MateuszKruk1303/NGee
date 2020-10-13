import { UserModel, IUserModel } from '../models/user.model'
import jwt from 'jsonwebtoken'

export default abstract class UserController {
  public static async signUp(req: any, res: any) {
    try {
      const newUser = (await UserModel.create({
        name: req.body.name,
        email: req.body.email,
        photo: req.body.photo,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
      })) as IUserModel

      const token = jwt.sign(
        { id: newUser._id },
        process.env['JWT_SECRET'] as string,
        {
          expiresIn: process.env['JWT_EXPIRES_IN'],
        }
      )

      res.status(201).json({
        token,
        data: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          photo: newUser.photo,
        },
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({ status: 'Error' })
    }
  }
  public static async login(req: any, res: any) {
    try {
      const { email, password } = req.body
      if (!email || !password) throw 'password and email are required'

      const user: IUserModel | null = (await UserModel.findOne({
        email: email,
      })) as IUserModel

      if (!user) throw 'Fail'

      console.log(user)

      const correct: boolean = await user!.comparePasswords(
        password,
        user!.password
      )
      console.log(correct)

      if (correct) {
        const token = jwt.sign(
          { id: user!._id },
          process.env['JWT_SECRET'] as string,
          {
            expiresIn: process.env['JWT_EXPIRES_IN'],
          }
        )
        res.status(201).json({
          token,
        })
      } else throw 'Fail'
    } catch (err) {
      console.log(err)
      res.status(500).json({ status: err })
    }
  }
}
