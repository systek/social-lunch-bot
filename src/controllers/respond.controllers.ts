import * as ActivityControllers from './activity.controllers'
import * as MessageControllers from './message.controllers'
import * as UserControllers from './user.controllers'
import * as DrawControllers from './draw.controllers'
import * as EventControllers from './event.controllers'
import * as InvitationControllers from './invitation.controllers'

import { Invitation, InvitationStatus, InvitationType } from '../models/invitation.models'
import { Activity } from '../models/activity.models'
import { User } from '../models/user.models'

interface HandleTypeResponseOptions {
  invitation: Invitation
  user: User
  activity: Activity
}

const handleMembershipResponse = async (options: HandleTypeResponseOptions): Promise<void> => {
  const { invitation, user, activity } = options
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

    await MessageControllers.sendJoinConfirmation({ invitation, user })
  }

  if (invitation.status === InvitationStatus.REJECTED) {
    UserControllers.removeUserFromActivity({ user, activity })
    await MessageControllers.sendRejectConfirmation({ invitation, user })
  }
}

const handleEventResponse = async (options: HandleTypeResponseOptions): Promise<void> => {
  const { invitation, user } = options

  const event = await EventControllers.getSingleEvent(invitation.event.id)

  if (!event) {
    throw new Error('Could not find event')
  }

  // User accepted membership of activity
  if (invitation.status === InvitationStatus.ACCEPTED) {
    const eventHasUserAlready = event.users.find((eventUser) => eventUser.id === invitation.user.id)

    if (eventHasUserAlready) {
      console.log('Event has user already')
      return
    }

    await EventControllers.addUserToEvent({ user, event })
    await InvitationControllers.updateInvitationResponse({ invitation, invitationStatus: InvitationStatus.ACCEPTED })

    await MessageControllers.sendJoinConfirmation({ invitation, user })
  }

  if (invitation.status === InvitationStatus.REJECTED) {
    await InvitationControllers.rejectInvitation({ invitation, event })
    await EventControllers.removeUserFromEvent({ user, event })
    await MessageControllers.sendRejectConfirmation({ invitation, user })

    // Now, start a new draw to replace the person rejecting.
    const rejectedInvitations = await InvitationControllers.getRejectedInvitationForEvent({ event })
    const usersAlreadyInEvent = event.users.map((singleUser) => singleUser.id)
    const excludeUserIds = [...rejectedInvitations.map((singleInvitation) => singleInvitation.user.id), ...usersAlreadyInEvent]
    const additionalWinners = await DrawControllers.drawWinners({ event, drawCount: 1, exclude: excludeUserIds })

    const invitations = await InvitationControllers.createUserInvitations({
      users: additionalWinners,
      activityType: event.activity.type,
      invitationType: invitation.type,
      event,
    })

    await MessageControllers.sendInvitations(invitations)
  }
}

interface HandleRespondeOptions {
  invitation: Invitation
  responseType: InvitationControllers.ResponseType
}

export const handleResponse = async (options: HandleRespondeOptions): Promise<void> => {
  const { invitation, responseType } = options

  const updatedInvitationStatus = responseType === InvitationControllers.ResponseType.ACCEPTED ? InvitationStatus.ACCEPTED : InvitationStatus.REJECTED

  await InvitationControllers.updateInvitationResponse({ invitation, invitationStatus: updatedInvitationStatus })
  const activity = await ActivityControllers.getActivityByType(invitation.activity.type)

  // invitation.user is just a sub-document, so we need to get the actual document before
  // adding the new activity to it.
  const user = await UserControllers.getSingleUser(invitation.user.id)

  if (!user || !activity) {
    throw new Error('Could not find user or activity')
  }

  if (invitation.type === InvitationType.MEMBERSHIP) {
    handleMembershipResponse({ invitation, user, activity })
  }

  if (invitation.type === InvitationType.EVENT) {
    handleEventResponse({ invitation, user, activity })
  }
}
