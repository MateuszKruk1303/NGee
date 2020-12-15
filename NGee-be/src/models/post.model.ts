import { Schema, model, Document } from 'mongoose'

type category = 'PLC' | 'Robotics' | 'Automotive' | 'Student'

export interface IPostModel extends Document {
  title: string
  content: string
  photos: string[]
  createdBy: string
  category: category
  votes: string[]
  tags: string[]
  comments: []
}

const postSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, 'title is required'],
  },
  content: {
    type: String,
    required: [true, 'content is required'],
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
    required: [true, 'category is required'],
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

export const PostModel = model('Post', postSchema)
