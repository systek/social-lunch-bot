import { WebAPICallResult, WebClient } from '@slack/web-api'

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

export const getStatus = async (): Promise<boolean> => {
  const slackTestResult: WebAPICallResult = await slack.auth.test()
  return !!slackTestResult.ok
}
