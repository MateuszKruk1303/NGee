"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    content: {
        type: String,
        required: [true, 'Zawartość jest wymagana'],
    },
    votes: {
        type: Array,
    },
    solution: {
        type: Boolean,
    },
    createDate: {
        type: Date,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
});
exports.CommentModel = mongoose_1.model('Comment', commentSchema);
//# sourceMappingURL=comment.model.js.map