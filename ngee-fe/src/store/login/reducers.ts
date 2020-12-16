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
  getNotifications,
  notificationUpdate,
} from './thunks'
import { profilePicturePath, clearForLogout } from './utils'

const initialLoginState: IInitialLoginState = {
  name: localStorage.getItem('name'),
  userId: localStorage.getItem('userId'),
  profilePicture: localStorage.getItem('photo'),
  isLoading: false,
  error: null,
  message: null,
  notifications: [],
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
      if (payload) state.error = payload.response.data.error
    })
    .addCase(register.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(register.fulfilled, state => {
      state.isLoading = false
      state.error = null
      state.message = 'Email sent'
      state.message = null
    })
    .addCase(register.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload.response.data.error
    })
    .addCase(logout, state => {
      window.location.replace('/')
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
      if (payload) state.error = payload.response.data.error
    })
    .addCase(activateAccount.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(activateAccount.fulfilled, state => {
      state.isLoading = false
      state.error = null
      state.message = 'Account activated'
      state.message = null
      window.location.replace('/')
    })
    .addCase(activateAccount.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload.response.data.error
    })
    .addCase(changeEmail.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(changeEmail.fulfilled, state => {
      state.message = 'Account activated'
      clearForLogout(state)
    })
    .addCase(changeEmail.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload.response.data.error
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
      if (payload) state.error = payload.response.data.error
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
      if (payload) state.error = payload.response.data.error
    })
    .addCase(deleteAccount.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(deleteAccount.fulfilled, state => {
      state.message = 'Account deleted'
      state.message = null
      clearForLogout(state)
    })
    .addCase(deleteAccount.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload.response.data.error
    })
    .addCase(resetPassword.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(resetPassword.fulfilled, state => {
      state.isLoading = false
      state.error = null
      state.message = 'Password has been reseted!'
      state.message = null
      window.location.replace('/')
    })
    .addCase(resetPassword.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload.response.data.error
    })
    .addCase(orderResetPassword.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(orderResetPassword.fulfilled, state => {
      state.isLoading = false
      state.error = null
      state.message = 'Email sent'
      state.message = null
    })
    .addCase(orderResetPassword.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload.response.data.error
    })
    .addCase(getNotifications.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(getNotifications.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = null
      state.notifications = payload.response.data.notifications.map(
        notification => ({
          ...notification,
          notificationId: notification._id,
          date: new Date(notification.date),
        })
      )
    })
    .addCase(getNotifications.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload.response.data.error
    })
    .addCase(notificationUpdate.pending, state => {
      state.isLoading = true
      state.error = null
    })
    .addCase(notificationUpdate.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.error = null
      state.notifications.map(notification => {
        if (
          notification.notificationId === payload.response.data.notificationId
        )
          notification.watched = true
      })
    })
    .addCase(notificationUpdate.rejected, (state, { payload }) => {
      state.isLoading = false
      if (payload) state.error = payload.response.data.error
    })
})
