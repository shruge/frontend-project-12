import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../router/PrivateRoute';
import { setAuthData } from '../store/slices/authSlice';
import AuthForm from './AuthForm';
import NotFound from './NotFound';
import './styles/App.css';

const App = () => {
  const authToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('JWT');
    const username = localStorage.getItem('username');

    if (token && !authToken) dispatch(setAuthData({ username, token }));
  }, [authToken, dispatch]);

  return (
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<h1>Welcome!</h1>} />
          </Route>
          <Route path="/login" element={<AuthForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
