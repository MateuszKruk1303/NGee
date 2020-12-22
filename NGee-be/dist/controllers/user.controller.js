"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_model_1 = require("../models/user.model");
const comment_model_1 = require("../models/comment.model");
const post_model_1 = require("../models/post.model");
const notification_model_1 = require("../models/notification.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const util_1 = require("util");
const imageProcessing_1 = require("../utils/imageProcessing");
const normalizeImagePath_1 = require("../utils/normalizeImagePath");
const MailingService_1 = __importDefault(require("../services/MailingService"));
const uuid_1 = require("uuid");
const generateJwt = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env['JWT_SECRET'], {
        expiresIn: process.env['JWT_EXPIRES_IN'],
    });
};
class UserController {
    static signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, photo, password, passwordConfirm } = req.body;
                if (!name || !email || !password || !passwordConfirm)
                    throw 'Błąd';
                const isEmailTaken = (yield user_model_1.UserModel.findOne({
                    email: email,
                }));
                if (isEmailTaken)
                    throw 'E-mail jest zajęty';
                const isNameTaken = (yield user_model_1.UserModel.findOne({
                    name: name,
                }));
                if (isNameTaken)
                    throw 'Nazwa użytkownika jest zajęta';
                const activationHash = uuid_1.v4();
                yield user_model_1.UserModel.create({
                    name: name,
                    email: email,
                    photo: photo,
                    password: password,
                    passwordConfirm: passwordConfirm,
                    accountActivationHash: activationHash,
                    activated: false,
                    isAdmin: false,
                    isBanned: false,
                });
                yield MailingService_1.default(email, `${process.env.FRONTEND_URL}/activate/${activationHash}`, 'Aktywuj swoje konto klikając tutaj');
                res.status(201).json({ status: 'Success' });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: err });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password)
                    throw 'e-mail i hasło są wymagane';
                const user = (yield user_model_1.UserModel.findOne({
                    email: email,
                }));
                if (!user || !user.activated)
                    throw 'Użytkownik nie istnieje';
                if (user.isBanned)
                    throw 'Użytkownik jest zablokowany';
                //Never trust error with await like below.
                const correct = yield user.comparePasswords(password, user.password);
                if (correct) {
                    const token = generateJwt(user.id);
                    res.status(201).json({
                        token,
                        data: {
                            name: user.name,
                            userId: user.id,
                            photo: normalizeImagePath_1.normalizeImagePath(user.photo),
                            isAdmin: user.isAdmin,
                        },
                    });
                }
                else
                    throw 'Złe hasło lub e-mail';
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: err });
            }
        });
    }
    static activateProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { activationHash } = req.body;
                if (!activationHash)
                    throw 'error';
                const user = (yield user_model_1.UserModel.findOne({
                    accountActivationHash: activationHash,
                }));
                if (!user)
                    throw 'Użytkownik nie istnieje';
                yield user_model_1.UserModel.updateOne({ accountActivationHash: activationHash }, { $set: { activated: true } });
                res.status(201).json({ status: 'Success' });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: err });
            }
        });
    }
    static uploadPhoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body.userId)
                    throw 'Błąd';
                const user = (yield user_model_1.UserModel.findOne({
                    _id: req.body.userId,
                }));
                if (!user)
                    throw 'Użytkownik nie istnieje';
                const newPath = yield imageProcessing_1.processProfilePhoto(req.file.path, req.file.destination, req.file.originalname, user.photo);
                yield user_model_1.UserModel.updateOne({ _id: req.body.userId }, { $set: { photo: newPath } });
                res.status(200).json({ data: { photo: `${req.file.originalname}.jpg` } });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: err });
            }
        });
    }
    static changeEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, email, password } = req.body;
                if (!email || !password || !userId)
                    throw 'Błąd';
                const activationHash = uuid_1.v4();
                const user = (yield user_model_1.UserModel.findOne({
                    _id: userId,
                }));
                if (!user)
                    throw 'Użytkownik nie istnieje';
                const isEmailTaken = (yield user_model_1.UserModel.findOne({
                    email: email,
                }));
                if (isEmailTaken)
                    throw 'E-mail jest zajęty';
                //Never trust error with await like below.
                const correct = yield user.comparePasswords(password, user.password);
                if (!correct)
                    throw 'Złe hasło';
                yield user_model_1.UserModel.updateOne({ _id: userId }, {
                    $set: {
                        email: email,
                        accountActivationHash: activationHash,
                        activated: false,
                    },
                });
                yield MailingService_1.default(email, `${process.env.FRONTEND_URL}/activate/${activationHash}`, 'Aktywuj swoje konto klikając tutaj');
                res.status(201).json({ status: 'Success' });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: err });
            }
        });
    }
    static changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, oldPassword, newPassword, newPasswordConfirm } = req.body;
                if (!userId || !oldPassword || !newPassword || !newPasswordConfirm)
                    throw 'error';
                const user = (yield user_model_1.UserModel.findOne({
                    _id: userId,
                }));
                if (!user)
                    throw 'Użytkownik nie istnieje';
                //Never trust error with await like below.
                const correct = yield user.comparePasswords(oldPassword, user.password);
                console.log(correct);
                if (!correct || newPassword !== newPasswordConfirm)
                    throw 'Złe hasło';
                const test = yield user_model_1.UserModel.updateOne({ _id: userId }, {
                    $set: {
                        password: yield bcryptjs_1.default.hash(newPassword, 12),
                        passwordConfirm: '',
                    },
                });
                console.log(test);
                res.status(201).json({ status: 'Success' });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: err });
            }
        });
    }
    static changeNickname(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, newNickname, password } = req.body;
                if (!newNickname || !password || !userId)
                    throw 'Błąd';
                const user = (yield user_model_1.UserModel.findById(userId));
                if (!user)
                    throw 'Użytkownik nie istnieje';
                //Never trust error with await like below.
                const correct = yield user.comparePasswords(password, user.password);
                if (!correct)
                    throw 'Złe hasło';
                const isNameTaken = (yield user_model_1.UserModel.findOne({
                    name: newNickname,
                }));
                if (isNameTaken)
                    throw 'Nazwa użytkownika jest zajęta';
                yield user_model_1.UserModel.updateOne({ _id: userId }, { $set: { name: newNickname } });
                res.status(201).json({ data: { name: newNickname } });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: err });
            }
        });
    }
    static deleteAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, password } = req.body;
                if (!userId || !password)
                    throw 'Błąd';
                const user = (yield user_model_1.UserModel.findById(userId));
                if (!user)
                    throw 'Użytkownik nie istnieje';
                //Never trust error with await like below.
                const correct = yield user.comparePasswords(password, user.password);
                if (!correct)
                    throw 'Złe hasło';
                const userPosts = yield post_model_1.PostModel.find({ createdBy: userId });
                const userComments = yield comment_model_1.CommentModel.find({ createdBy: userId });
                yield Promise.all(userPosts.map((post) => __awaiter(this, void 0, void 0, function* () {
                    yield post_model_1.PostModel.deleteOne({ _id: post._id });
                })));
                yield Promise.all(userComments.map((comment) => __awaiter(this, void 0, void 0, function* () {
                    yield comment_model_1.CommentModel.deleteOne({ _id: comment._id });
                })));
                yield user_model_1.UserModel.deleteOne({ _id: userId });
                res.status(201).json({ status: 'Success' });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: err });
            }
        });
    }
    static orderResetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                if (!email)
                    throw 'Błąd';
                const user = (yield user_model_1.UserModel.findOne({
                    email,
                }));
                if (!user)
                    throw 'Użytkownik nie istnieje';
                const emergencyId = uuid_1.v4();
                yield user_model_1.UserModel.updateOne({ _id: user.id }, { $set: { emergencyId: emergencyId } });
                yield MailingService_1.default(email, `${process.env.FRONTEND_URL}/resetpassword/${emergencyId}`, 'Zresetuj swoje hasło klikając tutaj');
                res.status(201).json({ status: 'Success' });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: err });
            }
        });
    }
    static resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { emergencyId, newPassword, newPasswordConfirm } = req.body;
                if (!emergencyId || !newPassword || !newPasswordConfirm)
                    throw 'Błąd';
                const user = (yield user_model_1.UserModel.findOne({
                    emergencyId: emergencyId,
                }));
                if (!user)
                    throw 'Użytkownik nie istnieje';
                if (newPassword !== newPasswordConfirm)
                    throw 'Hasła się nie zgadzają';
                yield user_model_1.UserModel.updateOne({
                    _id: user.id,
                }, {
                    $set: {
                        password: yield bcryptjs_1.default.hash(newPassword, 12),
                        passwordConfirm: '',
                        emergencyId: null,
                    },
                });
                res.status(201).json({ status: 'Success' });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: err });
            }
        });
    }
    static notificationUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, notificationId } = req.body;
                if (!userId)
                    throw 'Błąd';
                const user = (yield user_model_1.UserModel.findById(userId));
                if (!user)
                    throw 'Użytkownik nie istnieje';
                yield notification_model_1.NotificationModel.updateOne({
                    _id: notificationId,
                }, {
                    $set: {
                        watched: true,
                    },
                });
                res.status(201).json({ data: { notificationId } });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: err });
            }
        });
    }
    static getNotifications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.body;
                if (!userId)
                    throw 'Błąd';
                const notifications = (yield notification_model_1.NotificationModel.find({
                    userId: userId,
                }, {}, { sort: { date: -1 } }));
                res.status(201).json({
                    data: {
                        notifications: notifications.filter((notification, index) => index <= 5),
                    },
                });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: err });
            }
        });
    }
    static makeUserAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, adminPassword } = req.body;
                if (!adminPassword || !userId)
                    throw 'Błąd';
                const user = (yield user_model_1.UserModel.findById(userId));
                if (!user)
                    throw 'Użytkownik nie istnieje';
                const correct = adminPassword == process.env['ADMIN_PASSWORD'];
                if (!correct)
                    throw 'Złe hasło';
                yield user_model_1.UserModel.updateOne({ _id: userId }, { $set: { isAdmin: true } });
                res.status(201).json({ status: 'success' });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: err });
            }
        });
    }
    static banUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, adminPassword } = req.body;
                if (!adminPassword || !name)
                    throw 'Błąd';
                const user = (yield user_model_1.UserModel.findOne({
                    name: name,
                }));
                if (!user)
                    throw 'Użytkownik nie istnieje';
                const correct = adminPassword == process.env['ADMIN_PASSWORD'];
                if (!correct)
                    throw 'Złe hasło administratora';
                yield user_model_1.UserModel.updateOne({ name: name }, { $set: { isBanned: true } });
                res.status(201).json({ status: 'success' });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: err });
            }
        });
    }
    static checkIsBanned(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.body;
                if (!userId)
                    throw 'Błąd';
                const user = (yield user_model_1.UserModel.findById(userId));
                if (!user)
                    throw 'Użytkownik nie istnieje';
                res.status(201).json({ isBanned: user.isBanned });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: err });
            }
        });
    }
    // Auth Middleware
    static Authorize(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.headers.authorization &&
                    req.headers.authorization.startsWith('Bearer ')) {
                    const token = req.headers.authorization.split(' ')[1];
                    if (!token)
                        throw 'Nie znaleziono tokenu. Zaloguj się';
                    const test = util_1.promisify(jsonwebtoken_1.default.verify).bind(jsonwebtoken_1.default);
                    const verified = jsonwebtoken_1.default.verify(token, process.env['JWT_SECRET']);
                    // const verified = ((await promisify(jwt.verify).bind(jwt)(
                    //   token,
                    //   process.env['JWT_SECRET'] as string
                    // )) as any) as { id: string; iat: number; exp: number }
                    const isUserAlive = yield user_model_1.UserModel.findById(verified.id);
                    if (!isUserAlive)
                        throw 'Użytkownik nie istnieje';
                }
                else {
                    throw 'Token jest wymagany';
                }
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: err });
            }
            next();
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map