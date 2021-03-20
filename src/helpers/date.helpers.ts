export const timeToHuman = (epoch: number, hoursOnly: boolean): string => {
  const date = new Date(epoch)

  if (hoursOnly) {
    return Intl.DateTimeFormat('nb-NO', { hour: 'numeric', minute: 'numeric' }).format(date)
  }

  return Intl.DateTimeFormat('nb-NO', { weekday: 'long', hour: 'numeric', minute: 'numeric' }).format(date)
}
