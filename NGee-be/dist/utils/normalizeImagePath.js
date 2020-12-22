"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeImagePath = void 0;
exports.normalizeImagePath = (imagePath) => {
    if (imagePath)
        return imagePath.split('\\')[imagePath.split('\\').length - 1];
    return null;
};
//# sourceMappingURL=normalizeImagePath.js.map