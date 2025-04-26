import { GraduationCap, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useNotificationStore } from '../../store/notificationStore';
import ThemeToggle from '../ui/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { getUnreadCount } = useNotificationStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const unreadCount = getUnreadCount();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };
  
  return (
    <header className="college-header shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <GraduationCap className="h-8 w-8 text-white mr-2" />
              <span className="text-xl font-bold text-white">Campus Connect</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <>
                <Link to="/notifications" className="relative text-white hover:text-white/80 transition-colors">
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                  Notifications
                </Link>
                <ThemeToggle />
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-white">
                    {user.name}
                  </span>
                </div>
                <button 
                  onClick={logout}
                  className="text-sm text-white hover:text-white/80 transition-colors"
                >
                  Logout
                </button>
              </>
            )}
            
            {!user && (
              <Link
                to="/login"
                className="text-white hover:text-white/80 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
          
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white p-2"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-secondary"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 pt-2 pb-4 space-y-3">
              {user ? (
                <>
                  <div className="flex items-center space-x-2 py-2">
                    <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-sm font-medium text-white">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-white">
                      {user.name}
                    </span>
                  </div>
                  
                  <Link 
                    to="/dashboard" 
                    className="block py-2 text-white hover:text-white/80 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  
                  <Link 
                    to="/notifications" 
                    className="block py-2 text-white hover:text-white/80 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Notifications {unreadCount > 0 && `(${unreadCount})`}
                  </Link>
                  
                  <Link 
                    to="/feedback" 
                    className="block py-2 text-white hover:text-white/80 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Feedback
                  </Link>
                  
                  {user.role === 'warden' && (
                    <Link 
                      to="/analytics" 
                      className="block py-2 text-white hover:text-white/80 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Analytics
                    </Link>
                  )}
                  
                  <Link 
                    to="/profile" 
                    className="block py-2 text-white hover:text-white/80 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  
                  <button 
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 text-white hover:text-white/80 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block py-2 text-white hover:text-white/80 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;