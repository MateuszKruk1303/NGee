import express from 'express'
import { CommentController } from '../controllers/comment.controller'

const router = express.Router()

router.route('/addComment').post(CommentController.addCommentToPost)
// router.route('/post/:id').get(PostController.getPostById)

export default router
