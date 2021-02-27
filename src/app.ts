import express, { Application } from 'express'
import bodyParser from 'body-parser'
import bearerToken from 'express-bearer-token'

import * as DatabaseService from './services/database'
import * as SlackService from './services/slack'

import { ReadyState } from './types/database'

import * as ResponseControllers from './controllers/response'
import * as AdminControllers from './controllers/admin'

import { Respond } from './types/respond'

const app: Application = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(bearerToken())

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
    res.sendStatus(404)
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

  // Todo: For admin endpoints (during initial dev only?) add passport check of sorts.
  app.post('/admin/activity', async (req, res) => {
    const { body, token } = req
    console.log(token)
    const result = await AdminControllers.addActivity(body)
    res.json(result)
  })

  // Todo: For admin endpoints (during initial dev only?) add passport check of sorts.
  app.get('/admin/populate', async (req, res) => {
    AdminControllers.handleAddUser()
    res.sendStatus(204)
  })

  app.post('/respond', async (req, res) => {
    const { body }: { body: Respond } = req

    const respondResult = await ResponseControllers.handleActivityResponse(body)

    res.json({ success: respondResult.success })
  })

  app.post('/message', (req, res) => {
    // MessageControllers.sendLunchInvitation()
    res.json({ foo: 'ok' })
  })

  app.listen(serverPort, () => {
    console.log(`Started at port ${serverPort}`)
  })
}
