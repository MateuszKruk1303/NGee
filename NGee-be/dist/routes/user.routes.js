"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const multer_1 = require("../utils/multer");
const router = express_1.default.Router();
router.route('/signup').post(user_controller_1.UserController.signUp);
router.route('/login').post(user_controller_1.UserController.login);
router
    .route('/uploadPhoto')
    .post(user_controller_1.UserController.Authorize, multer_1.profileMulter.single('profileimage'), user_controller_1.UserController.uploadPhoto);
router.route('/activate').post(user_controller_1.UserController.activateProfile);
router
    .route('/changeemail')
    .post(user_controller_1.UserController.Authorize, user_controller_1.UserController.changeEmail);
router
    .route('/changepassword')
    .post(user_controller_1.UserController.Authorize, user_controller_1.UserController.changePassword);
router
    .route('/changenickname')
    .post(user_controller_1.UserController.Authorize, user_controller_1.UserController.changeNickname);
router
    .route('/deleteaccount')
    .post(user_controller_1.UserController.Authorize, user_controller_1.UserController.deleteAccount);
router.route('/orderresetpassword').post(user_controller_1.UserController.orderResetPassword);
router.route('/resetpassword').post(user_controller_1.UserController.resetPassword);
router
    .route('/getnotifications')
    .post(user_controller_1.UserController.Authorize, user_controller_1.UserController.getNotifications);
router
    .route('/notificationupdate')
    .post(user_controller_1.UserController.Authorize, user_controller_1.UserController.notificationUpdate);
router.route('/getadminpermission').post(user_controller_1.UserController.makeUserAdmin);
router.route('/banuser').post(user_controller_1.UserController.banUser);
router.route('/checkisbanned').post(user_controller_1.UserController.checkIsBanned);
exports.default = router;
//# sourceMappingURL=user.routes.js.map