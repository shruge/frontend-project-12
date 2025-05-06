const basePath = '/api/v1/'

const routes = {
  rootPage: () => '/',
  otherPage: () => '*',
  logInPage: () => '/login',
  signUpPage: () => '/signup',
  logInLink: () => `${basePath}login`,
  signUpLink: () => `${basePath}signup`,
  messagesLink: () => `${basePath}messages`,
  channelsLink: () => `${basePath}channels`,
}

export default routes
