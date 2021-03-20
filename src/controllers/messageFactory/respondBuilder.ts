import { InvitationType } from '../../models/invitation.models'
import { RespondOptions, MessageContent } from './types'

export const buildAcceptConfirmationMessage = (options: RespondOptions): MessageContent => {
  const { invitationType } = options

  let message = ''

  if (invitationType === InvitationType.MEMBERSHIP) {
    message = `Så hyggelig at du blir med! 🤩 Du får beskjed et par dager i forveien hvis du vinner ukens trekning!
Dersom du ikke kan denne dagen, vil du få muligheten igjen senere!`
  }

  if (invitationType === InvitationType.EVENT) {
    message = `Så hyggelig at du kan være med! 😃 Vi sender lenke til Google Meet samme morgen!\n\n
Husk å ordne deg eller bestille litt ekstra god lunsj som du utgiftsfører på Systek! Vi har satt begrensning på ca 200 kroner.`
  }

  return { notificationText: message, messageBlocks: message }
}

export const buildRejectConfirmationMessage = (options: RespondOptions): MessageContent => {
  const { invitationType } = options

  let message = ''

  if (invitationType === InvitationType.MEMBERSHIP) {
    message = `Det går fint! 🙂 Vi noterer oss at du ikke ønsker å være med!`
  }

  if (invitationType === InvitationType.EVENT) {
    message = `Det går fint, vi trekker noen andre denne gang!`
  }

  return { notificationText: message }
}
