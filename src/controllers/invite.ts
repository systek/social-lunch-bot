import * as SlackService from '../services/slack'
import { SlackUser } from '../types/slackUser'

import { User } from '../models/user'
import * as UserControllers from './users'

export const maintainListOfUsers = async (): Promise<void> => {
  // 1. Get list of Slack users
  // 2. Get list of users in DB
  // 3. Compare if any are new or should be deleted
  const allSlackUsers: SlackUser[] = await SlackService.getSlackUsers()
  const realSlackUsers = allSlackUsers.filter((user) => !(user.is_bot || user.id === 'USLACKBOT'))
  const registeredUsers = await User.find()

  const verifiedIds: string[] = []

  realSlackUsers.forEach(async (user) => {
    const foundUser = registeredUsers.find((existingUser) => user.id === existingUser.slackId)
    if (foundUser) {
      verifiedIds.push(foundUser.id)
    }
    if (!foundUser) {
      const createdUser = await UserControllers.createUser(user)
      verifiedIds.push(createdUser.id)
    }
  })

  // Create a list of id's that are not verifies, ie are no longer users (person quit, removed or otherwise)
  const deletableIds: string[] = registeredUsers.filter((user) => !verifiedIds.includes(user.id)).map((user) => user.id)
  UserControllers.deleteUsers(deletableIds)
}
