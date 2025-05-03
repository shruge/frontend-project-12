import { ErrorBoundary, Provider } from '@rollbar/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoginForm from '../pages/Auth/LoginForm'
import RegisterForm from '../pages/Auth/RegisterForm'
import Chat from '../pages/Chat/Chat'
import NotFound from '../pages/NotFound'
import PrivateRoute from '../router/PrivateRoute'
import { setAuthData } from '../store/slices/authSlice'
import { rollbarConfig } from '../utils'
import NavBar from './NavBar'

const App = () => {
  const dispatch = useDispatch()
  const authToken = useSelector(state => state.authData.token)

  useEffect(() => {
    const { token, username } = JSON.parse(localStorage.getItem('user')) || {}

    if (token && !authToken) {
      dispatch(setAuthData({ username, token }))
    }
  }, [authToken, dispatch])

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <div className="d-flex flex-column h-100">
          <NavBar />
          <BrowserRouter basename="/">
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route index element={<Chat />} />
              </Route>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<RegisterForm />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <ToastContainer />
        </div>
      </ErrorBoundary>
    </Provider>
  )
}

export default App
