import { ChatPostMessageArguments, WebClient } from '@slack/web-api'

import { ActivityType } from '../types/activityType'
import { Winner } from '../types/winner'

export const sendJoinInvitation = (activityType: ActivityType) => {
  // Get list of all users without a status in UserActivity
  // Terje Karlsen id: U7U21PELD // const healthResponse = {}
  // team id: T04251BM1
  /* slack.users.list().then((listResponse: any) => console.log(listResponse.members.find((item: any) => item.id === 'U7U21PELD')))
    const messageOptions: ChatPostMessageArguments = {
      channel: 'U7U21PELD',
      text: 'First chat',
    }
    slack.chat.postMessage(messageOptions).then((postResponse) => {
      console.log(postResponse)
    })
    */
}

export const sendThisWeeksInvitation = (activityType: ActivityType) => {}

export const sendLunchInvitation = (lunchGuests: Winner[]): Promise<boolean> => {
  // 1. Get pool of participants
  // 2. Take weight into account to avoid drawing people who just did lunsj
  // 3. Send out invitations

  return new Promise((resolve) => resolve)
}
