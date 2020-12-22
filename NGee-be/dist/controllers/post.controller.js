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
exports.PostController = void 0;
const post_model_1 = require("../models/post.model");
const imageProcessing_1 = require("../utils/imageProcessing");
const user_model_1 = require("../models/user.model");
const notification_model_1 = require("../models/notification.model");
const comment_model_1 = require("../models/comment.model");
class PostController {
    static getAllPosts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { actualPage } = req.body;
                const numberOfPosts = yield post_model_1.PostModel.countDocuments();
                const data = yield post_model_1.PostModel.find({}, {}, { skip: (actualPage - 1) * 10, limit: 10, sort: { createDate: -1 } });
                res.status(200).json({ data, numberOfPosts });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: 'Błąd' });
            }
        });
    }
    static getPostById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { postId } = req.body;
                if (!postId)
                    throw 'Błąd';
                const data = yield post_model_1.PostModel.findOne({ _id: postId })
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
                    .populate({
                    path: 'comments',
                    model: 'Comment',
                    populate: {
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
                    },
                })
                    .exec();
                res.status(200).json({ data });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: err });
            }
        });
    }
    static addNewPost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, content, userId, category, tags } = req.body;
                if (!userId || !title || !content || !category)
                    throw 'Błąd';
                const newPost = yield post_model_1.PostModel.create({
                    title: title,
                    content: content,
                    photos: [],
                    createdBy: userId,
                    category: category,
                    votes: [],
                    tags: tags ? tags.split('-') : [],
                    closed: false,
                    createDate: new Date(Date.now()),
                });
                const photos = yield Promise.all(req.files.map((item, index) => __awaiter(this, void 0, void 0, function* () {
                    return yield imageProcessing_1.processPostPhoto(item.path, item.destination, `${newPost._id}-${index}`);
                })));
                yield post_model_1.PostModel.update({ _id: newPost._id }, { $set: { photos: photos } });
                res.status(201).json({ data: newPost });
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
                const { userId, postId } = req.body;
                if (!userId || !postId)
                    throw 'Błąd';
                const post = (yield post_model_1.PostModel.findById(postId));
                const user = (yield user_model_1.UserModel.findById(userId));
                if (!user)
                    throw 'Użytkownik nie istnieje';
                if (!post)
                    throw 'Post nie istnieje';
                if (post.votes.includes(userId)) {
                    yield post_model_1.PostModel.updateOne({ _id: postId }, { $set: { votes: post.votes.filter((item) => item != userId) } });
                    res.status(201).json({
                        data: { votes: post.votes.filter((item) => item != userId) },
                    });
                }
                else {
                    if (post.createdBy != userId) {
                        console.log(`${user.name} polubił twój post`);
                        const isDuplicate = yield notification_model_1.NotificationModel.find({
                            postId: postId,
                            content: `${user.name} polubił twój post`,
                        });
                        if (!isDuplicate.length) {
                            yield notification_model_1.NotificationModel.create({
                                content: `${user.name} polubił twój post`,
                                date: new Date(Date.now()),
                                postId: postId,
                                watched: false,
                                userId: post.createdBy,
                            });
                        }
                    }
                    yield post_model_1.PostModel.updateOne({ _id: postId }, { $set: { votes: [...post.votes, userId] } });
                    res.status(201).json({ data: { votes: [...post.votes, userId] } });
                }
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: err });
            }
        });
    }
    static deletePost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, postId } = req.body;
                if (!userId || !postId)
                    throw 'Błąd';
                const post = (yield post_model_1.PostModel.findById(postId));
                const user = (yield user_model_1.UserModel.findById(userId));
                if (!post)
                    throw 'Post nie istnieje';
                if (post.createdBy == userId || user.isAdmin) {
                    yield Promise.all(post.comments.map((comment) => __awaiter(this, void 0, void 0, function* () {
                        yield comment_model_1.CommentModel.deleteOne({ _id: comment });
                    })));
                    yield post_model_1.PostModel.deleteOne({ _id: postId });
                    res.status(201).json({ data: 'success' });
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
    static editPost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, postId, title, content, category, tags } = req.body;
                if (!userId || !postId || !title || !content || !category)
                    throw 'Błąd';
                const post = (yield post_model_1.PostModel.findById(postId));
                const user = (yield user_model_1.UserModel.findById(userId));
                if (!post)
                    throw 'Post nie istnieje';
                if (post.createdBy == userId || user.isAdmin) {
                    yield post_model_1.PostModel.updateOne({ _id: postId }, {
                        $set: {
                            content: content,
                            title: title,
                            category: category,
                            tags: tags,
                        },
                    });
                    res.status(201).json({ data: { title, content, category, tags } });
                }
                else
                    throw 'Nie możesz edytować tego posta';
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: err });
            }
        });
    }
    static searchEngine(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { category, keyWord, actualPage } = req.body;
                if (!actualPage)
                    throw 'Błąd';
                const tagSearchedPosts = (yield post_model_1.PostModel.find({
                    tags: { $in: keyWord },
                    category: { $regex: category, $options: 'i' },
                }));
                const titleSearchedPosts = (yield post_model_1.PostModel.find({
                    title: { $regex: keyWord, $options: 'i' },
                    category: { $regex: category, $options: 'i' },
                }));
                console.log(titleSearchedPosts);
                const contentSearchedPosts = (yield post_model_1.PostModel.find({
                    content: { $regex: keyWord, $options: 'i' },
                    category: { $regex: category, $options: 'i' },
                }));
                if (!titleSearchedPosts && !tagSearchedPosts && contentSearchedPosts)
                    throw 'Nie znaleziono żadnego posta';
                const allPostIds = [
                    ...tagSearchedPosts,
                    ...titleSearchedPosts,
                    ...contentSearchedPosts,
                ].map((post) => post._id.toString());
                const uniquePostsIds = [...new Set(allPostIds)];
                const uniquePostsIdsToSend = uniquePostsIds.filter((postId, index) => index + 1 < actualPage * 10 + 1 && index + 1 > (actualPage - 1) * 10);
                const uniquePosts = yield Promise.all(uniquePostsIdsToSend.map((postId) => __awaiter(this, void 0, void 0, function* () { return yield post_model_1.PostModel.findById(postId); })));
                res.status(201).json({
                    data: uniquePosts,
                    numberOfPosts: uniquePostsIds.length,
                });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: err });
            }
        });
    }
    static getUserPosts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { actualPage, userId } = req.body;
                const numberOfPosts = yield post_model_1.PostModel.countDocuments({
                    createdBy: userId,
                });
                const data = (yield post_model_1.PostModel.find({ createdBy: userId }, {}, { skip: (actualPage - 1) * 10, limit: 10, sort: { createDate: -1 } }));
                res.status(200).json({ data, numberOfPosts });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ error: err });
            }
        });
    }
}
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map