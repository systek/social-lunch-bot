import { ChannelsCreateArguments, ConversationsCreateArguments, ConversationsOpenArguments, WebAPICallResult, WebClient } from '@slack/web-api'

import { User } from '../models/user.models'

// Initialize
let slack: WebClient

export const initSlackConnection = (): Promise<WebClient> => {
  const secretSlackToken = process.env.APP_SLACK_TOKEN

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

interface SendMessageOptions {
  notificationText: string
  messageBlocks?: any
  user: User
}

interface SendConversationOptions {
  notificationText: string
  messageBlocks: any
  conversationId: string
}

interface CreateDMGroupOptions {
  userIds: string[]
}

export const sendMessage = async (options: SendMessageOptions): Promise<void> => {
  const { user, notificationText, messageBlocks } = options

  if (user.slackId[0] !== 'U') {
    return
  }
  try {
    await slack.chat.postMessage({
      channel: user.slackId,
      text: notificationText,
      blocks: messageBlocks,
    })
  } catch (error) {
    throw new Error(`'Could not send message. Slack returned error: ${error}'`)
  }
}

export const createConversation = async (options: CreateDMGroupOptions): Promise<string | null> => {
  const { userIds } = options

  const conversationOptions: ConversationsOpenArguments = { users: userIds.join(',') }

  const conversation: WebAPICallResult & { channel?: { id: string } } = await slack.conversations.open(conversationOptions)

  const { channel } = conversation
  return channel?.id || null
}

export const sendConversation = async (options: SendConversationOptions): Promise<void> => {
  const { notificationText, messageBlocks, conversationId } = options

  try {
    await slack.chat.postMessage({
      channel: conversationId,
      text: notificationText,
      blocks: messageBlocks,
    })
  } catch (error) {
    throw new Error(`'Could not send message. Slack returned error: ${error}'`)
  }
}
