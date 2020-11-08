import { createAsyncThunk } from '@reduxjs/toolkit'
import { api, ILogin, IRegister } from '../../utils/api'

interface ILoginUserInfoResponse {
  name: string
  userId: string
}

interface ILoginResponse {
  token: string
  data: ILoginUserInfoResponse
}

export const login = createAsyncThunk<
  { response: ILoginResponse },
  { dto: ILogin },
  { rejectValue: string }
>('login', async ({ dto }, thunkAPI) => {
  try {
    const response = await api.login(dto)
    return { response: response.data }
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const register = createAsyncThunk<
  { response: ILoginResponse },
  { dto: IRegister },
  { rejectValue: string }
>('register', async ({ dto }, thunkAPI) => {
  try {
    const response = await api.register(dto)
    return { response: response.data }
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})
