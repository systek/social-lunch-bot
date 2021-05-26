import { Request, Response } from 'express'

import { sendEventReminders } from '../admin/remind'
import * as EventControllers from '../controllers/event.controllers'
import * as MessageControllers from '../controllers/message.controllers'

import * as SlackService from '../services/slack'

export const joinParticipantsHandler = async (req: Request, res: Response): Promise<void> => {
  const { eventId }: { eventId: string } = req.body

  // sendEventReminders(eventId)

  const event = await EventControllers.getSingleEvent(eventId)

  if (!event) {
    res.json({ success: false })
    return
  }

  const { users } = event

  const userIds = users.map((user) => user.slackId)

  const conversationId = await SlackService.createConversation({ userIds })

  if (!conversationId) {
    res.json({ success: false })
    return
  }

  MessageControllers.sendDigitalLunchInformation({ conversationId, event })

  res.json({ conversationId, users })
}
