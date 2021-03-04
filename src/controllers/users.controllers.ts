import { v4 as uuid } from 'uuid'
import { Invitation } from '../models/invitation.models'

import { User } from '../models/user.models'
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

export const allUsers = async (): Promise<User[]> => {
  const users = await User.find()
  return users
}

export const findUserWithInvitation = async (invitation: Invitation): Promise<User | null> => {
  const user = await User.findOne({ invitations: { $elemMatch: { id: invitation.id } } })
  return user
}

interface AddInvitationToUserOptions {
  user: User
  invitation: Invitation
}
export const addInvitationToUser = async (options: AddInvitationToUserOptions): Promise<User> => {
  const { user, invitation } = options
  //https://mongoosejs.com/docs/deprecations.html#findandmodify
  const updatedUser = await User.findOneAndUpdate({ id: user.id }, { $push: { invitations: invitation } })
  if (updatedUser === null) {
    throw new Error('Could not find user to update')
  }
  return updatedUser
}
