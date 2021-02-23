import express, { Application } from 'express'

import * as DatabaseService from './services/database'
import * as SlackService from './services/slack'

import { ReadyState } from './types/dbReadyState'

import * as MessageControllers from './controllers/message'

const app: Application = express()
export const App = async (): Promise<void> => {
  const serverPort = process.env.PORT || 4001
  const secretSlackToken = process.env.SLACK_SECRET_TOKEN

  if (!secretSlackToken) {
    throw new Error(
      'Could not find Slack secret token. Make sure you have added the env file ./env/slack.secret.env locally or that Github secrets is available.',
    )
  }

  const slack = await SlackService.initSlackConnection()
  const db = await DatabaseService.initDatabaseConnection()

  app.get('/', (req, res) => {
    res.json({})
  })

  app.get('/health', async (req, res) => {
    const slackAuthresponse = await slack.auth.test()
    const connectionStatus: ReadyState = db.readyState

    const healthStatus = {
      slack: slackAuthresponse.ok,
      database: connectionStatus === ReadyState.Connected,
    }

    res.json(healthStatus)
  })

  app.post('/message', MessageControllers.sendLunchInvitation)
  app.listen(serverPort, () => {
    console.log(`Started at port ${serverPort}`)
  })
}
