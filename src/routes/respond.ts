import { Request, Response } from 'express'
import * as UserControllers from '../controllers/users.controllers'
import * as RespondControllers from '../controllers/respond.controllers'
import * as ActivityControllers from '../controllers/activity.controllers'
import * as MessageControllers from '../controllers/message.controllers'
import { InvitationStatus } from '../models/invitation.models'

export const postRespond = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body)
  const { payload }: { payload: string } = req.body
  let json = null

  try {
    json = JSON.parse(payload)
  } catch (error) {
    console.log(payload)
    console.log(error)
  }

  const { actions } = json
  if (actions.length === 0) {
    res.json({ success: false })
    return
  }
  const action = actions[0]
  const invitation = await RespondControllers.handleInvitationResponse(action)
  const activity = await ActivityControllers.getActivityByType(invitation.activity.type)

  // invitation.user is a sub-document, so we need to get the actual document before
  // adding the new activity to it.
  const user = await UserControllers.singleUser(invitation.user.id)

  if (!user || !activity) {
    res.json({ success: false })
    return
  }

  if (invitation.status === InvitationStatus.ACCEPTED) {
    const hasActivityAlready = user.activities.some((existingActivity) => existingActivity.type === activity.type)
    if (!hasActivityAlready) {
      user.activities.push(activity)
    }
    const updatedUser = await user.save()
    invitation.user = updatedUser
    invitation.save()

    console.log('UpdatedUser', user)
    await MessageControllers.sendJoinConfirmation(invitation, user)
  }

  if (invitation.status === InvitationStatus.REJECTED) {
    UserControllers.removeUserFromActivity({ user, activity })
    await MessageControllers.sendRejectConfirmation(invitation, user)
  }

  res.json({ success: true })
}
