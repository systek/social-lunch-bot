import { Request, Response } from 'express'
import * as UserControllers from '../controllers/user.controllers'
import * as InvitationControllers from '../controllers/invitation.controllers'
import * as RespondControllers from '../controllers/respond.controllers'
import * as ActivityControllers from '../controllers/activity.controllers'
import * as MessageControllers from '../controllers/message.controllers'
import { InvitationStatus, InvitationType } from '../models/invitation.models'
import { RespondAction } from '../types/respond'

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

  const action: RespondAction = actions[0]

  const { value, action_id } = action
  const invitationToken = value
  const responseType = action_id as InvitationControllers.ResponseType

  const invitation = await InvitationControllers.validateAndGetInvitation(invitationToken)

  if (!invitation) {
    res.json({ success: false })
    return
  }

  RespondControllers.handleResponse({ invitation, responseType })

  res.json({ success: true })
}
