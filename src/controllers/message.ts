import { Activity } from '../models/activity'

export const sendJoinInvitation = (activityType: Activity) => {}

export const sendThisWeeksInvitation = (activityType: Activity) => {}

export const sendLunchInvitation = (lunchGuests: any[]): Promise<boolean> => {
  // 1. Get pool of participants
  // 2. Take weight into account to avoid drawing people who just did lunsj
  // 3. Send out invitations

  return new Promise((resolve) => resolve)
}
