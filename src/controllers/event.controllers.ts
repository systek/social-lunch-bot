import { v4 as uuid } from 'uuid'
import { Activity } from '../models/activity.models'
import { Event } from '../models/event.models'
import { User } from '../models/user.models'

interface NewEventOptions {
  activity: Activity
  eventTime: number
}

interface MutateUserAtEventOptions {
  event: Event
  user: User
}

export const getSingleEvent = async (id: string): Promise<Event | null> => {
  return Event.findOne({ id })
}

export const getAllEvents = async (): Promise<Event[]> => {
  return Event.find()
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

export const addUserToEvent = async (options: MutateUserAtEventOptions): Promise<void> => {
  const { event, user } = options

  await Event.updateOne({ _id: event._id }, { $push: { users: user } })
}

export const removeUserFromEvent = async (options: MutateUserAtEventOptions): Promise<void> => {
  const { event, user } = options

  await Event.updateOne({ _id: event._id }, { $pull: { users: { _id: user._id } } })
}
