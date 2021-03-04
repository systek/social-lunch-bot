import mongoose, { Document, Schema } from 'mongoose'

import { Activity, activitySchema } from './activity.models'
import { ActivityEvent, activityEventSchema } from './activityEvent.models'
import { toJSONOverride } from './helpers/toJSON'

export enum InvitationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export enum InvitationType {
  MEMBERSHIP = 'MEMBERSHIP',
  EVENT = 'EVENT',
}

export interface Invitation extends Document {
  id: string
  token: string
  activity: Activity
  activityEvent: ActivityEvent
  type: InvitationType
  status: InvitationStatus
  createdAt: number
}

export const invitationSchema = new Schema<Invitation>({
  id: String,
  token: String,
  activity: activitySchema,
  activityEvent: activityEventSchema,
  type: {
    type: String,
    enum: InvitationType,
  },
  status: {
    type: String,
    enum: InvitationStatus,
  },
  createdAt: Number,
})

// We don't want to expose internal document _id or version __v, so
// add the toJSONOverride helper.
invitationSchema.set('toJSON', toJSONOverride)

export const Invitation = mongoose.model<Invitation>('Invitation', invitationSchema)
