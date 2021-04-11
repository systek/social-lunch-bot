import * as InvitationControllers from '../controllers/invitation.controllers'
import * as UserControllers from '../controllers/user.controllers'
import * as MessageControllers from '../controllers/message.controllers'

import { ActivityType } from '../models/activity.models'
import { InvitationType } from '../models/invitation.models'

/* Updates the user registry against Slack and then posts
 * invites to all new users that were added from Slack since last time.
 */
export const postMembershipInvitationToNewUser = async (activityType: ActivityType): Promise<void> => {
  const newUsers = await UserControllers.updateUserRegistryAgainstSlack()
  if (newUsers.length === 0) {
    return
  }
  const invitations = await InvitationControllers.createUserInvitations({ users: newUsers, activityType, invitationType: InvitationType.MEMBERSHIP })
  await MessageControllers.sendInvitations(invitations)
}

export const postMembershipInvitationToAllUsers = async (activityType: ActivityType): Promise<void> => {
  const allUsers = await UserControllers.getAllUsers()
  const invitations = await InvitationControllers.createUserInvitations({
    users: allUsers,
    activityType,
    invitationType: InvitationType.MEMBERSHIP,
  })
  await MessageControllers.sendInvitations(invitations)
}
