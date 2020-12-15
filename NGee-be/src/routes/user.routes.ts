import express from 'express'
import { UserController } from '../controllers/user.controller'
import { profileMulter } from '../utils/multer'

const router = express.Router()

router.route('/signup').post(UserController.signUp)
router.route('/login').post(UserController.login)
router
  .route('/uploadPhoto')
  .post(profileMulter.single('profileimage'), UserController.uploadPhoto)
router.route('/activate').post(UserController.activateProfile)
router.route('/changeemail').post(UserController.changeEmail)
router.route('/changepassword').post(UserController.changePassword)
router.route('/changenickname').post(UserController.changeNickname)
router.route('/deleteaccount').post(UserController.deleteAccount)
router.route('/orderresetpassword').post(UserController.orderResetPassword)
router.route('/resetpassword').post(UserController.resetPassword)

export default router
