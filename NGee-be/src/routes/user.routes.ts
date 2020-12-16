import express from 'express'
import { UserController } from '../controllers/user.controller'
import { profileMulter } from '../utils/multer'

const router = express.Router()

router.route('/signup').post(UserController.signUp)
router.route('/login').post(UserController.login)
router
  .route('/uploadPhoto')
  .post(
    UserController.Authorize,
    profileMulter.single('profileimage'),
    UserController.uploadPhoto
  )
router.route('/activate').post(UserController.activateProfile)
router
  .route('/changeemail')
  .post(UserController.Authorize, UserController.changeEmail)
router
  .route('/changepassword')
  .post(UserController.Authorize, UserController.changePassword)
router
  .route('/changenickname')
  .post(UserController.Authorize, UserController.changeNickname)
router
  .route('/deleteaccount')
  .post(UserController.Authorize, UserController.deleteAccount)
router.route('/orderresetpassword').post(UserController.orderResetPassword)
router.route('/resetpassword').post(UserController.resetPassword)
router
  .route('/getnotifications')
  .post(UserController.Authorize, UserController.getNotifications)
router
  .route('/notificationupdate')
  .post(UserController.Authorize, UserController.notificationUpdate)

export default router
