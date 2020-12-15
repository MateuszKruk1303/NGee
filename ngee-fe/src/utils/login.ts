import { AxiosInstance } from 'axios'

const apiPaths = {
  login: '/user/login',
  signup: '/user/signup',
  uploadPhoto: '/user/uploadPhoto',
  getPhoto: '/profilePictures',
  activateAccount: '/user/activate',
  changeEmail: '/user/changeemail',
  changePassword: '/user/changepassword',
  changeNickname: '/user/changenickname',
  deleteAccount: '/user/deleteaccount',
  orderResetPassword: '/user/orderresetpassword',
  resetPassword: '/user/resetpassword',
}

export interface ILogin {
  email: string
  password: string
}

export interface IRegister {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

export interface IActivateAccount {
  activationHash: string
}

export interface IChangeEmail {
  userId: string
  email: string
  password: string
}
export interface IChangePassword {
  userId: string
  oldPassword: string
  newPassword: string
  newPasswordConfirm: string
}
export interface IChangeNickname {
  userId: string
  newNickname: string
  password: string
}
export interface IDeleteAccount {
  userId: string
  password: string
}

export interface IOrderResetPassword {
  email: string
}
export interface IResetPassword {
  emergencyId: string
  newPassword: string
  newPasswordConfirm: string
}

const headers = {
  'Content-Type': 'multipart/form-data',
}

export const loginApi = (axiosInstance: AxiosInstance) => ({
  async login(data: ILogin) {
    return axiosInstance.post(apiPaths.login, data)
  },
  async register(data: IRegister) {
    return axiosInstance.post(apiPaths.signup, data)
  },
  async uploadPhoto(data: FormData) {
    return axiosInstance.post(apiPaths.uploadPhoto, data, { headers })
  },
  async activateAccount(data: IActivateAccount) {
    return axiosInstance.post(apiPaths.activateAccount, data)
  },
  async changeEmail(data: IChangeEmail) {
    return axiosInstance.post(apiPaths.changeEmail, data)
  },
  async changePassword(data: IChangePassword) {
    return axiosInstance.post(apiPaths.changePassword, data)
  },
  async changeNickname(data: IChangeNickname) {
    return axiosInstance.post(apiPaths.changeNickname, data)
  },
  async deleteAccount(data: IDeleteAccount) {
    return axiosInstance.post(apiPaths.deleteAccount, data)
  },
  async orderResetPassword(data: IOrderResetPassword) {
    return axiosInstance.post(apiPaths.orderResetPassword, data)
  },
  async resetPassword(data: IResetPassword) {
    return axiosInstance.post(apiPaths.resetPassword, data)
  },
})
