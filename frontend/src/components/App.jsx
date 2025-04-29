import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../router/PrivateRoute';
import { setAuthData } from '../store/slices/authSlice';
import NavBar from './NavBar';
import Chat from './pages/Chat/Chat';
import AuthForm from './pages/Forms/AuthForm';
import RegisterForm from './pages/Forms/RegisterForm';
import NotFound from './pages/NotFound';

const App = () => {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.authData.token);

  useEffect(() => {
    const { token, username } = JSON.parse(localStorage.getItem('user')) || {};

    if (token && !authToken) { dispatch(setAuthData({ username, token })); }
  }, [authToken, dispatch]);

  return (
    <div className="d-flex flex-column h-100">
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Chat />} />
          </Route>
          <Route path="/login" element={<AuthForm />} />
          <Route path="/signup" element={<RegisterForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
