import { Request, Response } from 'express'
import * as AdminControllers from '../controllers/admin'
import * as InviteControllers from '../controllers/invite'

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

export const postNewInvites = async (req: Request, res: Response): Promise<void> => {
  const newUsers = await InviteControllers.updateRegisteredUsers()
  console.log(newUsers)
  res.sendStatus(204)
}
