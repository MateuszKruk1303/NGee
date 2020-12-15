import express from 'express'
import { PostController } from '../controllers/post.controller'
import { CommentController } from '../controllers/comment.controller'
import { postMulter } from '../utils/multer'

const router = express.Router()

router
  .route('/addpost')
  .post(postMulter.array('postImage', 4), PostController.addNewPost)
router.route('/post').post(PostController.getPostById)
router.route('/addcomment').post(CommentController.addCommentToPost)
router.route('/addcommentvote').post(CommentController.addVote)
router.route('/allposts').post(PostController.getAllPosts)
router.route('/addvote').post(PostController.addVote)
router.route('/editpost').post(PostController.editPost)
router.route('/deletepost').post(PostController.deletePost)
router.route('/tagassolution').post(CommentController.tagAsSolution)

export default router
