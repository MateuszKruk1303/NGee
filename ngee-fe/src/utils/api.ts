import axios from 'axios'
import { loginApi } from './login'
import { postApi } from './posts'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
})

export default {
  ...loginApi(axiosInstance),
  ...postApi(axiosInstance),
}
