import { Activity } from '../models/activity'

interface InvitationMessageOptions {
  invitationToken: string
  activity: Activity
}

interface MessageContent {
  messageBlocks: any
  notificationText: string
}

export const buildInvitationMessage = (options: InvitationMessageOptions): MessageContent => {
  const { invitationToken } = options

  const notificationText = 'Hei! Vil du være med på Systek sin sosiale lunch-ordning?'

  const messageBlocks = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `Hei! To ganger i uken trekker vi heldige kollegaer som får spise lunsj og
        møtes på video! Du får tydelig beskjed i forkant. Har du lyst til å være med?`,
      },
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Ja, jeg vil være med!',
            emoji: true,
          },
          value: invitationToken,
          action_id: 'ACCEPT',
        },
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Nei takk!',
            emoji: true,
          },
          value: invitationToken,
          action_id: 'DECLINE',
        },
      ],
    },
  ]

  return { messageBlocks, notificationText }
}

export const buildInvitationConfirmatinoMessage = (): MessageContent => {
  const notificationText = `Så hyggelig at du blir med! Du får beskjed et par dager i forveien hvis du vinner ukens trekning!
  Dersom du ikke kan allikevel, vil du få muligheten igjen senere!`

  const messageBlocks = null

  return { messageBlocks, notificationText }
}
