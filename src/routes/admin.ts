import { Request, Response } from 'express'
import * as AdminControllers from '../controllers/admin.controllers'
import * as InvitationControllers from '../controllers/invitation.controllers'
import * as UserControllers from '../controllers/users.controllers'
import * as ActivityControllers from '../controllers/activity.controllers'
import * as EventControllers from '../controllers/event.controllers'
import * as DrawControllers from '../controllers/draw.controllers'

import { ActivityKey } from '../models/activity.models'
import { Logger } from '../helpers/logging.helpers'

export const postActivity = async (req: Request, res: Response): Promise<void> => {
  const { body } = req
  const result = await AdminControllers.addActivity(body)
  res.json(result)
}

export const postUser = async (req: Request, res: Response): Promise<void> => {
  const { body } = req
  AdminControllers.handleAddUser(body)
  res.sendStatus(204)
}

export const postInvitetoNewUsers = async (req: Request, res: Response): Promise<void> => {
  const { activityType }: { activityType: ActivityKey } = req.body
  const newUsers = await UserControllers.updateUserRegistryAgainstSlack()
  if (newUsers.length === 0) {
    res.sendStatus(204)
  }
  InvitationControllers.sendInvitationToUsers({ users: newUsers, activityType })
  res.sendStatus(204)
}

export const postInviteToAllUsers = async (req: Request, res: Response): Promise<void> => {
  const allUsers = await UserControllers.allUsers()
  await InvitationControllers.sendInvitationToUsers({ users: allUsers, activityType: ActivityKey.SOCIAL_LUNCH })

  res.sendStatus(204)
}
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

  const users = await DrawControllers.drawWinners({ activity })

  res.json({ success: true })
}
