import { Respond } from '../types/respond'

export const handleParticipationResponse = async (body: Respond): Promise<{ success: boolean }> => {
  const { token, response } = body
  // TOTO
  // 1. Register response in DB
  // 2. Send out confirmation message to user.
  // 3. Return appropriate success / fail for http response.
  return { success: true }
}

export const handleActivityResponse = async (body: Respond): Promise<{ success: boolean }> => {
  const { token, response } = body

  // 1. Register response in DB
  // 2. Send out confirmation message to user.
  // 3. Return appropriate success / fail for http response.
  return { success: true }
}
