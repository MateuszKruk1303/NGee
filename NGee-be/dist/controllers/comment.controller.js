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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const comment_model_1 = require("../models/comment.model");
const post_model_1 = require("../models/post.model");
const user_model_1 = require("../models/user.model");
const notification_model_1 = require("../models/notification.model");
class CommentController {
    static addCommentToPost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { content, userId, postId } = req.body;
                const post = (yield post_model_1.PostModel.findById(postId));
                const user = (yield user_model_1.UserModel.findById(userId));
                if (!content || !postId || !userId)
                    throw 'Błąd';
                if (!user)
                    throw 'Użytkownik nie istnieje';
                if (!post)
                    throw 'Post nie istnieje';
                const newComment = yield comment_model_1.CommentModel.create({
                    content: content,
                    createdBy: userId,
                    votes: [],
                    solution: false,
                    createDate: new Date(Date.now()),
                });
                yield post_model_1.PostModel.updateOne({ _id: postId }, { $push: { comments: newComment._id } });
                if (post.createdBy != userId)
                    yield notification_model_1.NotificationModel.create({
                        content: `${user.name} dodał komentarz do twojego posta`,
                        date: new Date(Date.now()),
                        postId: postId,
                        watched: false,
                        userId: post.createdBy,
                    });
                res.status(201).json({
                    data: yield newComment
                        .populate({
                        path: 'createdBy',
                        model: 'User',
                        select: {
                            email: 0,
                            password: 0,
                            passwordConfirm: 0,
                            accountActivationHash: 0,
                            activated: 0,
                            emergencyId: 0,
                        },
                    })
                        .execPopulate(),
                });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: err });
            }
        });
    }
    static addVote(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, commentId } = req.body;
                if (!commentId || !userId)
                    throw 'Błąd';
                const comment = (yield comment_model_1.CommentModel.findById(commentId));
                const user = (yield user_model_1.UserModel.findById(userId));
                if (!user)
                    throw 'Użytkownik nie istnieje';
                if (!comment)
                    throw 'Komentarz nie istnieje';
                if (comment.votes.includes(userId)) {
                    yield comment_model_1.CommentModel.updateOne({ _id: commentId }, { $set: { votes: comment.votes.filter((item) => item != userId) } });
                    res.status(201).json({
                        data: {
                            votes: comment.votes.filter((item) => item != userId),
                            commentId,
                        },
                    });
                }
                else {
                    yield comment_model_1.CommentModel.updateOne({ _id: commentId }, { $set: { votes: [...comment.votes, userId] } });
                    res.status(201).json({
                        data: { votes: [...comment.votes, userId], commentId },
                    });
                }
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: err });
            }
        });
    }
    static tagAsSolution(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { commentId, postId, userId } = req.body;
                if (!commentId || !postId || !userId)
                    throw 'Błąd';
                const comment = (yield comment_model_1.CommentModel.findById(commentId));
                const post = (yield post_model_1.PostModel.findById(postId));
                if (!post)
                    throw 'Post nie istnieje';
                if (!comment)
                    throw 'Komentarz nie istnieje';
                if (userId != post.createdBy)
                    throw 'Nie jesteś autorem tego posta';
                yield comment_model_1.CommentModel.updateOne({ _id: commentId }, { $set: { solution: true } });
                yield post_model_1.PostModel.updateOne({ _id: postId }, {
                    $set: { closed: true },
                });
                res.status(201).json({
                    data: { commentId, postId },
                });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: err });
            }
        });
    }
    static editComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { commentId, postId, userId, content } = req.body;
                if (!commentId || !postId || !userId || !content)
                    throw 'Błąd';
                const comment = (yield comment_model_1.CommentModel.findById(commentId));
                const post = (yield post_model_1.PostModel.findById(postId));
                const user = (yield user_model_1.UserModel.findById(userId));
                if (!comment)
                    throw 'Komentarz nie istnieje';
                if (!post)
                    throw 'Post nie istnieje';
                if (comment.createdBy == userId || user.isAdmin) {
                    yield comment_model_1.CommentModel.updateOne({ _id: commentId }, { $set: { content: content } });
                    res.status(201).json({
                        data: { commentId, content },
                    });
                }
                else
                    throw 'Nie możesz edytować tego komentarza';
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: err });
            }
        });
    }
    static deleteComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, commentId, postId } = req.body;
                if (!commentId || !postId || !userId)
                    throw 'Błąd';
                const comment = (yield comment_model_1.CommentModel.findById(commentId));
                const post = (yield post_model_1.PostModel.findById(postId));
                const user = (yield user_model_1.UserModel.findById(userId));
                if (!comment)
                    throw 'Komentarz nie istnieje';
                if (!post)
                    throw 'Post nie istnieje';
                if (comment.createdBy == userId || user.isAdmin) {
                    yield post_model_1.PostModel.updateOne({ _id: postId }, {
                        $set: {
                            comments: post.comments.filter((item) => item.toString() != userId),
                        },
                    });
                    yield comment_model_1.CommentModel.deleteOne({ _id: commentId });
                    res.status(201).json({ data: { commentId } });
                }
                else
                    throw 'Nie możesz usunąć tego posta';
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: err });
            }
        });
    }
}
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map