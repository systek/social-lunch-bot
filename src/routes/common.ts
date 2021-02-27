import { Request, Response } from 'express'

import * as DatabaseService from '../services/database'
import * as SlackService from '../services/slack'

export const getHealth = async (req: Request, res: Response): Promise<void> => {
  const slackStatus = await SlackService.getStatus()
  const connectionStatus = DatabaseService.getStatus()

  console.log(slackStatus)

  const healthStatus = {
    slack: slackStatus,
    database: connectionStatus,
  }

  res.json(healthStatus)
}

export const route404 = (req: Request, res: Response) => {
  res.sendStatus(404)
}
