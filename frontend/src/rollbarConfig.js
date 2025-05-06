const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
  captureUnhandledRejections: true,
  environment: import.meta.env.VITE_ROLLBAR_ENV,
  captureUncaught: true,
}

export default rollbarConfig
