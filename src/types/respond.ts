// For now, the content is the same, but for clarity, keep these two responds
// as different types.
interface LunchRespond {
  accept: boolean
}

interface ParticipationRespond {
  accept: boolean
}

export interface Respond {
  token: string
  response: LunchRespond | ParticipationRespond
}
