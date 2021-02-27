import { Request, Response } from 'express'
import * as AdminControllers from '../controllers/admin'

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
