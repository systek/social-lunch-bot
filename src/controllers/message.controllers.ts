import * as SlackService from '../services/slack'

import * as MessageFactory from './messageFactory'

import { User } from '../models/user.models'
import { Invitation, InvitationType } from '../models/invitation.models'
import { Event } from '../models/event.models'

interface ConfirmationOptions {
  invitation: Invitation
  user: User
}
interface LunchInformationOptions {
  conversationId: string
  event: Event
}

interface ReminderOptions {
  event: Event
}

export const sendInvitations = async (invitations: Invitation[]): Promise<boolean> => {
  invitations.forEach((invitation) => {
    const { user, token, activity, type, event } = invitation

    let invitationDetails = { time: 0, url: '' }

    if (type === InvitationType.EVENT) {
      invitationDetails = {
        time: event.eventTime,
        url: invitation.event.url,
      }
    }

    const { notificationText, messageBlocks } = MessageFactory.buildInvitation({
      invitationToken: token,
      activityType: activity.type,
      invitationType: invitation.type,
      invitationDetails,
    })
    SlackService.sendMessage({ notificationText, messageBlocks, user })
  })

  return true
}

export const sendReminders = async (options: ReminderOptions): Promise<boolean> => {
  const { event } = options

  event.users.forEach((user) => {
    const reminderOptions = {
      invitationType: InvitationType.EVENT,
      eventDetails: {
        time: event.eventTime,
        url: event.url,
      },
    }
    const { notificationText, messageBlocks } = MessageFactory.buildReminderMessage(reminderOptions)

    SlackService.sendMessage({ notificationText, messageBlocks, user })
  })

  return true
}

export const sendDigitalLunchInformation = async (options: LunchInformationOptions): Promise<boolean> => {
  const { conversationId, event } = options

  const reminderOptions = {
    invitationType: InvitationType.EVENT,
    eventDetails: {
      time: event.eventTime,
      url: event.url,
    },
  }
  const { notificationText, messageBlocks } = MessageFactory.buildLunchInformationMessage(reminderOptions)

  SlackService.sendConversation({ notificationText, messageBlocks, conversationId })

  return true
}

export const sendJoinConfirmation = async (options: ConfirmationOptions): Promise<void> => {
  const { invitation, user } = options
  const activityType = invitation.activity.type
  const invitationType = invitation.type
  const { notificationText } = MessageFactory.buildInvitationAcceptMessage({ activityType, invitationType })
  SlackService.sendMessage({ notificationText, user })
  // Todo: Withdraw original message
}

export const sendRejectConfirmation = async (options: ConfirmationOptions): Promise<void> => {
  const { invitation, user } = options
  const activityType = invitation.activity.type
  const invitationType = invitation.type
  const { notificationText } = MessageFactory.buildInvitationRejectMessage({ activityType, invitationType })
  SlackService.sendMessage({ notificationText, user })
}
