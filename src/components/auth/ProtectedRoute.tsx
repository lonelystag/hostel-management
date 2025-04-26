import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Loader from '../ui/Loader';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();
  
  // Simulate loading state
  const isLoading = false;
  
  if (isLoading) {
    return <Loader />;
  }
  
  if (!isAuthenticated || !user) {
    // Redirect to login page while saving the location they tried to access
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;