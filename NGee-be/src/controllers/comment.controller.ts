import { CommentModel, ICommentModel } from '../models/comment.model'
import { PostModel, IPostModel } from '../models/post.model'
import { UserModel, IUserModel } from '../models/user.model'
import {
  NotificationModel,
  INotificationModel,
} from '../models/notification.model'

export abstract class CommentController {
  public static async addCommentToPost(req: any, res: any, next: any) {
    try {
      const { content, userId, postId } = req.body
      const post = (await PostModel.findById(postId)) as IPostModel
      const user = (await UserModel.findById(userId)) as IUserModel
      if (!content || !postId || !userId) throw 'error'
      if (!post || !user) throw 'error'
      const newComment = await CommentModel.create({
        content: content,
        createdBy: userId,
        votes: [],
        solution: false,
        createDate: new Date(Date.now()),
      })
      await PostModel.updateOne(
        { _id: postId },
        { $push: { comments: newComment._id } }
      )
      if (post.createdBy != userId)
        await NotificationModel.create({
          content: `${user.name} added comment to your post`,
          date: new Date(Date.now()),
          postId: postId,
          watched: false,
          userId: post.createdBy,
        })

      res.status(201).json({
        data: await newComment
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
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  }
  public static async addVote(req: any, res: any, next: any) {
    try {
      const { userId, commentId } = req.body
      if (!commentId || !userId) throw 'error'
      const comment = ((await CommentModel.findById(
        commentId
      )) as unknown) as ICommentModel
      const user = (await UserModel.findById(userId)) as IUserModel
      if (!comment || !user) throw 'There is no post with this id'
      if (comment.votes.includes(userId)) {
        await CommentModel.updateOne(
          { _id: commentId },
          { $set: { votes: comment.votes.filter((item) => item != userId) } }
        )
        res.status(201).json({
          data: {
            votes: comment.votes.filter((item) => item != userId),
            commentId,
          },
        })
      } else {
        await CommentModel.updateOne(
          { _id: commentId },
          { $set: { votes: [...comment.votes, userId] } }
        )
        res.status(201).json({
          data: { votes: [...comment.votes, userId], commentId },
        })
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  }
  public static async tagAsSolution(req: any, res: any, next: any) {
    try {
      const { commentId, postId, userId } = req.body
      if (!commentId || !postId || !userId) throw 'error'
      const comment = ((await CommentModel.findById(
        commentId
      )) as unknown) as ICommentModel
      const post = (await PostModel.findById(postId)) as IPostModel

      if (!comment || !post) throw 'There is no post with this id'

      if (userId != post.createdBy) throw 'You are not author of this post'

      await CommentModel.updateOne(
        { _id: commentId },
        { $set: { solution: true } }
      )
      await PostModel.updateOne(
        { _id: postId },
        {
          $set: { closed: true },
        }
      )
      res.status(201).json({
        data: { commentId, postId },
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  }
  public static async editComment(req: any, res: any, next: any) {
    try {
      const { commentId, postId, userId, content } = req.body
      if (!commentId || !postId || !userId || !content) throw 'error'
      const comment = ((await CommentModel.findById(
        commentId
      )) as unknown) as ICommentModel
      const post = (await PostModel.findById(postId)) as IPostModel
      const user = (await UserModel.findById(userId)) as IUserModel

      if (!comment || !post) throw 'There is no post or comment with this id'
      if (comment.createdBy == userId || user.isAdmin) {
        await CommentModel.updateOne(
          { _id: commentId },
          { $set: { content: content } }
        )
        res.status(201).json({
          data: { commentId, content },
        })
      } else throw 'You cant edit this post'
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  }

  public static async deleteComment(req: any, res: any, next: any) {
    try {
      const { userId, commentId, postId } = req.body
      if (!commentId || !postId || !userId) throw 'error'
      const comment = ((await CommentModel.findById(
        commentId
      )) as unknown) as ICommentModel
      const post = (await PostModel.findById(postId)) as IPostModel
      const user = (await UserModel.findById(userId)) as IUserModel
      if (!comment || !post) throw 'There is no post or comment with this id'
      if (comment.createdBy == userId || user.isAdmin) {
        await CommentModel.deleteOne({ _id: commentId })
        res.status(201).json({ data: { commentId } })
      } else throw 'You cant delete this post'
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  }
}
