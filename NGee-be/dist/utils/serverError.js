"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = exports.ServerError = void 0;
class ServerError extends Error {
    constructor(message, code) {
        super(message);
        this.statusCode = code;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ServerError = ServerError;
exports.ErrorHandler = (err, req, res, next) => {
    console.log(err.stack);
    res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message,
    });
};
//# sourceMappingURL=serverError.js.map