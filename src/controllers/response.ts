import { Respond, RespondAction } from '../types/respond'

export const handleInvitationResponse = async (body: RespondAction): Promise<{ success: boolean }> => {
  const { value, action_id } = body
  const responseToken = value
  const responseType = action_id
  console.log(responseToken, responseType)
  // TOTO
  // 1. Register response in DB based on token
  // 2. Send out confirmation message to user.
  // 3. Return appropriate success / fail for http response.
  return { success: true }
}
