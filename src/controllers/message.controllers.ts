import * as SlackService from '../services/slack'

import * as MessageBlocks from '../messageBlocks'

import { Activity, ActivityKey } from '../models/activity.models'
import { User } from '../models/user.models'
import { Invitation } from '../models/invitation.models'

interface InvitationOptions {
  user: User
  invitationToken: string
  activity: Activity
}

export const sendJoinInvitation = async (options: InvitationOptions): Promise<boolean> => {
  const { user, invitationToken, activity } = options
  const { notificationText, messageBlocks } = MessageBlocks.buildInvitationMessage({ invitationToken, activity })
  SlackService.sendMessage({ notificationText, messageBlocks, user })

  return true
}

export const sendJoinConfirmation = async (invitation: Invitation, user: User): Promise<void> => {
  const { notificationText, messageBlocks } = MessageBlocks.buildInvitationConfirmatinoMessage()
  console.log('sendJoinConfirmation')
  SlackService.sendMessage({ notificationText, messageBlocks, user })
  // Todo: Withdraw original message?
}

export const sendRejectConfirmation = async (invitation: Invitation, user: User): Promise<void> => {
  const { notificationText, messageBlocks } = MessageBlocks.buildInvitationRejectionMessage()
  SlackService.sendMessage({ notificationText, messageBlocks, user })
}

export const sendThisWeeksInvitation = (activityType: ActivityKey) => {}

export const sendLunchInvitation = (lunchGuests: any[]): Promise<boolean> => {
  // 1. Get pool of participants
  // 2. Take weight into account to avoid drawing people who just did lunsj
  // 3. Send out invitations

  return new Promise((resolve) => resolve)
}
