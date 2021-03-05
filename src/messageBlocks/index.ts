import { Activity } from '../models/activity.models'

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
        text: `Hei 👋! To ganger i uken trekker vi kollegaer som får møtes for videolunsj! \n\n
Slik fungerer det:
Dersom du blir trukket ut, får du melding om det i god tid i forkant av lunsjen.\n\n
Du ordner selv med lunsj for ca 200 kroner, feks fra nærmeste bakeri eller levering hjem,
og så skriver du utlegg til Systek. Har du lyst til å være med i trekningen?`,
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
  const notificationText = `Så hyggelig at du blir med! 🤩 Du får beskjed et par dager i forveien hvis du vinner ukens trekning!
Dersom du ikke kan denne dagen, vil du få muligheten igjen senere!`

  const messageBlocks = null

  return { messageBlocks, notificationText }
}

export const buildInvitationRejectionMessage = (): MessageContent => {
  const notificationText = `Det går fint! 🙂 Vi noterer oss at du ikke ønsker å være med!`

  const messageBlocks = null

  return { messageBlocks, notificationText }
}
