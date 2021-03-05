import { Request, Response } from 'express'
import * as RespondControllers from '../controllers/respond.controllers'
import * as UserControllers from '../controllers/users.controllers'
import * as MessageControllers from '../controllers/message.controllers'
import { InvitationStatus } from '../models/invitation.models'

export const postRespond = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body)
  const { payload }: { payload: string } = req.body
  let json = null

  console.log(payload)
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
  const user = invitation ? await UserControllers.findUserWithInvitation(invitation) : null

  if (!user) {
    res.json({ success: false })
    return
  }

  if (invitation.status === InvitationStatus.ACCEPTED) {
    await MessageControllers.sendJoinConfirmation(invitation, user)
  }

  if (invitation.status === InvitationStatus.REJECTED) {
    await MessageControllers.sendRejectConfirmation(invitation, user)
  }

  res.json({ success: true })
}
