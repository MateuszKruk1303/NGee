import { IInitialLoginState } from '../types'

export const profilePicturePath = (photo: string) =>
  `${process.env.REACT_APP_BACKEND_URL}/profilePictures/${photo}`

export const normalizeImagePath = (imagePath: string) => {
  if (imagePath) return imagePath.split('/')[imagePath.split('/').length - 1]
  return null
}

export const clearForLogout = (state: IInitialLoginState) => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('name')
  localStorage.removeItem('photo')
  localStorage.removeItem('isAdmin')
  localStorage.removeItem('isBanned')
  state.name = null
  state.userId = null
  state.profilePicture = null
  state.isAdmin = null
  state.isBanned = null
  state.isLoading = false
  state.error = null
}
