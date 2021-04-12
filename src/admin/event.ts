import * as ActivityControllers from '../controllers/activity.controllers'
import * as EventControllers from '../controllers/event.controllers'
import * as MessageControllers from '../controllers/message.controllers'
import * as DrawControllers from '../controllers/draw.controllers'
import * as InvitationControllers from '../controllers/invitation.controllers'

import { ActivityType } from '../models/activity.models'
import { InvitationType } from '../models/invitation.models'

import { User } from '../models/user.models'

interface CreateNewEventOptions {
  eventTime: number
  activityType: ActivityType
}

export const createNewEvent = async (options: CreateNewEventOptions): Promise<User[]> => {
  const { eventTime, activityType } = options
  const activity = await ActivityControllers.getActivityByType(activityType)

  if (!activity) {
    throw new Error('Could not find activity')
  }

  const event = await EventControllers.createNewEvent({
    eventTime,
    activity,
  })

  const winners = await DrawControllers.drawWinners({ event, drawCount: 5 })
  const invitations = await InvitationControllers.createUserInvitations({
    users: winners,
    activityType: activity.type,
    event,
    invitationType: InvitationType.EVENT,
  })
  await MessageControllers.sendInvitations(invitations)
  return winners
}
