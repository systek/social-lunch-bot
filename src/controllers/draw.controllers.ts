import { Activity } from '../models/activity.models'
import * as UserControllers from './user.controllers'
import { User } from '../models/user.models'

interface DrawOptions {
  activity: Activity
}
// Todo: Create type or interface for Winner.
export const drawWinners = async (options: DrawOptions): Promise<User[]> => {
  const { activity } = options
  const users = await UserControllers.findRandomUsersWithActivity(activity)
  return users
}
