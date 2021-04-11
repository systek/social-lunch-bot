import { Request, Response } from 'express'

import { createNewEvent } from '../admin/event'

/* Create a new event, draws winners and sends out invite */
export const postEventRouteHandler = async (req: Request, res: Response): Promise<void> => {
  const { eventTime, activityType } = req.body

  createNewEvent({ eventTime, activityType })

  res.json({ success: true })
}
