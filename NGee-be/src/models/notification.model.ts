import { Schema, model } from 'mongoose'

export interface INotificationModel extends Document {
  content: string
  date: Date
  postId: string
  watched: boolean
  userId: string
}

const notificationSchema: Schema = new Schema({
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  },
  postId: {
    type: String,
  },
  watched: {
    type: Boolean,
  },
  userId: {
    type: String,
  },
})

export const NotificationModel = model<any>('Notification', notificationSchema)
