import { CommentModel, ICommentModel } from '../models/comment.model'
import { PostModel, IPostModel } from '../models/post.model'
import { UserModel, IUserModel } from '../models/user.model'

export abstract class CommentController {
  //   public static async getAllItems(req: any, res: any, next: any) {
  //     try {
  //       const data = await ItemModel.find()
  //       res.status(200).json({ data })
  //     } catch (err) {
  //       console.log(err)
  //       res.status(500).json({ status: 'Error' })
  //     }
  //   }
  public static async addCommentToPost(req: any, res: any, next: any) {
    try {
      const { content, userId, postId } = req.body
      console.log(req.body)
      const newComment = await CommentModel.create({
        content: content,
        createdBy: userId,
        votes: [],
        solution: false,
      })
      await PostModel.updateOne(
        { _id: postId },
        { $push: { comments: newComment._id } }
      )
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
      res.status(500).json({ status: err })
    }
  }
  public static async addVote(req: any, res: any, next: any) {
    try {
      const { userId, commentId } = req.body
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
      res.status(500).json({ status: err })
    }
  }
  public static async tagAsSolution(req: any, res: any, next: any) {
    try {
      const { commentId, postId, userId } = req.body
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
      res.status(500).json({ status: err })
    }
  }
  //   public static async deleteItemByName(req: any, res: any, next: any) {
  //     try {
  //       const deleteOne = await ItemModel.deleteOne({ name: req.params.name })
  //       res.status(200).json({ deleteOne })
  //     } catch (err) {
  //       console.log(err)
  //       res.status(500).json({ status: 'Error' })
  //     }
  //   }
  //   public static async updateItemById(req: any, res: any, next: any) {
  //     try {
  //       const updateOne = await ItemModel.updateOne(
  //         { name: req.params.name },
  //         req.body
  //       )
  //       res.status(201).json({ updateOne })
  //     } catch (err) {
  //       console.log(err)
  //       res.status(500).json({ status: 'Error' })
  //     }
  //   }
}
