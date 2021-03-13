import { Activity, ActivityType } from '../models/activity.models'

export const getActivityByType = async (type: ActivityType): Promise<Activity | null> => {
  const activity = await Activity.findOne({ type })
  return activity
}
