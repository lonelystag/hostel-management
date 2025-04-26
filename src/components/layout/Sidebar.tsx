import { Bell, BarChart3, Home, Settings, Users, MessageSquare } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const Sidebar = () => {
  const { pathname } = useLocation();
  const { user } = useAuthStore();
  
  if (!user) return null;
  
  const menuItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <Home size={20} />,
      roles: ['student', 'warden'],
    },
    {
      name: 'Notifications',
      path: '/notifications',
      icon: <Bell size={20} />,
      roles: ['student', 'warden'],
    },
    {
      name: 'Analytics',
      path: '/analytics',
      icon: <BarChart3 size={20} />,
      roles: ['warden'],
    },
    {
      name: 'Feedback',
      path: '/feedback',
      icon: <MessageSquare size={20} />,
      roles: ['student', 'warden'],
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: <Settings size={20} />,
      roles: ['student', 'warden'],
    },
  ];
  
  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user.role)
  );
  
  return (
    <aside className="hidden md:block w-64 border-r border-border bg-card/50">
      <div className="h-full p-4">
        <div className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Menu
          </h3>
        </div>
        <nav className="space-y-1">
          {filteredMenuItems.map((item) => {
            const isActive = pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center px-4 py-3 text-sm font-medium rounded-md',
                  'transition-all duration-200 ease-in-out',
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-foreground hover:bg-secondary'
                )}
              >
                <div className="mr-3">
                  {item.icon}
                </div>
                <span>{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute right-0 w-1 h-8 bg-primary rounded-l-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
        
        <div className="mt-auto pt-8">
          <div className="px-4 py-3 bg-secondary/50 rounded-md">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-lg font-medium text-primary">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {user.name}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {user.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;