import { Schema, model } from 'mongoose'

export interface ICommentModel extends Document {
  content: string
  votes: string[]
  createdBy: string
}

const commentSchema: Schema = new Schema({
  content: {
    type: String,
    required: [true, 'content is required'],
  },
  votes: {
    type: Array,
  },
  solution: {
    type: Boolean,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

export const CommentModel = model('Comment', commentSchema)
