import { Request, Response } from 'express'
import { postMembershipInvitationToAllUsers, postMembershipInvitationToNewUser } from '../admin/invitation'

import { ActivityType } from '../models/activity.models'

/* Posts invitation to all registered users, but does not check for any new Slack users
 */
export const postInvitationToAllUsers = async (req: Request, res: Response): Promise<void> => {
  const { activityType }: { activityType: ActivityType } = req.body
  postMembershipInvitationToAllUsers(activityType)
  res.sendStatus(204)
}

export const postInvitationtoNewUsers = async (req: Request, res: Response): Promise<void> => {
  const { activityType }: { activityType: ActivityType } = req.body
  postMembershipInvitationToNewUser(activityType)

  res.sendStatus(204)
}
