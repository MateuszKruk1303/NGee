import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  ILogin,
  IRegister,
  IActivateAccount,
  IChangeEmail,
  IChangePassword,
  IChangeNickname,
  IDeleteAccount,
  IResetPassword,
  IOrderResetPassword,
} from '../../utils/login'
import api from '../../utils/api'

interface ILoginUserInfoResponse {
  name: string
  userId: string
  photo: string
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

export const uploadPhoto = createAsyncThunk<
  { response: { data: { photo: string } } },
  { dto: FormData },
  { rejectValue: string }
>('uploadPhoto', async ({ dto }, thunkAPI) => {
  try {
    const response = await api.uploadPhoto(dto)
    return { response: response.data }
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const activateAccount = createAsyncThunk<
  { response: { status: string } },
  { dto: IActivateAccount },
  { rejectValue: string }
>('activateAccount', async ({ dto }, thunkAPI) => {
  try {
    const response = await api.activateAccount(dto)
    return { response: response.data }
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})
export const changeEmail = createAsyncThunk<
  { response: { status: string } },
  { dto: IChangeEmail },
  { rejectValue: string }
>('changeEmail', async ({ dto }, thunkAPI) => {
  try {
    const response = await api.changeEmail(dto)
    return { response: response.data }
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})
export const changePassword = createAsyncThunk<
  { response: { status: string } },
  { dto: IChangePassword },
  { rejectValue: string }
>('changePassword', async ({ dto }, thunkAPI) => {
  try {
    const response = await api.changePassword(dto)
    return { response: response.data }
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})
export const changeNickname = createAsyncThunk<
  { response: { data: { name: string } } },
  { dto: IChangeNickname },
  { rejectValue: string }
>('changeNickname', async ({ dto }, thunkAPI) => {
  try {
    const response = await api.changeNickname(dto)
    return { response: response.data }
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})
export const deleteAccount = createAsyncThunk<
  { response: { status: string } },
  { dto: IDeleteAccount },
  { rejectValue: string }
>('deleteAccount', async ({ dto }, thunkAPI) => {
  try {
    const response = await api.deleteAccount(dto)
    return { response: response.data }
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})
export const orderResetPassword = createAsyncThunk<
  { response: { status: string } },
  { dto: IOrderResetPassword },
  { rejectValue: string }
>('orderResetPassword', async ({ dto }, thunkAPI) => {
  try {
    const response = await api.orderResetPassword(dto)
    return { response: response.data }
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})
export const resetPassword = createAsyncThunk<
  { response: { status: string } },
  { dto: IResetPassword },
  { rejectValue: string }
>('resetPassword', async ({ dto }, thunkAPI) => {
  try {
    const response = await api.resetPassword(dto)
    return { response: response.data }
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})
