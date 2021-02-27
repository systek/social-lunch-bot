import { Request, Response } from 'express'
import * as ResponseControllers from '../controllers/response'
import { Respond } from '../types/respond'

export const postRespond = async (req: Request, res: Response) => {
  const { body }: { body: Respond } = req

  const respondResult = await ResponseControllers.handleActivityResponse(body)

  res.json({ success: respondResult.success })
}
