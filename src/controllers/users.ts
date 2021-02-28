import { Document } from 'mongoose'
import { v4 as uuid } from 'uuid'

import { User } from '../models/user'
import { SlackUser } from '../types/slackUser'

export const checkForNewUsers = () => {
  // Retrieve a list of Systek Slack users and compare with DB.
  // Remove any DB users that are no longer in Slack list
  // Add any DB users that are not already in DB.
}

export const createUser = async (user: SlackUser): Promise<User> => {
  return User.create({
    id: uuid(),
    slackId: user.id,
    activities: [],
    invitations: [],
    createdAt: Date.now(),
  })
}

export const deleteUsers = async (userIds: string[]): Promise<void> => {
  await User.deleteMany({ id: { $in: userIds } })
}
