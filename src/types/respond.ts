// For now, the content is the same, but for clarity, keep these two responds
// as different types.

export interface RespondAction {
  action_id: string
  block_id: string
  text: { type: string; text: string; emoji: boolean }
  value: string
  type: string
  action_ts: string
}

export interface Respond {
  actions: RespondAction[]
}
