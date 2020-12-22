"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const serverError_1 = require("./utils/serverError");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: './process.env' });
const DB = process.env['DB_URL'];
mongoose_1.default.connect(DB);
const app = express_1.default();
app.use(cors_1.default());
app.use('/profilePictures', express_1.default.static(path_1.default.resolve(`./src/images/ClientUploads/ProfilePictures/`)));
app.use('/postPictures', express_1.default.static(path_1.default.resolve(`./src/images/ClientUploads/PostPictures/`)));
app.use(express_1.default.json());
app.use('/user', user_routes_1.default);
app.use('/posts', post_routes_1.default);
app.all('*', (req, res, next) => {
    next(new serverError_1.ServerError(`Nie znaleziono ${req.originalUrl}!`, 404));
});
app.use(serverError_1.ErrorHandler);
app.listen(process.env['PORT'], () => {
    console.log(`Serwer wystartował na porcie ${process.env['PORT']}`);
});
//# sourceMappingURL=app.js.map