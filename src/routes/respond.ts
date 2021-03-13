import { Request, Response } from 'express'
import * as UserControllers from '../controllers/user.controllers'
import * as InvitationControllers from '../controllers/invitation.controllers'
import * as RespondControllers from '../controllers/respond.controllers'
import * as ActivityControllers from '../controllers/activity.controllers'
import * as MessageControllers from '../controllers/message.controllers'
import { InvitationStatus, InvitationType } from '../models/invitation.models'

export const postRespond = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body)
  const { payload }: { payload: string } = req.body
  let json = null

  try {
    json = JSON.parse(payload)
  } catch (error) {
    throw new Error(error)
  }

  const { actions } = json
  if (actions.length === 0) {
    res.json({ success: false })
    return
  }
  const action = actions[0]

  const { value, action_id } = action
  const invitationToken = value

  const invitation = await InvitationControllers.validateAndGetInvitation(invitationToken)

  if (!invitation) {
    res.json({ success: false })
    return
  }

  if (invitation.type === InvitationType.MEMBERSHIP) {
    RespondControllers.handleMembershipResponse({ invitation, responseType: action_id })
  }

  res.json({ success: true })
}
