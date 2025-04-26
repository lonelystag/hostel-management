import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useThemeStore } from './store/themeStore';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RoleProtectedRoute from './components/auth/RoleProtectedRoute';
import Loader from './components/ui/Loader';

// Lazy-loaded components
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const NotificationBoard = lazy(() => import('./pages/NotificationBoard'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Profile = lazy(() => import('./pages/Profile'));
const Feedback = lazy(() => import('./pages/Feedback'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const { pathname } = useLocation();
  const { user } = useAuthStore();
  const { theme } = useThemeStore();
  
  useEffect(() => {
    // Apply theme class to document
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/login" element={
            user ? <Navigate to="/dashboard" replace /> : <Login />
          } />
          
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/notifications" element={
            <ProtectedRoute>
              <NotificationBoard />
            </ProtectedRoute>
          } />
          
          <Route path="/analytics" element={
            <RoleProtectedRoute allowedRoles={['warden']}>
              <Analytics />
            </RoleProtectedRoute>
          } />
          
          <Route path="/feedback" element={
            <ProtectedRoute>
              <Feedback />
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;