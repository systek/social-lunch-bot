import { v4 as uuid } from 'uuid'

import * as SlackService from '../services/slack'
import { Activity } from '../models/activity.models'

import { User } from '../models/user.models'
import { SlackUser } from '../types/slackUser'

const deleteUsers = async (userIds: string[]): Promise<void> => {
  await User.deleteMany({ id: { $in: userIds } })
}

const bulkAddUsers = async (users: SlackUser[]): Promise<User[]> => {
  try {
    const insertableUsers = users.map((user) => ({
      id: uuid(),
      slackId: user.id,
      activities: [],
      createdAt: Date.now(),
    }))
    const addedUsers = await User.insertMany(insertableUsers)
    return addedUsers
  } catch (error) {
    throw new Error(error)
  }
}

export const createUser = async (user: SlackUser): Promise<User> => {
  const newUser = await User.create({
    id: uuid(),
    slackId: user.id,
    activities: [],
    createdAt: Date.now(),
  })

  return newUser
}

export const allUsers = async (): Promise<User[]> => {
  const users = await User.find()
  return users
}

export const singleUser = async (id: string): Promise<User | null> => {
  return User.findOne({ id })
}

export const findRandomUsersWithActivity = async (activity: Activity): Promise<User[]> => {
  // Todo: Take previous events into consideration as we want to make sure that all is invited atleast once.
  const users = User.find({ activities: activity })
  return users
}

/** Gets any newly added Slack users and saves to DB. Also removes users from DB
 * that are no longer Slack users (ie people who left Systek)
 */
export const updateUserRegistryAgainstSlack = async (): Promise<User[]> => {
  const allSlackUsers: SlackUser[] = await SlackService.getSlackUsers()
  // Slack bot is counted as a user (is_bot === false), so check for USLACKBOT as well.
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

  const newlyAddedUsers = bulkAddUsers(usersToAdd)

  // Create a list of id's that are not verifies, ie are no longer users (person quit, removed or otherwise)
  const deletableIds: string[] = registeredUsers.filter((user) => !verifiedIds.includes(user.id)).map((user) => user.id)
  deleteUsers(deletableIds)
  return newlyAddedUsers
}

interface RemoveUserOptions {
  user: User
  activity: Activity
}

export const removeUserFromActivity = async (options: RemoveUserOptions): Promise<User> => {
  const { user, activity } = options
  await User.updateOne({ _id: user._id }, { $pullAll: { activities: [activity] } })
  return user
}
