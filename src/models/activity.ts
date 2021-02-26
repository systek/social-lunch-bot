import mongoose, { Document, Schema } from 'mongoose'
import { toJSONOverride } from './helpers/toJSON'

export enum ActivityKey {
  SOCIAL_LUNCH = 'SOCIAL_LUNCH',
}

export interface Activity {
  id: string
  title: string
  activityType: ActivityKey
}

export interface ActivityInput {
  title: string
  activityType: ActivityKey
}

export const activitySchema = new Schema({
  id: String,
  title: String,
  activityType: {
    type: String,
    enum: [ActivityKey.SOCIAL_LUNCH],
  },
})

// We don't want to expose internal document _id or version __v, so
// add the toJSONOverride helper.
activitySchema.set('toJSON', toJSONOverride)

export const Activity = mongoose.model<Document<Activity>>('Activity', activitySchema)
