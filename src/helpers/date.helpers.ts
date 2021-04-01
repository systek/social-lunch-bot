import '@formatjs/intl-datetimeformat/polyfill'
import '@formatjs/intl-datetimeformat/locale-data/nb'
import '@formatjs/intl-datetimeformat/add-all-tz'

export const timeToHuman = (epoch: number, hoursOnly: boolean): string => {
  const date = new Date(epoch)

  if (hoursOnly) {
    return Intl.DateTimeFormat('nb-NO', { hour: 'numeric', minute: 'numeric', timeZone: 'Europe/Oslo' }).format(date)
  }

  return Intl.DateTimeFormat('nb-NO', { weekday: 'long', hour: 'numeric', minute: 'numeric', timeZone: 'Europe/Oslo' }).format(date)
}
