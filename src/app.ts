import express, { Application, NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import bearerToken from 'express-bearer-token'

import * as DatabaseService from './services/database'
import * as SlackService from './services/slack'

import * as RespondRoutes from './routes/respond'
import * as AdminRoutes from './routes/admin'
import * as CommonRoutes from './routes/common'

export const App = async (): Promise<void> => {
  const serverPort = process.env.PORT || 4001
  const slackSecret = process.env.SLACK_SECRET_TOKEN
  const adminSecret = process.env.ADMIN_SECRET

  if (!slackSecret) {
    throw new Error('Could not find secrets. Please see readme for information.')
  }

  const app: Application = express()
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(bearerToken())

  const authentication = (req: Request, res: Response, next: NextFunction) => {
    const { token } = req
    if (token !== adminSecret) {
      res.sendStatus(403)
      return
    }
    next()
  }

  // Start services
  await SlackService.initSlackConnection()
  await DatabaseService.initDatabaseConnection()

  app.get('/health', CommonRoutes.getHealth)
  app.post('/admin/activities', authentication, AdminRoutes.postActivity)
  app.post('/admin/users', authentication, AdminRoutes.postUser)
  app.post('/admin/invites/newUsers', authentication, AdminRoutes.postInvitetoNewUsers)
  app.post('/admin/invites/allUsers', authentication, AdminRoutes.postInviteToAllUsers)
  app.post('/admin/event', authentication, AdminRoutes.postNewEvent)
  app.post('/respond', RespondRoutes.postRespond)
  app.get('*', CommonRoutes.route404)

  app.listen(serverPort, () => {
    console.log(`Started at port ${serverPort}`)
  })
}
