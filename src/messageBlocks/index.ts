import { ActivityKey } from '../models/activity'

const activityNameLibrary = {
  [ActivityKey.SOCIAL_LUNCH]: 'Sosial videolunsj',
}

export const buildInvitationMessage = (randomNumber: number, activityType: ActivityKey): any => {
  return [
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
          value: 'click_me_123',
          action_id: 'accept_invitation',
        },
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Nei takk!',
            emoji: true,
          },
          value: 'click_me_123',
          action_id: 'reject_invitation',
        },
      ],
    },
  ]
}
