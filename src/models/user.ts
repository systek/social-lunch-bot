import mongoose, { Schema, Document } from 'mongoose'

import { Activity, activitySchema } from './activity'
import { toJSONOverride } from './helpers/toJSON'
import { Invitation, invitationSchema } from './invitation'

/** This is the model representing each Slack user along with their
 * activities and invitations
 */
export interface User {
  id: string
  slackId: string
  activities: Activity[]
  invitations: Invitation[]
  createdAt: number
}

const userSchema: Schema<Document<User>> = new Schema({
  id: String,
  slackId: String,
  activities: [activitySchema],
  invitations: [invitationSchema],
  createdAt: Number,
})

// We don't want to expose internal document _id or version __v, so
// add the toJSONOverride helper.
userSchema.set('toJSON', toJSONOverride)

export const User = mongoose.model<Document<User>>('User', userSchema)
