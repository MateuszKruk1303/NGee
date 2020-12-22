"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModel = void 0;
const mongoose_1 = require("mongoose");
const notificationSchema = new mongoose_1.Schema({
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
    },
    postId: {
        type: String,
    },
    watched: {
        type: Boolean,
    },
    userId: {
        type: String,
    },
});
exports.NotificationModel = mongoose_1.model('Notification', notificationSchema);
//# sourceMappingURL=notification.model.js.map