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
  getNotifications: '/user/getnotifications',
  updateNotification: '/user/notificationupdate',
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

export interface IGetNotifications {
  userId: string
}
export interface INotificationUpdate {
  userId: string
  notificationId: string
}

const headers = {
  'Content-Type': 'multipart/form-data',
}

export const loginApi = (
  axiosInstance: AxiosInstance,
  axiosInstanceAuth: AxiosInstance
) => ({
  async login(data: ILogin) {
    return axiosInstance.post(apiPaths.login, data)
  },
  async register(data: IRegister) {
    return axiosInstance.post(apiPaths.signup, data)
  },
  async uploadPhoto(data: FormData) {
    return axiosInstanceAuth.post(apiPaths.uploadPhoto, data, { headers })
  },
  async activateAccount(data: IActivateAccount) {
    return axiosInstance.post(apiPaths.activateAccount, data)
  },
  async changeEmail(data: IChangeEmail) {
    return axiosInstanceAuth.post(apiPaths.changeEmail, data)
  },
  async changePassword(data: IChangePassword) {
    return axiosInstanceAuth.post(apiPaths.changePassword, data)
  },
  async changeNickname(data: IChangeNickname) {
    return axiosInstanceAuth.post(apiPaths.changeNickname, data)
  },
  async deleteAccount(data: IDeleteAccount) {
    return axiosInstanceAuth.post(apiPaths.deleteAccount, data)
  },
  async orderResetPassword(data: IOrderResetPassword) {
    return axiosInstance.post(apiPaths.orderResetPassword, data)
  },
  async resetPassword(data: IResetPassword) {
    return axiosInstance.post(apiPaths.resetPassword, data)
  },
  async getNotifications(data: IGetNotifications) {
    return axiosInstanceAuth.post(apiPaths.getNotifications, data)
  },
  async notificationUpdate(data: INotificationUpdate) {
    return axiosInstanceAuth.post(apiPaths.updateNotification, data)
  },
})
