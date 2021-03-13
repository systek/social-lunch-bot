import { Request, Response } from 'express'
import * as AdminControllers from '../controllers/admin.controllers'
import * as InvitationControllers from '../controllers/invitation.controllers'
import * as UserControllers from '../controllers/user.controllers'
import * as MessageControllers from '../controllers/message.controllers'
import * as ActivityControllers from '../controllers/activity.controllers'
import * as EventControllers from '../controllers/event.controllers'
import * as DrawControllers from '../controllers/draw.controllers'

import { ActivityType } from '../models/activity.models'
import { InvitationType } from '../models/invitation.models'

export const postActivity = async (req: Request, res: Response): Promise<void> => {
  const { body } = req
  const result = await AdminControllers.addActivity(body)
  res.json(result)
}

export const postUser = async (req: Request, res: Response): Promise<void> => {
  const { body } = req
  const user = await AdminControllers.handleAddUser(body)
  res.json(user)
}

/* Updates the user registry against Slack and then posts
 * invites to all new users that were added from Slack since last time.
 */
export const postInvitationToNewUsers = async (req: Request, res: Response): Promise<void> => {
  const { activityType }: { activityType: ActivityType } = req.body
  const newUsers = await UserControllers.updateUserRegistryAgainstSlack()
  if (newUsers.length === 0) {
    res.sendStatus(204)
  }
  const invitations = await InvitationControllers.createUserInvitations({ users: newUsers, activityType, invitationType: InvitationType.MEMBERSHIP })
  await MessageControllers.sendInvitations(invitations)
  res.sendStatus(204)
}

/* Posts invitation to all registered users, but does not check for any new Slack users
 */
export const postInvitationToAllUsers = async (req: Request, res: Response): Promise<void> => {
  const allUsers = await UserControllers.getAllUsers()
  const invitations = await InvitationControllers.createUserInvitations({
    users: allUsers,
    activityType: ActivityType.SOCIAL_LUNCH,
    invitationType: InvitationType.MEMBERSHIP,
  })
  await MessageControllers.sendInvitations(invitations)
  res.sendStatus(204)
}

/* Create a new event, draws winners and sends out invite */
export const postNewEvent = async (req: Request, res: Response): Promise<void> => {
  const { eventTime, activityType } = req.body
  const activity = await ActivityControllers.getActivityByType(activityType)

  if (!activity) {
    throw new Error('Could not find activity')
  }

  const event = await EventControllers.createNewEvent({
    eventTime,
    activity,
  })

  const winners = await DrawControllers.drawWinners({ activity })
  const invitations = await InvitationControllers.createUserInvitations({
    users: winners,
    activityType: activity.type,
    event,
    invitationType: InvitationType.EVENT,
  })
  await MessageControllers.sendInvitations(invitations)

  res.json({ success: true })
}
