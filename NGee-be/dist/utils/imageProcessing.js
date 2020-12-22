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
exports.processPostPhoto = exports.processProfilePhoto = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = require("path");
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const unlinkAsync = util_1.promisify(fs_1.default.unlink);
exports.processProfilePhoto = (path, destination, originalName, oldPath) => __awaiter(void 0, void 0, void 0, function* () {
    yield sharp_1.default(path)
        .resize(100, 100)
        .toFormat('jpg')
        .jpeg({ quality: 90 })
        .toFile(path_1.resolve(destination, `${originalName}.jpg`));
    yield unlinkAsync(path);
    if (oldPath)
        yield unlinkAsync(oldPath);
    return path_1.resolve(destination, `${originalName}.jpg`);
});
exports.processPostPhoto = (path, destination, originalName) => __awaiter(void 0, void 0, void 0, function* () {
    yield sharp_1.default(path)
        .toFormat('jpg')
        .jpeg({ quality: 100 })
        .toFile(path_1.resolve(destination, `${originalName}.jpg`));
    yield unlinkAsync(path);
    return path_1.resolve(destination, `${originalName}.jpg`);
});
//# sourceMappingURL=imageProcessing.js.map