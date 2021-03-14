import * as SlackService from '../services/slack'

import * as MessageFactory from './messageLibrary'

import { ActivityType } from '../models/activity.models'
import { User } from '../models/user.models'
import { Invitation, InvitationType } from '../models/invitation.models'

interface ConfirmationOptions {
  invitation: Invitation
  user: User
}

export const sendInvitations = async (invitations: Invitation[]): Promise<boolean> => {
  invitations.forEach((invitation) => {
    const { user, token, activity, type } = invitation

    const invitationDetails =
      type === InvitationType.EVENT
        ? {
            day: 'Tirsdag',
            url: invitation.event.url,
          }
        : {}
    const { notificationText, messageBlocks } = MessageFactory.buildInvitationMessage({
      invitationToken: token,
      activityType: activity.type,
      invitationType: invitation.type,
      invitationDetails,
    })
    console.log('invitation', invitation)
    SlackService.sendMessage({ notificationText, messageBlocks, user })
  })

  return true
}

export const sendJoinConfirmation = async (options: ConfirmationOptions): Promise<void> => {
  const { invitation, user } = options
  const activityType = invitation.activity.type
  const invitationType = invitation.type
  const { notificationText, messageBlocks } = MessageFactory.buildInvitationAcceptMessage({ activityType, invitationType })
  console.log('sendJoinConfirmation')
  SlackService.sendMessage({ notificationText, messageBlocks, user })
  // Todo: Withdraw original message
}

export const sendRejectConfirmation = async (options: ConfirmationOptions): Promise<void> => {
  const { invitation, user } = options
  const activityType = invitation.activity.type
  const invitationType = invitation.type
  const { notificationText, messageBlocks } = MessageFactory.buildInvitationRejectMessage({ activityType, invitationType })
  SlackService.sendMessage({ notificationText, messageBlocks, user })
}

export const sendThisWeeksInvitation = (activityType: ActivityType) => {}

export const sendLunchInvitation = (lunchGuests: any[]): Promise<boolean> => {
  // 1. Get pool of participants
  // 2. Take weight into account to avoid drawing people who just did lunsj
  // 3. Send out invitations

  return new Promise((resolve) => resolve)
}
