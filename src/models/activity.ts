import mongoose, { Schema } from 'mongoose'
import { ActivityType } from './defs/activitytype'

const ActivitySchema = new Schema({
  id: String,
  title: String,
  type: ActivityType,
})

export const Activity = mongoose.model('Activity', ActivitySchema)
