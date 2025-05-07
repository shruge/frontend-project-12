import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import routes from '../api/routes'

const PrivateRoute = () => {
  const userName = useSelector(state => state.authData.username)

  return !userName.length
    ? <Navigate to={routes.logInPage()} replace />
    : <Outlet />
}

export default PrivateRoute
