import * as SlackService from '../services/slack'
import { SlackUser } from '../types/slackUser'

import { User } from '../models/user'
import * as UserControllers from './users'
import * as MessageController from './message'
import { ActivityKey } from '../models/activity'

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

export const inviteUsers = async (users: User[], activityType: ActivityKey): Promise<boolean> => {
  MessageController.sendJoinInvitation(users, activityType)
  return true
}
