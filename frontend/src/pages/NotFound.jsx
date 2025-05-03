import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <>
      <h1>{t('pageNotFound')}</h1>
      <Link to="/">{t('toHomePage')}</Link>
    </>
  )
}

export default NotFound
