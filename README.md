# footyStatsAPI

## Introduction

Node API with a single endpoint to return player stats by season, specific month or specific week

## Getting Started

You will need to have the appropriate version of Node installed, I recommend using [NVM](https://github.com/nvm-sh/nvm) and adding the 'Deeper Shell Integration' as that will utilise the .nvmrc to switch to the relevant version of Node for the project.

Once Node is installed you will need to run npm install to add the dependencies.

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
The app runs on [http://localhost:3001](http://localhost:3001).

### `npm run start:dev`

Runs the app in the development mode. This uses nodemon to restart the server whenever changes are made to the code.
The app runs on [http://localhost:3001](http://localhost:3001).

### Pre-commit hook

When committing a pre-commit hook uses a combination of [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) to:

- help identify potential security hotspots, via [eslint-plugin-security](https://www.npmjs.com/package/eslint-plugin-security)
- check there are no syntax errors
- consistently format the code

## Gotchas

To get this application working you need to have a locally running version of MySQL with credentials matching those in `src/db/connection.js` as well as the seed file.
