import schedule from 'node-schedule'

let membershipInvitationSchedule
let eventInvitationSchedule
let eventReminderSchedule

export const startSchedules = (): void => {
  schedule.scheduleJob('eventInvitationSchedule', '40 * * * * *', () => console.log('send invitation'))
}
