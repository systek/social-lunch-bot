import * as AdminControllers from '../controllers/admin.controllers'
import { ActivityInput } from '../models/activity.models'
import { UserInput } from '../models/user.models'

export const createNewActivity = async (activity: ActivityInput): Promise<void> => {
  await AdminControllers.addActivity(activity)
}

export const createNewUser = async (user: UserInput): Promise<void> => {
  await AdminControllers.handleAddUser(user)
}
