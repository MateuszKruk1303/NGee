import express from 'express'
import { UserController } from '../controllers/user.controller'

const router = express.Router()

router.route('/signup').post(UserController.signUp)
router.route('/login').post(UserController.login)

export default router
