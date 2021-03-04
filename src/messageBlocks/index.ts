import { Activity } from '../models/activity'

const activityNameLibrary = {
  INVITATION_SYSTEK_LUNCH: `Hei! To ganger i uken trekker vi heldige kollegaer som får spise lunsj og
  møtes på video! Du får tydelig beskjed i forkant. Har du lyst til å være med?`,
}

interface InvitationMessageOptions {
  invitationToken: string
  activity: Activity
}

type TextKey = keyof { INVITATION_SYSTEK_LUNCH: string }

const getMessageText = (key: TextKey) => {
  return activityNameLibrary[key]
}

export const buildInvitationMessage = (options: InvitationMessageOptions): any => {
  const { invitationToken, activity } = options
  return [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: getMessageText('INVITATION_SYSTEK_LUNCH'),
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
          action_id: 'accept_invitation',
        },
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Nei takk!',
            emoji: true,
          },
          value: invitationToken,
          action_id: 'reject_invitation',
        },
      ],
    },
  ]
}
