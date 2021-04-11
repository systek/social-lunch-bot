import * as UserControllers from './user.controllers'
import * as EventControllers from './event.controllers'

import { User } from '../models/user.models'
import { Event } from '../models/event.models'

interface DrawOptions {
  event: Event
  drawCount: number
  exclude?: string[]
}
// Todo: Create type or interface for Winner.
export const drawWinners = async (options: DrawOptions): Promise<User[]> => {
  const { event, drawCount, exclude = [] } = options
  const usersWithActivity = await UserControllers.findUsersWithActivity({ event, exclude })

  const allEvents = await EventControllers.getAllEvents()

  const userParticipationCount = new Map()
  allEvents.forEach((singleEvent) => {
    const userIds = singleEvent.users.map((user) => user.id)
    userIds.forEach((id) => {
      if (userParticipationCount.has(id)) {
        userParticipationCount.set(id, userParticipationCount.get(id) + 1)
      } else {
        userParticipationCount.set(id, 1)
      }
    })
  })

  const usersWithParticipationCount = usersWithActivity
    .map((user) => {
      return {
        id: user.id,
        participations: userParticipationCount.has(user.id) ? userParticipationCount.get(user.id) : 0,
      }
    })
    .sort((a, b) => a.participations - b.participations)

  const topTier = usersWithParticipationCount.slice(0, 10)
  const shuffeledTopTier = topTier.sort(() => Math.random() - 0.5)
  const selectdIds = shuffeledTopTier.slice(0, drawCount).map((element) => element.id)

  const drawUsers = UserControllers.getUsersById(selectdIds)

  return drawUsers
}
