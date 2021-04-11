import { Request, Response } from 'express'

import { createNewActivity, createNewUser } from '../admin/admin'

export const postNewActivity = async (req: Request, res: Response): Promise<void> => {
  const { body } = req
  const result = await createNewActivity(body)
  res.json(result)
}

export const postNewUser = async (req: Request, res: Response): Promise<void> => {
  const { body } = req
  const user = await createNewUser(body)
  res.json(user)
}
