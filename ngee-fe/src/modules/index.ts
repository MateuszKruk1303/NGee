import Home from './Home'
import UserProfile from './UserProfile'
import ActivateAccount from './ActivateAccountPage'
import ResetPasswordPage from './ResetPasswordPage'
import PostPage from './PostPage'

export const modules = [
  Home,
  UserProfile,
  ActivateAccount,
  ResetPasswordPage,
  PostPage,
]

export const routes = [
  '/',
  '/UserProfile',
  '/activate/:activationHash',
  '/resetpassword/:emergencyId',
  '/post/:postId',
]
