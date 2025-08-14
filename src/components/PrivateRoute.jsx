import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider'; 

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
