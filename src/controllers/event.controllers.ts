import { v4 as uuid } from 'uuid'
import { Activity } from '../models/activity.models'
import { Event } from '../models/event.models'
import { User } from '../models/user.models'

interface NewEventOptions {
  activity: Activity
  eventTime: number
}

interface AddUsersToEventOptions {
  event: Event
  user: User
}

export const getSingleEvent = async (id: string): Promise<Event | null> => {
  return Event.findOne({ id })
}

// Todo: Create type or interface for Winner.
export const createNewEvent = async (options: NewEventOptions): Promise<Event> => {
  const { eventTime, activity } = options
  const url = process.env.APP_EVENT_MEET_URL
  const event = new Event({
    id: uuid(),
    activity,
    eventTime,
    url,
    address: null,
    users: [],
  })

  await event.save()
  return event
}

export const addUserToEvent = async (options: AddUsersToEventOptions): Promise<void> => {
  const { event, user } = options

  console.log('Adding user to event', event, user)

  const updateResult = await Event.updateOne({ _id: event._id }, { $push: { users: user } })
  console.log(updateResult)
}
