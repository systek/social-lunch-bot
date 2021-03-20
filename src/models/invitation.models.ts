import mongoose, { Document, Schema } from 'mongoose'

import { Activity, activitySchema } from './activity.models'
import { Event, eventSchema } from './event.models'
import { toJSONOverride } from './helpers/toJSON'
import { User } from './user.models'

export enum InvitationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export enum InvitationType {
  MEMBERSHIP = 'MEMBERSHIP',
  EVENT = 'EVENT',
  REMINDER = 'REMINDER',
}

export interface Invitation extends Document {
  id: string
  token: string
  activity: Activity
  event: Event
  type: InvitationType
  status: InvitationStatus
  createdAt: number
  user: User
}

export const invitationSchema = new Schema<Invitation>({
  id: String,
  token: String,
  activity: activitySchema,
  event: eventSchema,
  type: {
    type: String,
    enum: InvitationType,
  },
  status: {
    type: String,
    enum: InvitationStatus,
  },
  user: User.schema,
  createdAt: Number,
})

// We don't want to expose internal document _id or version __v, so
// add the toJSONOverride helper.
invitationSchema.set('toJSON', toJSONOverride)

export const Invitation = mongoose.model<Invitation>('Invitation', invitationSchema)
