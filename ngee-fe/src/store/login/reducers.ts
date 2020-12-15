import { createReducer, createAction } from '@reduxjs/toolkit'
import { IInitialLoginState } from '../types'
import {
  login,
  register,
  uploadPhoto,
  activateAccount,
  changeEmail,
  changePassword,
  changeNickname,
  deleteAccount,
  resetPassword,
  orderResetPassword,
} from './thunks'
import { profilePicturePath, clearForLogout } from './utils'

const initialLoginState: IInitialLoginState = {
  name: localStorage.getItem('name'),
  userId: localStorage.getItem('userId'),
  profilePicture: localStorage.getItem('photo'),
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
      if (payload.response.data.photo) {
        localStorage.setItem(
          'photo',
          profilePicturePath(payload.response.data.photo)
        )
        state.profilePicture = profilePicturePath(payload.response.data.photo)
      }
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
    .addCase(register.fulfilled, state => {
      state.isLoading = false
      state.error = null
    })
    .addCase(register.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload
    })
    .addCase(logout, state => {
      clearForLogout(state)
    })
    .addCase(uploadPhoto.pending, state => {
      state.profilePicture = null
      state.isLoading = true
      state.error = null
    })
    .addCase(uploadPhoto.fulfilled, (state, { payload }) => {
      state.profilePicture = profilePicturePath(payload.response.data.photo)
      localStorage.setItem(
        'photo',
        profilePicturePath(payload.response.data.photo)
      )
      state.isLoading = false
      state.error = null
    })
    .addCase(uploadPhoto.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload
    })
    .addCase(activateAccount.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(activateAccount.fulfilled, state => {
      state.isLoading = false
      state.error = null
    })
    .addCase(activateAccount.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload
    })
    .addCase(changeEmail.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(changeEmail.fulfilled, state => {
      clearForLogout(state)
    })
    .addCase(changeEmail.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload
    })
    .addCase(changePassword.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(changePassword.fulfilled, state => {
      state.isLoading = false
      state.error = null
    })
    .addCase(changePassword.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload
    })
    .addCase(changeNickname.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(changeNickname.fulfilled, (state, { payload }) => {
      state.name = payload.response.data.name
      localStorage.setItem('name', payload.response.data.name)
      state.isLoading = false
      state.error = null
    })
    .addCase(changeNickname.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload
    })
    .addCase(deleteAccount.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(deleteAccount.fulfilled, state => {
      clearForLogout(state)
    })
    .addCase(deleteAccount.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload
    })
    .addCase(resetPassword.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(resetPassword.fulfilled, state => {
      state.isLoading = false
      state.error = null
    })
    .addCase(resetPassword.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload
    })
    .addCase(orderResetPassword.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(orderResetPassword.fulfilled, state => {
      state.isLoading = false
      state.error = null
    })
    .addCase(orderResetPassword.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload
    })
})
