import { ActivityType } from '../../models/activity.models'
import { InvitationType } from '../../models/invitation.models'

import { buildMembershipInvitation, buildEventInvitation } from './invitationBuilder'
import { buildEventReminder, buildEventInformation } from './reminderBuilder'
import { buildAcceptConfirmationMessage, buildRejectConfirmationMessage } from './respondBuilder'

import { InvitationMessageOptions, MessageContent, ReminderMessageOptions, LunchInformationOptions } from './types'

export const buildInvitation = (options: InvitationMessageOptions): MessageContent => {
  const { invitationToken, invitationType, invitationDetails } = options

  if (invitationType === InvitationType.MEMBERSHIP) {
    return buildMembershipInvitation({ invitationToken })
  }

  if (invitationType === InvitationType.EVENT) {
    return buildEventInvitation({ invitationToken, invitationDetails })
  }

  return { notificationText: '', messageBlocks: [] }
}

export const buildReminderMessage = (options: ReminderMessageOptions): MessageContent => {
  const { invitationType, eventDetails } = options

  if (invitationType === InvitationType.EVENT) {
    return buildEventReminder({ invitationType, eventDetails })
  }

  return { notificationText: '', messageBlocks: [] }
}

export const buildLunchInformationMessage = (options: LunchInformationOptions): MessageContent => {
  const { invitationType, eventDetails } = options

  if (invitationType === InvitationType.EVENT) {
    return buildEventInformation({ invitationType, eventDetails })
  }

  return { notificationText: '', messageBlocks: [] }
}

interface InvitationRespondOptions {
  activityType: ActivityType
  invitationType: InvitationType
}

export const buildInvitationAcceptMessage = (options: InvitationRespondOptions): MessageContent => {
  const { invitationType } = options
  return buildAcceptConfirmationMessage({ invitationType })
}

export const buildInvitationRejectMessage = (options: InvitationRespondOptions): MessageContent => {
  const { invitationType } = options
  return buildRejectConfirmationMessage({ invitationType })
}
