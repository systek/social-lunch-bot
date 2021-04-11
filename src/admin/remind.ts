import * as EventControllers from '../controllers/event.controllers'
import * as MessageControllers from '../controllers/message.controllers'

export const sendEventReminders = async (eventId: string): Promise<void> => {
  const event = await EventControllers.getSingleEvent(eventId)
  if (!event) {
    throw new Error('Event not found.')
  }
  MessageControllers.sendReminders({ event })
}
