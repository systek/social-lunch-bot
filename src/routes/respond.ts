import { Request, Response } from 'express'
import * as RespondControllers from '../controllers/response'

export const postRespond = async (req: Request, res: Response): Promise<void> => {
  const { payload }: { payload: string } = req.body

  const json = JSON.parse(payload)

  const { actions } = json
  if (actions.length > 0) {
    const action = actions[0]
    await RespondControllers.handleInvitationResponse(action)
  }
  res.json({ success: true })
}
