import { Document } from 'mongoose'
import { v4 as uuid } from 'uuid'

import { Activity, ActivityInput } from '../models/activity.models'
import { User, UserInput } from '../models/user.models'

/** Only used if a new kind of activity is to be added, i a new social initiative
 * such as 'CURLING', 'FRIDAY_BEER', 'POKER_NIGHT' or whatever.
 */
export const addActivity = async (activityInput: ActivityInput): Promise<Activity> => {
  const activity = new Activity({
    id: uuid(),
    ...activityInput,
  })

  console.log(activity)

  try {
    await activity.save()
  } catch (err) {
    throw new Error('Error creating acivity')
  }
  return activity.toJSON<Activity>()
}

export const handleAddUser = async (userInput: UserInput): Promise<User> => {
  // Todo:
  // - Must come with user object containing actual slackId.
  // - Send appropriate invitations
  // - Add sent invitations to user before send.

  const user: Document<User> = new User({
    id: uuid(),
    createdAt: Date.now(),
    ...userInput,
  })

  await user.save()

  return user.toJSON<User>()
}
