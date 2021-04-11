import * as DateHelpers from '../../helpers/date.helpers'

import { InvitationType } from '../../models/invitation.models'
import { RemindOptions } from './types'

export const buildEventReminder = (options: RemindOptions): any => {
  const { invitationType, eventDetails } = options

  let notificationText = ''

  if (invitationType === InvitationType.EVENT) {
    notificationText = `God morgen! Gå inn på følgende lenke kl ${DateHelpers.timeToHuman(eventDetails.time, true)} for å bli med på lunsj! ${
      eventDetails.url
    }`
  }

  return { notificationText }
}
