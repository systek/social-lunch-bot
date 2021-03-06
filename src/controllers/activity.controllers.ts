import { Activity, ActivityKey } from '../models/activity.models'

export const getActivityByType = async (type: ActivityKey): Promise<Activity | null> => {
  const activity = await Activity.findOne({ type })
  return activity
}
