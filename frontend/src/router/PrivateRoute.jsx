import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const userName = useSelector((state) => state.auth.username);

  return !userName.length ? <Navigate to="/login" replace />
    : <Outlet />;
};

export default PrivateRoute;
