import * as UserControllers from './user.controllers'
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
  const users = await UserControllers.findRandomUsersWithActivity({ event, limit: drawCount, exclude })
  return users
}
