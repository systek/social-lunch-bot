import mongoose, { Schema } from 'mongoose'

import { activitySchema } from './activity.models'
import { toJSONOverride } from './helpers/toJSON'

export interface ActivityEvent {
  id: string
  activity: any
  startTimestamp: number
  url: string
  address: string
}

export const activityEventSchema = new Schema({
  id: String,
  activity: activitySchema,
  startTimestamp: Number,
  url: String,
  address: String,
})

// We don't want to expose internal document _id or version __v, so
// add the toJSONOverride helper.
activityEventSchema.set('toJSON', toJSONOverride)

export const ActivityEvent = mongoose.model('ActivityEvent', activityEventSchema)
