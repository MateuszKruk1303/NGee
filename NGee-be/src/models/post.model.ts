import { Schema, model, Document } from 'mongoose'

export interface IPostModel extends Document {
  title: string
  content: string
  photos: string[]
  createdBy: string
  category: string
  votes: string[]
  tags: string[]
  comments: []
}

const postSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  photos: {
    type: Array,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  category: {
    type: String,
    required: true,
  },
  votes: {
    type: Array,
  },
  tags: {
    type: Array,
  },
  closed: {
    type: Boolean,
  },
  createDate: {
    type: Date,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
})

export const PostModel = model<any>('Post', postSchema)
