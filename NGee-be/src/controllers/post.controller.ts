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
      res.status(500).json({ error: 'Błąd' })
    }
  }
  public static async getPostById(req: Request, res: Response, next: any) {
    try {
      const { postId } = req.body
      if (!postId) throw 'Błąd'
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
      if (!userId || !title || !content || !category) throw 'Błąd'
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
      if (!userId || !postId) throw 'Błąd'
      const post = (await PostModel.findById(postId)) as IPostModel
      const user = (await UserModel.findById(userId)) as IUserModel
      if (!user) throw 'Użytkownik nie istnieje'
      if (!post) throw 'Post nie istnieje'
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
          console.log(`${user.name} polubił twój post`)
          const isDuplicate = await NotificationModel.find({
            postId: postId,
            content: `${user.name} polubił twój post`,
          })
          if (!isDuplicate.length) {
            await NotificationModel.create({
              content: `${user.name} polubił twój post`,
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
      if (!userId || !postId) throw 'Błąd'
      const post = (await PostModel.findById(postId)) as IPostModel
      const user = (await UserModel.findById(userId)) as IUserModel
      if (!post) throw 'Post nie istnieje'
      if (post.createdBy == userId || user.isAdmin) {
        await Promise.all(
          post.comments.map(async (comment) => {
            await CommentModel.deleteOne({ _id: comment })
          })
        )
        await PostModel.deleteOne({ _id: postId })
        res.status(201).json({ data: 'success' })
      } else throw 'Nie możesz usunąć tego posta'
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  }

  public static async editPost(req: Request, res: Response, next: any) {
    try {
      const { userId, postId, title, content, category, tags } = req.body
      if (!userId || !postId || !title || !content || !category) throw 'Błąd'
      const post = (await PostModel.findById(postId)) as IPostModel
      const user = (await UserModel.findById(userId)) as IUserModel
      if (!post) throw 'Post nie istnieje'
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
      } else throw 'Nie możesz edytować tego posta'
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  }

  public static async searchEngine(req: Request, res: Response, next: any) {
    try {
      const { category, keyWord, actualPage } = req.body
      if (!actualPage) throw 'Błąd'
      const tagSearchedPosts = (await PostModel.find({
        tags: { $in: keyWord },
        category: { $regex: category, $options: 'i' },
      })) as IPostModel[]
      const titleSearchedPosts = (await PostModel.find({
        title: { $regex: keyWord, $options: 'i' },
        category: { $regex: category, $options: 'i' },
      })) as IPostModel[]
      console.log(titleSearchedPosts)
      const contentSearchedPosts = (await PostModel.find({
        content: { $regex: keyWord, $options: 'i' },
        category: { $regex: category, $options: 'i' },
      })) as IPostModel[]
      if (!titleSearchedPosts && !tagSearchedPosts && contentSearchedPosts)
        throw 'Nie znaleziono żadnego posta'
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
