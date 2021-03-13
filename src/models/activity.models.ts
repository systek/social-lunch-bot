import mongoose, { Document, Schema } from 'mongoose'
import { toJSONOverride } from './helpers/toJSON'

export enum ActivityType {
  SOCIAL_LUNCH = 'SOCIAL_LUNCH',
}

export interface Activity extends Document {
  id: string
  title: string
  type: ActivityType
}

export interface ActivityInput {
  title: string
  type: ActivityType
}

export const activitySchema = new Schema<Activity>({
  id: String,
  title: String,
  type: {
    type: String,
    enum: ActivityType,
  },
})

// We don't want to expose internal document _id or version __v, so
// add the toJSONOverride helper.
activitySchema.set('toJSON', toJSONOverride)

export const Activity = mongoose.model<Activity>('Activity', activitySchema)
