import { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUserModel extends Document {
  name: string
  email: string
  photo: string
  password: string
  passwordConfirm: string
  accountActivationHash: string
  activated: boolean
  emergencyId: string
  isAdmin: boolean
  notifications: string[]
  comparePasswords: (incomingPassword: string, userPassword: string) => boolean
}

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  email: {
    type: String,
    required: [true, 'name is required'],
    unique: [true, 'this email is not available'],
    lowercase: true,
  },
  photo: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'confirm your password'],
    validate: {
      validator: async function (this: IUserModel, el: string) {
        return await (el === this.password)
      },
      message: 'passwords are not the same!',
    },
  },
  accountActivationHash: {
    type: String,
  },
  activated: {
    type: Boolean,
  },
  emergencyId: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  },
  notifications: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Notification',
    },
  ],
})

userSchema.pre('save', async function (this: IUserModel, next: any) {
  this.password = await bcrypt.hash(this.password, 12)
  this.passwordConfirm = ''
  next()
})

userSchema.methods.comparePasswords = async function (
  incomingPassword: string,
  userPassword: string
) {
  return bcrypt.compare(incomingPassword, userPassword) as Promise<boolean>
}

export const UserModel = model('User', userSchema)
