import mongoose, { Schema } from 'mongoose'
import { UserActivity } from './userActivity'

const UserSchema = new Schema({
  id: String,
  slackId: String,
  activities: [UserActivity],
  created_at: Float32Array,
})

export const User = mongoose.model('User', UserSchema)
