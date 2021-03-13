export const MessageFactory = {
  SOCIAL_LUNCH: {
    MEMBERSHIP: {
      getInvitationNotification: (): string => 'Hei! Vil du være med på Systek sin sosiale lunch-ordning?',
      getInvitationMessageBlocks: (invitationToken: string): any => [
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
      ],
      getAcceptNotificationText: (): string => `Så hyggelig at du blir med! 🤩 Du får beskjed et par dager i forveien hvis du vinner ukens trekning!
Dersom du ikke kan denne dagen, vil du få muligheten igjen senere!`,
      getRejectNotificationText: (): string => `Det går fint! 🙂 Vi noterer oss at du ikke ønsker å være med!`,
    },
    EVENT: {
      getInvitationNotification: (invitationDay: string): string => `God morgen! Du er invitert til lunsj på ${invitationDay}!`,
      getInvitationMessageBlocks: (invitationToken: string, invitationDay: string): any => [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `God morgen! Du er invitert til lunsj med 5 andre kollegaer på ${invitationDay}!
Vi håper du kan være med! Hvis det ikke passer allikevel er det flott om du svarer
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
      ],
      getAcceptNotificationText: (): string => `Bra! Dy er med på lunsch`,
      getRejectNotificationText: (): string => `OK, vi trekker noen andre`,
    },
  },
}
