# zipapp

## Requirements

- Make sure you're running the node version marked in the `.nvmrc` file (currently: `v18.8.0`)
- Run `npm install` in the root directory
  - This will run the `npm install` in both `./app` and `./api` from a `postinstall` script
    - NOTE: Verify that both have ran succesfully and have generated their corresponding `node_modules` subfolders
- Double check that ports `3000` and `4000` are clear, as those are being used by both sides of the app

## Getting Started

- Run `npm run start-dev`, this will start and join the outputs from the react app and the graphql node api
- Go to `http://localhost:3000/` (if it didn't go there on its own)
