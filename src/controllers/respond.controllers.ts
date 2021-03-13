import * as ActivityControllers from './activity.controllers'
import * as MessageControllers from './message.controllers'
import * as UserControllers from './user.controllers'
import * as InvitationControllers from './invitation.controllers'
import { Invitation, InvitationStatus } from '../models/invitation.models'

import { RespondAction } from '../types/respond'

export const handleMembershipResponse = async (options: {
  invitation: Invitation
  responseType: InvitationControllers.ResponseType
}): Promise<void> => {
  const { invitation, responseType } = options

  const updatedInvitationStatus = responseType === InvitationControllers.ResponseType.ACCEPTED ? InvitationStatus.ACCEPTED : InvitationStatus.REJECTED

  const updatedInvitation = await InvitationControllers.updateInvitationResponse({ invitation, invitationStatus: updatedInvitationStatus })
  const activity = await ActivityControllers.getActivityByType(invitation.activity.type)

  // invitation.user is just a sub-document, so we need to get the actual document before
  // adding the new activity to it.
  const user = await UserControllers.getSingleUser(invitation.user.id)

  if (!user || !activity) {
    throw new Error('Could not find user or activity')
  }

  // User accepted membership of activity
  if (invitation.status === InvitationStatus.ACCEPTED) {
    // User can respond to membership invitation multiple times. Prevent adding more activities of same type.
    const hasActivityAlready = user.activities.some((existingActivity) => existingActivity.type === activity.type)
    if (!hasActivityAlready) {
      user.activities.push(activity)
    }
    const updatedUser = await user.save()
    invitation.user = updatedUser
    invitation.save()

    await MessageControllers.sendJoinConfirmation(invitation, user)
  }

  if (invitation.status === InvitationStatus.REJECTED) {
    UserControllers.removeUserFromActivity({ user, activity })
    await MessageControllers.sendRejectConfirmation(invitation, user)
  }
}
