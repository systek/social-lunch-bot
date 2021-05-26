import { ActivityType } from '../../models/activity.models'
import { InvitationType } from '../../models/invitation.models'

export interface RespondOptions {
  invitationType: InvitationType
}

export interface Details {
  time: number
  url: string
}

export interface RemindOptions {
  invitationType: InvitationType
  eventDetails: Details
}
export interface LunchInformationOptions {
  invitationType: InvitationType
  eventDetails: Details
}

export interface InvitationMessageOptions {
  invitationToken: string
  activityType: ActivityType
  invitationType: InvitationType
  invitationDetails: Details
}

export interface ReminderMessageOptions {
  invitationType: InvitationType
  eventDetails: Details
}

export interface MessageContent {
  messageBlocks?: any
  notificationText: string
}
