import * as InvitationControllers from './invite.controllers'
import { Invitation, InvitationStatus } from '../models/invitation.models'

import { RespondAction } from '../types/respond'

export const handleInvitationResponse = async (body: RespondAction): Promise<Invitation> => {
  const { value, action_id } = body
  const invitationToken = value
  const responseType: InvitationControllers.ResponseType = action_id as InvitationControllers.ResponseType
  const invitation = await InvitationControllers.validateInvitation(invitationToken)

  if (!invitation) {
    throw new Error('failed')
  }

  const updatedInvitationStatus = responseType === InvitationControllers.ResponseType.ACCEPT ? InvitationStatus.ACCEPTED : InvitationStatus.REJECTED

  const updatedInvitation = await InvitationControllers.updateInvitationResponse({ invitation, invitationStatus: updatedInvitationStatus })
  return updatedInvitation
}
