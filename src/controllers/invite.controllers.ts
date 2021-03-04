import { v4 as uuid } from 'uuid'
import * as SlackService from '../services/slack'
import { SlackUser } from '../types/slackUser'

import { User } from '../models/user.models'
import * as UserControllers from './users.controllers'
import * as MessageController from './message.controllers'
import { Activity, ActivityKey } from '../models/activity.models'

import * as StringHelpers from '../helpers/string.helpers'
import { Invitation, InvitationStatus, InvitationType } from '../models/invitation.models'

export enum ResponseType {
  ACCEPT = 'ACCEPT',
  DECLINE = 'DECLINE',
}

export const updateRegisteredUsers = async (): Promise<User[]> => {
  // 1. Get list of Slack users
  // 2. Get list of users in DB
  // 3. Compare if any are new or should be deleted
  const allSlackUsers: SlackUser[] = await SlackService.getSlackUsers()
  const realSlackUsers = allSlackUsers.filter((user) => !(user.is_bot || user.id === 'USLACKBOT'))
  const registeredUsers = await User.find()

  const verifiedIds: string[] = []
  const usersToAdd: SlackUser[] = []

  realSlackUsers.forEach(async (user) => {
    const foundUser = registeredUsers.find((existingUser) => user.id === existingUser.slackId)
    if (foundUser) {
      verifiedIds.push(foundUser.id)
    } else {
      usersToAdd.push(user)
    }
  })

  const newlyAddedUsers = UserControllers.bulkAddUsers(usersToAdd)

  // Create a list of id's that are not verifies, ie are no longer users (person quit, removed or otherwise)
  const deletableIds: string[] = registeredUsers.filter((user) => !verifiedIds.includes(user.id)).map((user) => user.id)
  UserControllers.deleteUsers(deletableIds)
  return newlyAddedUsers
}

interface InvitationOptions {
  user: User
  invitationToken: string
  activity: Activity
  invitationType: InvitationType
}

const createInvitation = async (options: InvitationOptions): Promise<Invitation> => {
  const { invitationToken, activity, invitationType } = options
  const invitation = await Invitation.create({
    id: uuid(),
    token: invitationToken,
    activity,
    activityEvent: null,
    type: invitationType,
    status: InvitationStatus.PENDING,
    createdAt: Date.now(),
  })
  return invitation
}

export const inviteUsers = async (users: User[], activityType: ActivityKey): Promise<boolean> => {
  const activity = await Activity.findOne({ type: activityType })

  console.log(activity)

  if (activity === null) {
    return false
  }

  users.forEach(async (user) => {
    try {
      const invitationToken = StringHelpers.createRandomToken()
      const invitation = await createInvitation({ user, activity, invitationToken, invitationType: InvitationType.MEMBERSHIP })
      UserControllers.addInvitationToUser({ user, invitation })
      MessageController.sendJoinInvitation({ user, invitationToken, activity })
      console.log('user invited')
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
