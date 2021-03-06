import { v4 as uuid } from 'uuid'

import { User } from '../models/user.models'
import * as MessageController from './message.controllers'
import { Activity, ActivityKey } from '../models/activity.models'

import * as StringHelpers from '../helpers/string.helpers'
import { Invitation, InvitationStatus, InvitationType } from '../models/invitation.models'
import { Logger } from '../helpers/logging.helpers'

export enum ResponseType {
  ACCEPT = 'ACCEPT',
  DECLINE = 'DECLINE',
}

interface InvitationOptions {
  user: User
  invitationToken: string
  activity: Activity
  invitationType: InvitationType
}

const createInvitation = async (options: InvitationOptions): Promise<Invitation> => {
  const { invitationToken, activity, invitationType, user } = options
  const invitation = await Invitation.create({
    id: uuid(),
    token: invitationToken,
    activity,
    event: null,
    type: invitationType,
    status: InvitationStatus.PENDING,
    createdAt: Date.now(),
    user,
  })
  return invitation
}

interface SendInvitationOptions {
  users: User[]
  activityType: ActivityKey
}

export const sendInvitationToUsers = async (options: SendInvitationOptions): Promise<boolean> => {
  const { users, activityType } = options
  const activity = await Activity.findOne({ type: activityType })

  Logger(activityType)
  Logger(activity)

  if (activity === null) {
    return false
  }

  users.forEach(async (user) => {
    try {
      const invitationToken = StringHelpers.createRandomToken()
      await createInvitation({ user, activity, invitationToken, invitationType: InvitationType.MEMBERSHIP })
      MessageController.sendJoinInvitation({ user, invitationToken, activity })
    } catch (error) {
      console.log(error)
      // Todo: handle error in Sentry?
    }
  })
  return true
}

export const validateInvitation = async (invitationToken: string): Promise<Invitation | null> => {
  const invitation = await Invitation.findOne({ token: invitationToken })

  return invitation
}

interface UpdateInvitationResponseOptions {
  invitation: Invitation
  invitationStatus: InvitationStatus
}

export const updateInvitationResponse = async (options: UpdateInvitationResponseOptions): Promise<Invitation> => {
  const { invitation, invitationStatus } = options

  invitation.set('status', invitationStatus)
  await invitation.save()

  return invitation
}
