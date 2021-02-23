# Systek Social Lunch Bot

## How to spin up in development

This application relies on both the backend service and mongodb instance running. You therefore need Docker to spin up both containers. [Click here to install Docker Desktop]("https://docs.docker.com/desktop/") if you haven't already.

### Setting up the development environment

In order for VS Code or other editors to run linting or misc code helpers correctly, you my need to install the npm modules.

To install npm modules:

1. In the projects local folder, run: `yarn install`
2. Find the application running at localhost:4000

To set up Slack token:

Do not use the production Systek Workspace token when you're running this bot locally. This will start sending out
new batches of invites. Instead, create your own Slack Workspace and generate your token from there OR ask to be invited
to an existing Systek Beta Workspace where you can safely test the bot.

The slack token is added in a separate env file:

1. Create the env file `env/slack.secret.env`
2. Add the string `SLACK_SECRET_TOKEN="your-token-here`
3. Note that this env file is ignored by git (see .gitignore)!

### Running the application locally

4. In the project root folder, run:
   `docker-compose -f docker-compose.dev.yml up`.
5. Find the application running at localhost:4000

Make sure that you don't have conficting services running on the same ports.

### Tunneling your local running instance for outside access

(Details to come)
