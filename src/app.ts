import express, { Application, NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import bearerToken from 'express-bearer-token'

import * as DatabaseService from './services/database'
import * as SlackService from './services/slack'
// import * as Scheduler from './services/schedule'

import * as RouteHandlers from './routes'
import * as CommonRoutes from './admin/common'

export const App = async (): Promise<void> => {
  const serverPort = process.env.PORT || 80
  const slackSecret = process.env.APP_SLACK_TOKEN
  const adminSecret = process.env.APP_ADMIN_REST_TOKEN

  if (!slackSecret) {
    throw new Error('Could not find secrets. Please see readme for information!')
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

  // Start both services
  await SlackService.initSlackConnection()
  await DatabaseService.initDatabaseConnection()
  // Scheduler.startSchedules()

  app.get('/health', CommonRoutes.getHealth)
  app.post('/admin/activities', authentication, RouteHandlers.postNewActivity)
  app.post('/admin/invites/newUsers', authentication, RouteHandlers.postInvitationtoNewUsers)
  app.post('/admin/invites/allUsers', authentication, RouteHandlers.postInvitationToAllUsers)
  app.post('/admin/event', authentication, RouteHandlers.postEventRouteHandler)
  app.post('/admin/remind', authentication, RouteHandlers.remindRouteHandler)
  app.post('/admin/joinParticipants', authentication, RouteHandlers.joinParticipantsHandler)
  app.post('/respond', RouteHandlers.respondRouteHandler)
  app.get('*', CommonRoutes.route404)

  app.listen(serverPort, () => {
    console.log(`Started at APP_PORT ${serverPort}`)
  })
}
