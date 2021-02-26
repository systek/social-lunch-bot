import { Console } from 'console'
import mongoose, { Schema } from 'mongoose'

import { Activity, activitySchema } from './activity'
import { ActivityEvent, activityEventSchema } from './activityEvent'
import { toJSONOverride } from './helpers/toJSON'

export enum InvitationStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export interface Invitation {
  id: string
  token: string
  activity: Activity[]
  activityEvent: ActivityEvent
  type: any
  status: any
  createdAt: number
}

export const invitationSchema = new Schema({
  id: String,
  token: String,
  activity: [activitySchema],
  activityEvent: activityEventSchema,
  type: {
    type: String,
    enum: [InvitationStatus],
  },
  status: {
    type: String,
    enum: [InvitationStatus],
  },
  createdAt: Number,
})

// We don't want to expose internal document _id or version __v, so
// add the toJSONOverride helper.
invitationSchema.set('toJSON', toJSONOverride)

export const Invitation = mongoose.model('Invitation', invitationSchema)
