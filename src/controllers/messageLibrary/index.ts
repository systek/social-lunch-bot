import { ActivityType } from '../../models/activity.models'
import { InvitationType } from '../../models/invitation.models'

import { MessageFactory } from './library'

interface InvitationMessageOptions {
  invitationToken: string
  activityType: ActivityType
  invitationType: InvitationType
  invitationDetails: any
}

interface MessageContent {
  messageBlocks: any
  notificationText: string
}

export const buildInvitationMessage = (options: InvitationMessageOptions): MessageContent => {
  const { invitationToken, invitationType, activityType, invitationDetails } = options

  const { getInvitationNotification, getInvitationMessageBlocks } = MessageFactory[activityType][invitationType]

  if (!getInvitationNotification || !getInvitationMessageBlocks) {
    throw new Error('Could not find proper message constructors')
  }

  const notificationText = getInvitationNotification(invitationDetails)
  const messageBlocks = getInvitationMessageBlocks(invitationToken, invitationDetails)

  return { messageBlocks, notificationText }
}

interface InvitationRespondOptions {
  activityType: ActivityType
  invitationType: InvitationType
}

export const buildInvitationAcceptMessage = (options: InvitationRespondOptions): MessageContent => {
  const { activityType, invitationType } = options
  const { getAcceptNotificationText } = MessageFactory[activityType][invitationType]

  return { messageBlocks: null, notificationText: getAcceptNotificationText() }
}

export const buildInvitationRejectMessage = (options: InvitationRespondOptions): MessageContent => {
  const { activityType, invitationType } = options
  const { getRejectNotificationText } = MessageFactory[activityType][invitationType]

  return { messageBlocks: null, notificationText: getRejectNotificationText() }
}
