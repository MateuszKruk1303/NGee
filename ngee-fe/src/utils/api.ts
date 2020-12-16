import axios from 'axios'
import { loginApi } from './login'
import { postApi } from './posts'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
})

const axiosInstanceAuth = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
})

const createHeaders = () => {
  const token = localStorage.getItem('token')
  return `Bearer ${token}`
}

axiosInstanceAuth.interceptors.request.use(
  async config => {
    const token = createHeaders()
    config.headers.Authorization = token
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default {
  ...loginApi(axiosInstance, axiosInstanceAuth),
  ...postApi(axiosInstance, axiosInstanceAuth),
}
