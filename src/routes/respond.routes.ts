import { Request, Response } from 'express'

import { respondHandler } from '../admin/respond'

export const respondRouteHandler = async (req: Request, res: Response): Promise<void> => {
  const { payload }: { payload: string } = req.body
  let json = null

  try {
    json = JSON.parse(payload)
  } catch (error) {
    throw new Error(error)
  }

  respondHandler(json)

  res.json({ success: true })
}
