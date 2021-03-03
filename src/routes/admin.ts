import { Request, Response } from 'express'
import * as AdminControllers from '../controllers/admin'
import * as InviteControllers from '../controllers/invite'
import * as UserControllers from '../controllers/users'
import { ActivityKey } from '../models/activity'

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
  const newUsers = await InviteControllers.updateRegisteredUsers()
  res.sendStatus(204)
}

export const postInviteToAllUsers = async (req: Request, res: Response): Promise<void> => {
  const allUsers = await UserControllers.allUsers()
  await InviteControllers.inviteUsers(allUsers, ActivityKey.SOCIAL_LUNCH)

  res.sendStatus(204)
}
