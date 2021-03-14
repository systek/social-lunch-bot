import { v4 as uuid } from 'uuid'

import { User } from '../models/user.models'
import * as DrawControllers from './draw.controllers'
import { Activity, ActivityType } from '../models/activity.models'

import * as StringHelpers from '../helpers/string.helpers'
import { Invitation, InvitationStatus, InvitationType } from '../models/invitation.models'
import { Logger } from '../helpers/logging.helpers'
import { Event } from '../models/event.models'

export enum ResponseType {
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
}

interface InvitationOptions {
  user: User
  invitationToken: string
  activity: Activity
  invitationType: InvitationType
  event: Event | null
}

interface RejectInvitationOptions {
  invitation: Invitation
  event: Event
}

const createSingleUserInvitation = async (options: InvitationOptions): Promise<Invitation> => {
  const { invitationToken, activity, invitationType, user, event } = options
  const invitation = await Invitation.create({
    id: uuid(),
    token: invitationToken,
    activity,
    type: invitationType,
    status: InvitationStatus.PENDING,
    event,
    createdAt: Date.now(),
    user,
  })
  return invitation
}

interface CreateUserInvitations {
  users: User[]
  activityType: ActivityType
  event?: Event
  invitationType: InvitationType
}

export const createUserInvitations = async (options: CreateUserInvitations): Promise<Invitation[]> => {
  const { users, activityType, event = null, invitationType } = options
  const activity = await Activity.findOne({ type: activityType })

  if (activity === null) {
    throw new Error('Could not find activity')
  }

  const invitations: Promise<Invitation>[] = []

  users.forEach(async (user) => {
    try {
      const invitationToken = StringHelpers.createRandomToken()
      const invitation = createSingleUserInvitation({ user, activity, invitationToken, event, invitationType })

      invitations.push(invitation)
    } catch (error) {
      console.log(error)
      // Todo: handle error in Sentry?
    }
  })

  return Promise.all(invitations).then((response) => {
    return response
  })
}

export const validateAndGetInvitation = async (invitationToken: string): Promise<Invitation | null> => {
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

export const rejectInvitation = async (options: RejectInvitationOptions): Promise<void> => {
  const { invitation } = options
  invitation.set('status', InvitationStatus.REJECTED)
}
