import mongoose, { Document, Schema } from 'mongoose'

import { Activity, activitySchema } from './activity.models'
import { toJSONOverride } from './helpers/toJSON'
import { User } from './user.models'

export interface Event extends Document {
  id: string
  activity: Activity
  eventTime: number
  slackChannelId: string
  url: string
  address: string
  users: User[]
}

export const eventSchema = new Schema<Event>({
  id: String,
  activity: activitySchema,
  eventTime: Number,
  slackChannelId: String,
  url: String,
  address: String,
  users: [User.schema],
})

// We don't want to expose internal document _id or version __v, so
// add the toJSONOverride helper.
eventSchema.set('toJSON', toJSONOverride)

export const Event = mongoose.model<Event>('Event', eventSchema)
