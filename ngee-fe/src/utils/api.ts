import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081',
})

export const apiPaths = {
  items: '/items',
  login: '/user/login',
  signup: '/user/signup',
}

export interface ILogin {
  email: string
  password: string
}

export interface IRegister {
  name: string
  email: string
  photo?: string
  password: string
  passwordConfirm: string
}

export const api = {
  async getAllItems() {
    return axiosInstance.get(apiPaths.items)
  },
  async login(data: ILogin) {
    return axiosInstance.post(apiPaths.login, data)
  },
  async register(data: IRegister) {
    return axiosInstance.post(apiPaths.signup, data)
  },
}
