import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import leoProfanity from 'leo-profanity'
import { StrictMode } from 'react'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { Provider as ReduxProvider } from 'react-redux'
import App from './components/App'
import ru from './locales/ru'
import rollbarConfig from './rollbarConfig'
import { initChatSocket } from './socket'
import store from './store/store'

const init = async () => {
  const i18n = i18next.createInstance()
  const ruWords = leoProfanity.getDictionary('ru')
  const enWords = leoProfanity.getDictionary('en')

  await i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      resources: { ru },
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    })

  initChatSocket(store)

  leoProfanity.add([...ruWords, ...enWords])

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <StrictMode>
          <ReduxProvider store={store}>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </ReduxProvider>
        </StrictMode>
      </ErrorBoundary>
    </RollbarProvider>
  )
}

export default init
