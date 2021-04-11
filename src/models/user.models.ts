import mongoose, { Schema, Document } from 'mongoose'

import { Activity, activitySchema } from './activity.models'
import { toJSONOverride } from './helpers/toJSON'

/** This is the model representing each Slack user along with their
 * activities and invitations
 */

export interface User extends Document {
  id: string
  slackId: string
  activities: Activity[]
  createdAt: number
}
export interface UserInput {
  slackId: string
  activities: Activity[]
}

export const userSchema: Schema<User> = new Schema({
  id: String,
  slackId: String,
  activities: [activitySchema],
  createdAt: Number,
})

// We don't want to expose internal document _id or version __v, so
// add the toJSONOverride helper.
userSchema.set('toJSON', toJSONOverride)

export const User = mongoose.model<User>('User', userSchema)
