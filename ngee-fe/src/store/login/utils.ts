import { IInitialLoginState } from '../types'

export const profilePicturePath = (photo: string) =>
  `${process.env.REACT_APP_BACKEND_URL}/profilePictures/${photo}`

export const clearForLogout = (state: IInitialLoginState) => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('name')
  localStorage.removeItem('photo')
  state.name = null
  state.userId = null
  state.profilePicture = null
  state.isLoading = false
  state.error = null
}
