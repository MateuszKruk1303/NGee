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
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.default = (clientEmail, link, linkText) => __awaiter(void 0, void 0, void 0, function* () {
    let transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: process.env['EMAIL'],
            pass: process.env['EMAIL_PASS'],
        },
    });
    let info = yield transporter.sendMail({
        from: process.env['EMAIL'],
        to: `${clientEmail}`,
        subject: 'Nie odpowiadaj na tego e-maila',
        html: `<a href="${link}">${linkText}</link>`,
    });
});
//# sourceMappingURL=MailingService.js.map