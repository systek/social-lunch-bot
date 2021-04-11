import { Request, Response } from 'express'

import { sendEventReminders } from '../admin/remind'

export const remindRouteHandler = async (req: Request, res: Response): Promise<void> => {
  const { eventId }: { eventId: string } = req.body

  sendEventReminders(eventId)

  res.json({ success: true })
}
