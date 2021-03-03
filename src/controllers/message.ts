import * as SlackService from '../services/slack'

import * as MessageBlocks from '../messageBlocks'

import { ActivityKey } from '../models/activity'
import { User } from '../models/user'

export const sendJoinInvitation = async (users: User[], activityType: ActivityKey): Promise<boolean> => {
  const messageBlocks = MessageBlocks.buildInvitationMessage(33)
  console.log(messageBlocks)
  users.forEach((user) => {
    SlackService.sendMessage(messageBlocks, user)
  })

  return true
}

export const sendThisWeeksInvitation = (activityType: ActivityKey) => {}

export const sendLunchInvitation = (lunchGuests: any[]): Promise<boolean> => {
  // 1. Get pool of participants
  // 2. Take weight into account to avoid drawing people who just did lunsj
  // 3. Send out invitations

  return new Promise((resolve) => resolve)
}
