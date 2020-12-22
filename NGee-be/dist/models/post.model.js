"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    photos: {
        type: Array,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    category: {
        type: String,
        required: true,
    },
    votes: {
        type: Array,
    },
    tags: {
        type: Array,
    },
    closed: {
        type: Boolean,
    },
    createDate: {
        type: Date,
    },
    comments: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
});
exports.PostModel = mongoose_1.model('Post', postSchema);
//# sourceMappingURL=post.model.js.map