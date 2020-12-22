"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("../controllers/post.controller");
const comment_controller_1 = require("../controllers/comment.controller");
const user_controller_1 = require("../controllers/user.controller");
const multer_1 = require("../utils/multer");
const router = express_1.default.Router();
router
    .route('/addpost')
    .post(user_controller_1.UserController.Authorize, multer_1.postMulter.array('postImage', 4), post_controller_1.PostController.addNewPost);
router.route('/post').post(post_controller_1.PostController.getPostById);
router
    .route('/addcomment')
    .post(user_controller_1.UserController.Authorize, comment_controller_1.CommentController.addCommentToPost);
router
    .route('/addcommentvote')
    .post(user_controller_1.UserController.Authorize, comment_controller_1.CommentController.addVote);
router.route('/allposts').post(post_controller_1.PostController.getAllPosts);
router
    .route('/userposts')
    .post(user_controller_1.UserController.Authorize, post_controller_1.PostController.getUserPosts);
router.route('/addvote').post(user_controller_1.UserController.Authorize, post_controller_1.PostController.addVote);
router
    .route('/editpost')
    .post(user_controller_1.UserController.Authorize, post_controller_1.PostController.editPost);
router
    .route('/deletepost')
    .post(user_controller_1.UserController.Authorize, post_controller_1.PostController.deletePost);
router
    .route('/tagassolution')
    .post(user_controller_1.UserController.Authorize, comment_controller_1.CommentController.tagAsSolution);
router
    .route('/editcomment')
    .post(user_controller_1.UserController.Authorize, comment_controller_1.CommentController.editComment);
router
    .route('/deletecomment')
    .post(user_controller_1.UserController.Authorize, comment_controller_1.CommentController.deleteComment);
router.route('/searchposts').post(post_controller_1.PostController.searchEngine);
exports.default = router;
//# sourceMappingURL=post.routes.js.map