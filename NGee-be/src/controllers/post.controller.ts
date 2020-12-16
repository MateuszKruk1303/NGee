import { IPostModel, PostModel } from '../models/post.model'
import { Request, Response, NextFunction } from 'express'
import { processPostPhoto } from '../utils/imageProcessing'
import { normalizeImagePath } from '../utils/normalizeImagePath'
import { UserModel, IUserModel } from '../models/user.model'
import {
  NotificationModel,
  INotificationModel,
} from '../models/notification.model'
import { CommentModel } from '../models/comment.model'

export abstract class PostController {
  public static async getAllPosts(req: any, res: any, next: any) {
    try {
      const { actualPage } = req.body
      const numberOfPosts = await PostModel.countDocuments()
      const data = await PostModel.find(
        {},
        {},
        { skip: (actualPage - 1) * 10, limit: 10, sort: { createDate: -1 } }
      )
      res.status(200).json({ data, numberOfPosts })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  }
  public static async getPostById(req: Request, res: Response, next: any) {
    try {
      const { postId } = req.body
      if (!postId) throw 'error'
      const data = await PostModel.findOne({ _id: postId })
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
        .exec()
      res.status(200).json({ data })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  }
  public static async addNewPost(req: Request, res: Response, next: any) {
    try {
      const { title, content, userId, category, tags } = req.body
      if (!userId || !title || !content || !category) throw 'error'
      const newPost = await PostModel.create({
        title: title,
        content: content,
        photos: [],
        createdBy: userId,
        category: category,
        votes: [],
        tags: tags ? tags.split('-') : [],
        closed: false,
        createDate: new Date(Date.now()),
      })
      const photos = await Promise.all(
        (req.files as []).map(async (item: any, index) => {
          return await processPostPhoto(
            item.path,
            item.destination,
            `${newPost._id}-${index}`
          )
        })
      )
      await PostModel.update({ _id: newPost._id }, { $set: { photos: photos } })
      res.status(201).json({ data: newPost })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  }

  public static async addVote(req: Request, res: Response, next: any) {
    try {
      const { userId, postId } = req.body
      if (!userId || !postId) throw 'error'
      const post = (await PostModel.findById(postId)) as IPostModel
      const user = (await UserModel.findById(userId)) as IUserModel
      if (!post || !user) throw 'There is no post with this id'
      if (post.votes.includes(userId)) {
        await PostModel.updateOne(
          { _id: postId },
          { $set: { votes: post.votes.filter((item) => item != userId) } }
        )
        res.status(201).json({
          data: { votes: post.votes.filter((item) => item != userId) },
        })
      } else {
        if (post.createdBy != userId) {
          console.log(postId)
          console.log(userId)
          console.log(`${user.name} likes your post`)
          const isDuplicate = await NotificationModel.find({
            postId: postId,
            content: `${user.name} likes your post`,
          })
          console.log(isDuplicate)
          console.log(isDuplicate.length)
          console.log(!isDuplicate.length)
          if (!isDuplicate.length) {
            await NotificationModel.create({
              content: `${user.name} likes your post`,
              date: new Date(Date.now()),
              postId: postId,
              watched: false,
              userId: post.createdBy,
            })
          }
        }

        await PostModel.updateOne(
          { _id: postId },
          { $set: { votes: [...post.votes, userId] } }
        )
        res.status(201).json({ data: { votes: [...post.votes, userId] } })
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  }

  public static async deletePost(req: Request, res: Response, next: any) {
    try {
      const { userId, postId } = req.body
      if (!userId || !postId) throw 'error'
      const post = (await PostModel.findById(postId)) as IPostModel
      const user = (await UserModel.findById(userId)) as IUserModel
      if (!post) throw 'There is no post with this id'
      if (post.createdBy == userId || user.isAdmin) {
        await Promise.all(
          post.comments.map(async (comment) => {
            await CommentModel.deleteOne({ _id: comment })
          })
        )
        await PostModel.deleteOne({ _id: postId })
        res.status(201).json({ data: 'success' })
      } else throw 'You cant delete this post'
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  }

  public static async editPost(req: Request, res: Response, next: any) {
    try {
      const { userId, postId, title, content, category, tags } = req.body
      if (!userId || !postId || !title || !content || !category) throw 'error'
      const post = (await PostModel.findById(postId)) as IPostModel
      const user = (await UserModel.findById(userId)) as IUserModel
      if (!post) throw 'There is no post with this id'
      if (post.createdBy == userId || user.isAdmin) {
        await PostModel.updateOne(
          { _id: postId },
          {
            $set: {
              content: content,
              title: title,
              category: category,
              tags: tags,
            },
          }
        )
        res.status(201).json({ data: { title, content, category, tags } })
      } else throw 'You cant edit this post'
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  }

  public static async searchEngine(req: Request, res: Response, next: any) {
    try {
      const { keyWord, actualPage } = req.body
      if (!keyWord || !actualPage) throw 'error'
      const tagSearchedPosts = (await PostModel.find({
        tags: { $in: keyWord },
      })) as IPostModel[]
      const titleSearchedPosts = (await PostModel.find({
        title: { $regex: keyWord, $options: 'i' },
      })) as IPostModel[]
      console.log(titleSearchedPosts)
      const contentSearchedPosts = (await PostModel.find({
        content: { $regex: keyWord, $options: 'i' },
      })) as IPostModel[]
      if (!titleSearchedPosts && !tagSearchedPosts && contentSearchedPosts)
        throw "Couldn't find any post"
      const allPostIds = [
        ...tagSearchedPosts,
        ...titleSearchedPosts,
        ...contentSearchedPosts,
      ].map((post) => post._id.toString())
      const uniquePostsIds = [...new Set(allPostIds)]
      const uniquePostsIdsToSend = uniquePostsIds.filter(
        (postId, index) =>
          index + 1 < actualPage * 10 + 1 && index + 1 > (actualPage - 1) * 10
      )

      const uniquePosts = await Promise.all(
        uniquePostsIdsToSend.map(
          async (postId) => await PostModel.findById(postId)
        )
      )
      res.status(201).json({
        data: uniquePosts,
        numberOfPosts: uniquePostsIds.length,
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  }
  public static async getUserPosts(req: any, res: any, next: any) {
    try {
      const { actualPage, userId } = req.body
      const numberOfPosts = await PostModel.countDocuments({
        createdBy: userId,
      })
      const data = (await PostModel.find(
        { createdBy: userId },
        {},
        { skip: (actualPage - 1) * 10, limit: 10, sort: { createDate: -1 } }
      )) as IPostModel[]
      res.status(200).json({ data, numberOfPosts })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  }
}
