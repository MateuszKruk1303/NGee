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
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    photo: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    passwordConfirm: {
        type: String,
        required: true,
        validate: {
            validator: function (el) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield (el === this.password);
                });
            },
            message: 'Hasła się nie zgadzają',
        },
    },
    accountActivationHash: {
        type: String,
    },
    activated: {
        type: Boolean,
    },
    emergencyId: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
    },
    isBanned: {
        type: Boolean,
    },
    notifications: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Notification',
        },
    ],
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcryptjs_1.default.hash(this.password, 12);
        this.passwordConfirm = '';
        next();
    });
});
userSchema.methods.comparePasswords = function (incomingPassword, userPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcryptjs_1.default.compare(incomingPassword, userPassword);
    });
};
exports.UserModel = mongoose_1.model('User', userSchema);
//# sourceMappingURL=user.model.js.map