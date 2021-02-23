import { ChatPostMessageArguments, WebClient } from '@slack/web-api'

export const checkForNewUsers = () => {
  // Retrieve a list of Systek Slack users and compare with DB.
  // Remove any DB users that are no longer in Slack list
  // Add any DB users that are not already in DB.
}
