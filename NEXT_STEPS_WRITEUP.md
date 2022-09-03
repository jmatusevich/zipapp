# Next Steps

## API

- Serve country/range information from the API (currently shipping as part of the app in `countries.ts`)
- Find another data provider, since it doesn't support some countries (e.g. the UK)
- Add a database engine to the API (optional)
  - Record user history there, keep anonymous randomized identifier in browser for fetching it
  - The intention would be be able to learn from the searches, find patterns, and potential future features

## App

- Make the app handle transitions (like showing a new result) more gracefully
  - Implement animated transitions
- Validate zip code ranges (per the (zippopotam docs)[https://www.zippopotam.us/#where])
  - mark the zipcode field with red when the value is outside the range
  - potentially check the content type of this field (e.g. not allow letters if the country uses only numbers)

## Deployment Strategy

- Currently there's no deployment strategy, therefore...
  - Use express from the API to serve the static parts of our website (e.i. the app)
  - write automated scripts usable from a CI environment to build the app and make it available to the API
  - Write a Dockerfile for deployment to a kubernetes like environment
  - Implement test running for CI

## Generally

- Write more tests
  - App is untested
  - API is barely tested
  - e2e tests are absent
