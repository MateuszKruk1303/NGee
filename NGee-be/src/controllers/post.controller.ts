import { IPostModel, PostModel } from '../models/post.model'
import { Request, Response, NextFunction } from 'express'
import { processPostPhoto } from '../utils/imageProcessing'
import { normalizeImagePath } from '../utils/normalizeImagePath'
import { UserModel, IUserModel } from '../models/user.model'

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
      res.status(500).json({ status: 'Error' })
    }
  }
  public static async getPostById(req: Request, res: Response, next: any) {
    try {
      const { postId } = req.body
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
      res.status(500).json({ status: 'Error' })
    }
  }
  public static async addNewPost(req: Request, res: Response, next: any) {
    try {
      const { title, content, userId, category, tags } = req.body
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
          console.log(item)
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
      res.status(500).json({ status: err })
    }
  }

  public static async addVote(req: Request, res: Response, next: any) {
    try {
      const { userId, postId } = req.body
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
        await PostModel.updateOne(
          { _id: postId },
          { $set: { votes: [...post.votes, userId] } }
        )
        res.status(201).json({ data: { votes: [...post.votes, userId] } })
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({ status: err })
    }
  }

  public static async deletePost(req: Request, res: Response, next: any) {
    try {
      const { userId, postId } = req.body
      const post = (await PostModel.findById(postId)) as IPostModel
      const user = (await UserModel.findById(userId)) as IUserModel
      if (!post) throw 'There is no post with this id'
      if (post.createdBy == userId || user.isAdmin) {
        await PostModel.deleteOne({ _id: postId })
        res.status(201).json({ data: 'success' })
      } else throw 'You cant delete this post'
    } catch (err) {
      console.log(err)
      res.status(500).json({ status: err })
    }
  }

  public static async editPost(req: Request, res: Response, next: any) {
    try {
      const { userId, postId, title, content } = req.body
      const post = (await PostModel.findById(postId)) as IPostModel
      const user = (await UserModel.findById(userId)) as IUserModel
      if (!post) throw 'There is no post with this id'
      if (post.createdBy == userId || user.isAdmin) {
        await PostModel.updateOne(
          { _id: postId },
          { $set: { content: content, title: title } }
        )
        res.status(201).json({ data: { title, content } })
      } else throw 'You cant edit this post'
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
