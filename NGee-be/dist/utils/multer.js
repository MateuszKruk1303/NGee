"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMulter = exports.profileMulter = void 0;
const multer_1 = __importDefault(require("multer"));
const profilePictureStorage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './src/images/ClientUploads/ProfilePictures/');
    },
    filename: (req, file, callback) => {
        const ext = file.mimetype.split('/')[1];
        callback(null, `${file.originalname}.${ext}`);
    },
});
const postPictureStorage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './src/images/ClientUploads/PostPictures/');
    },
    filename: (req, file, callback) => {
        const ext = file.mimetype.split('/')[1];
        callback(null, `${file.originalname}.${ext}`);
    },
});
exports.profileMulter = multer_1.default({
    storage: profilePictureStorage,
    fileFilter: (req, file, callback) => {
        if (file.mimetype.startsWith('image'))
            callback(null, true);
    },
});
exports.postMulter = multer_1.default({
    storage: postPictureStorage,
    fileFilter: (req, file, callback) => {
        if (file.mimetype.startsWith('image'))
            callback(null, true);
    },
});
//# sourceMappingURL=multer.js.map