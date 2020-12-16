import express from 'express'
import { PostController } from '../controllers/post.controller'
import { CommentController } from '../controllers/comment.controller'
import { UserController } from '../controllers/user.controller'
import { postMulter } from '../utils/multer'

const router = express.Router()

router
  .route('/addpost')
  .post(
    UserController.Authorize,
    postMulter.array('postImage', 4),
    PostController.addNewPost
  )
router.route('/post').post(PostController.getPostById)
router
  .route('/addcomment')
  .post(UserController.Authorize, CommentController.addCommentToPost)
router
  .route('/addcommentvote')
  .post(UserController.Authorize, CommentController.addVote)
router.route('/allposts').post(PostController.getAllPosts)
router
  .route('/userposts')
  .post(UserController.Authorize, PostController.getUserPosts)
router.route('/addvote').post(UserController.Authorize, PostController.addVote)
router
  .route('/editpost')
  .post(UserController.Authorize, PostController.editPost)
router
  .route('/deletepost')
  .post(UserController.Authorize, PostController.deletePost)
router
  .route('/tagassolution')
  .post(UserController.Authorize, CommentController.tagAsSolution)
router
  .route('/editcomment')
  .post(UserController.Authorize, CommentController.editComment)
router
  .route('/deletecomment')
  .post(UserController.Authorize, CommentController.deleteComment)
router.route('/searchposts').post(PostController.searchEngine)

export default router
