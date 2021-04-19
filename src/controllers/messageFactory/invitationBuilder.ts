import * as DateHelpers from '../../helpers/date.helpers'

export interface BuildInvitationOptions {
  invitationToken: string
  invitationDetails?: any
}

export const buildMembershipInvitation = (options: BuildInvitationOptions): any => {
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
          action_id: 'ACCEPTED',
        },
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Nei takk!',
            emoji: true,
          },
          value: invitationToken,
          action_id: 'DECLINED',
        },
      ],
    },
  ]

  return { notificationText, messageBlocks }
}

export const buildEventInvitation = (options: BuildInvitationOptions): any => {
  const { invitationToken, invitationDetails } = options
  const notificationText = `God morgen! Du er invitert til lunsj førstkommende ${DateHelpers.timeToHuman(invitationDetails.time, false)}!`

  const messageBlocks = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `God morgen! Du er invitert til lunsj med 5 andre kollegaer førstkommende ${DateHelpers.timeToHuman(invitationDetails.time, false)}!
Vi håper du kan være med! Hvis det ikke passer denne gangen er det flott om du svarer
raskt - da kan nemlig en annen heldig vinner få plassen din!`,
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
          action_id: 'ACCEPTED',
        },
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Nei takk!',
            emoji: true,
          },
          value: invitationToken,
          action_id: 'DECLINED',
        },
      ],
    },
  ]

  return { notificationText, messageBlocks }
}
