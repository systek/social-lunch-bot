import { drawLunchWinners } from '../controllers/draw.controllers'
import { sendLunchInvitation } from '../controllers/message.controllers'

const weeklyLunchDraw = async () => {
  const lunchGuests = drawLunchWinners({ drawCount: 5 })
  const sendResult = await sendLunchInvitation(lunchGuests)
  // Todo: Handle failed sendouts. Send message on Slack to some ops channel?
}
