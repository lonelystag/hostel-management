import { useEffect, useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import NotificationCard from '../components/notifications/NotificationCard';
import NotificationFilters from '../components/notifications/NotificationFilters';
import { useNotificationStore } from '../store/notificationStore';
import { NotificationFilters as FiltersType } from '../types';
import { motion } from 'framer-motion';

const NotificationBoard = () => {
  const { 
    notifications, 
    readNotifications, 
    fetchNotifications, 
    markAsRead,
    isLoading,
    hasMoreToLoad
  } = useNotificationStore();
  
  const [filters, setFilters] = useState<FiltersType>({});
  
  useEffect(() => {
    fetchNotifications(filters);
  }, [fetchNotifications, filters]);
  
  const handleMarkAsRead = async (id: string) => {
    await markAsRead(id);
  };
  
  const handleFilter = (newFilters: FiltersType) => {
    setFilters(newFilters);
  };
  
  return (
    <MainLayout title="Notification Board">
      <NotificationFilters onFilter={handleFilter} />
      
      <div className="space-y-6">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
            <p className="mt-2 text-muted-foreground">Loading notifications...</p>
          </div>
        ) : notifications.length === 0 ? (
          <motion.div 
            className="text-center py-12 bg-card rounded-lg border border-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-muted-foreground">No notifications found</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                readNotifications={readNotifications}
                onMarkAsRead={handleMarkAsRead}
              />
            ))}
            
            {hasMoreToLoad && (
              <div className="text-center py-4">
                <button 
                  className="btn btn-ghost"
                  onClick={() => {
                    // In a real app, this would load more notifications
                  }}
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default NotificationBoard;