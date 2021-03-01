import { v4 as uuid } from 'uuid'

import { User } from '../models/user'
import { SlackUser } from '../types/slackUser'

export const createUser = async (user: SlackUser): Promise<User> => {
  const newUser = await User.create({
    id: uuid(),
    slackId: user.id,
    activities: [],
    invitations: [],
    createdAt: Date.now(),
  })

  return newUser
}

export const deleteUsers = async (userIds: string[]): Promise<void> => {
  await User.deleteMany({ id: { $in: userIds } })
}

export const bulkAddUsers = async (users: SlackUser[]): Promise<User[]> => {
  try {
    const insertableUsers = users.map((user) => ({
      id: uuid(),
      slackId: user.id,
      activities: [],
      invitations: [],
      createdAt: Date.now(),
    }))
    const addedUsers = await User.insertMany(insertableUsers)
    return addedUsers
  } catch (error) {
    throw new Error(error)
  }
}
