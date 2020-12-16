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
  IGetNotifications,
  INotificationUpdate,
} from '../../utils/login'
import { Notification } from '../types'
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

interface IGetNotificationsResponse {
  data: {
    notifications: Notification[]
  }
}
interface INotificationUpdateResponse {
  data: {
    notificationId: string
  }
}

export const getNotifications = createAsyncThunk<
  { response: IGetNotificationsResponse },
  { dto: IGetNotifications },
  { rejectValue: any }
>('getNotifications', async ({ dto }, thunkAPI) => {
  try {
    const response = await api.getNotifications(dto)
    return { response: response.data }
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})
export const notificationUpdate = createAsyncThunk<
  { response: INotificationUpdateResponse },
  { dto: INotificationUpdate },
  { rejectValue: any }
>('notificationUpdate', async ({ dto }, thunkAPI) => {
  try {
    const response = await api.notificationUpdate(dto)
    return { response: response.data }
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})

export const login = createAsyncThunk<
  { response: ILoginResponse },
  { dto: ILogin },
  { rejectValue: any }
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
  { rejectValue: any }
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
  { rejectValue: any }
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
  { rejectValue: any }
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
  { rejectValue: any }
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
  { rejectValue: any }
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
  { rejectValue: any }
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
  { rejectValue: any }
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
  { rejectValue: any }
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
  { rejectValue: any }
>('resetPassword', async ({ dto }, thunkAPI) => {
  try {
    const response = await api.resetPassword(dto)
    return { response: response.data }
  } catch (err) {
    return thunkAPI.rejectWithValue(err)
  }
})
