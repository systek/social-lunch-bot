import schedule from 'node-schedule'
import { postNewEvent } from './admin.controllers'

let membershipInvitationSchedule
let eventInvitationSchedule
let eventReminderSchedule

export const startSchedules = (): void => {
  schedule.scheduleJob('eventInvitationSchedule', '40 * * * * *', postNewEvent)
}
