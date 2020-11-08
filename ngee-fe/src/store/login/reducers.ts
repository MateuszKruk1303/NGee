import { createReducer, createSlice, createAction } from '@reduxjs/toolkit'
import { IinitialLoginState } from '../types'
import { login, register } from './thunks'

const initialLoginState: IinitialLoginState = {
  name: localStorage.getItem('name'),
  userId: localStorage.getItem('userId'),
  isLoading: false,
  error: null,
}

export const logout = createAction<any>('logout')

export default createReducer(initialLoginState, builder => {
  builder
    .addCase(login.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(login.fulfilled, (state, { payload }) => {
      localStorage.setItem('token', payload.response.token)
      localStorage.setItem('userId', payload.response.data.userId)
      localStorage.setItem('name', payload.response.data.name)
      state.name = payload.response.data.name
      state.userId = payload.response.data.userId
      state.isLoading = false
      state.error = null
    })
    .addCase(login.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload
    })
    .addCase(register.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(register.fulfilled, (state, { payload }) => {
      localStorage.setItem('token', payload.response.token)
      localStorage.setItem('userId', payload.response.data.userId)
      localStorage.setItem('name', payload.response.data.name)
      state.name = payload.response.data.name
      state.userId = payload.response.data.userId
      state.isLoading = false
      state.error = null
    })
    .addCase(register.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload
    })
    .addCase(logout, state => {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('name')
      state.name = null
      state.userId = null
    })
})
