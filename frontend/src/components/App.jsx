import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../router/PrivateRoute';
import { setAuthData } from '../store/slices/authSlice';
import { getChannels } from '../store/slices/channelsSlice';
import AuthForm from './AuthForm';
import Chat from './Chat';
import NavBar from './NavBar';
import NotFound from './NotFound';
import './styles/App.css';

const App = () => {
  const authToken = useSelector((state) => state.authData.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const { token, username } = JSON.parse(localStorage.getItem('user')) || {};

    if (token && !authToken) {
      dispatch(getChannels(token));
      dispatch(setAuthData({ username, token }));
    }
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
