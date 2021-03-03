import { WebAPICallResult, WebClient } from '@slack/web-api'
import { MessageAttachment } from '@slack/types'

import { User } from '../models/user'

// Initialize
let slack: WebClient

export const initSlackConnection = (): Promise<WebClient> => {
  const secretSlackToken = process.env.SLACK_SECRET_TOKEN

  if (!secretSlackToken) {
    throw new Error(
      'Could not find Slack secret token. Make sure you have added the env file ./env/slack.secret.env locally or that Github secrets is available.',
    )
  }

  slack = new WebClient(secretSlackToken)

  return new Promise((resolve, reject) => {
    slack.auth
      .test()
      .then(() => {
        resolve(slack)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export const getSlackUsers = async (): Promise<any> => {
  const callResult: WebAPICallResult = await slack.users.list()
  return callResult.members
}

export const getStatus = async (): Promise<boolean> => {
  const slackTestResult: WebAPICallResult = await slack.auth.test()
  return !!slackTestResult.ok
}

export const sendMessage = async (blocks: any, user: User) => {
  console.log('posting')
  slack.chat.postMessage({
    channel: user.slackId,
    text: 'Hello world :tada:',
    blocks,
  })
}
