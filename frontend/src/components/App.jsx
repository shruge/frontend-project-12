import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import routes from '../api/routes'
import LoginForm from '../pages/Auth/LoginForm'
import RegisterForm from '../pages/Auth/RegisterForm'
import Chat from '../pages/Chat/Chat'
import NotFound from '../pages/NotFound'
import PrivateRoute from '../router/PrivateRoute'
import NavBar from './NavBar'

const App = () => (
  <div className="d-flex flex-column h-100">
    <NavBar />
    <BrowserRouter basename={routes.rootPage()}>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route index element={<Chat />} />
        </Route>
        <Route path={routes.logInPage()} element={<LoginForm />} />
        <Route path={routes.signUpPage()} element={<RegisterForm />} />
        <Route path={routes.otherPage()} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer />
  </div>
)

export default App
