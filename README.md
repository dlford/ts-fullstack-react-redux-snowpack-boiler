# TS Full Stack React Redux Snowpack Boiler

A boilerplate project for React/Redux/Snowpack frontend and Express backend with websockets, example tests for both frontend and backend.

The following Husky hooks are pre-configured:

- pre-commit: ESLint/Prettier
- pre-push: Test

## Getting Started

Clone the repository and run `npm install` and `npm start` in the root folder. This will install all dependencies of both child folders `web` and `api`, then start them both up in development mode.

## Structure

```text
api
  __tests__ - API Tests directory
  src
    app.ts - Defines routes for HTTP(S) and WebSocket
    server.ts - Wraps Express and WebSocket server into a single `http` server
    constants.ts - Defines constants for the app, put all `process.env` declarations here
web
  src
    components - React components and their tests
    enums - TypeScript enums
    hooks - React hooks
    lib - Generic functions
    store
      index.tx - Redux setup
      actions - Redux actions and tests
      reducers - Redux reducers
    styled - Generic CSS-in-JS component styles using `@emotion`
    App.ts - React App
    constants.ts - Defines constants for the app, put all `process.env` declarations here
    index.ts - React entrypoint
```
