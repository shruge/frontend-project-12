import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  const userName = useSelector(state => state.authData.username)

  return !userName.length
    ? <Navigate to="/login" replace />
    : <Outlet />
}

export default PrivateRoute
