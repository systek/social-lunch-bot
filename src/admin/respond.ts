import * as InvitationControllers from '../controllers/invitation.controllers'
import * as RespondControllers from '../controllers/respond.controllers'
import { RespondAction } from '../types/respond'

export const respondHandler = async (json: any): Promise<boolean> => {
  const { actions } = json
  if (actions.length === 0) {
    return false
  }

  const action: RespondAction = actions[0]

  const { value, action_id } = action
  const invitationToken = value
  const responseType = action_id as InvitationControllers.ResponseType

  const invitation = await InvitationControllers.validateAndGetInvitation(invitationToken)

  if (!invitation) {
    return false
  }

  RespondControllers.handleResponse({ invitation, responseType })

  return true
}
