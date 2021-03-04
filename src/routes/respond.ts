import { Request, Response } from 'express'
import * as RespondControllers from '../controllers/response'
import * as UserControllers from '../controllers/users'
import * as MessageControllers from '../controllers/message'

export const postRespond = async (req: Request, res: Response): Promise<void> => {
  const { payload }: { payload: string } = req.body

  const json = JSON.parse(payload)

  const { actions } = json
  if (actions.length === 0) {
    res.json({ success: false })
    return
  }
  const action = actions[0]
  const invitation = await RespondControllers.handleInvitationResponse(action)
  console.log(invitation)
  const user = invitation ? await UserControllers.findUserWithInvitation(invitation) : null

  console.log(user)

  if (!user) {
    res.json({ success: false })
    return
  }

  await MessageControllers.sendJoinConfirmation(invitation, user)

  res.json({ success: true })
}
