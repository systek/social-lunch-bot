import mongoose, { Schema } from 'mongoose'
import { Activity } from './activity'

const UserActivitySchema = new Schema({
  id: String,
  activity: Activity,
  status: String,
})

export const UserActivity = mongoose.model('UserActivity', UserActivitySchema)
