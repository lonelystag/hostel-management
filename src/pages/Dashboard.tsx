import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNotificationStore } from '../store/notificationStore';
import MainLayout from '../components/layout/MainLayout';
import NotificationSummary from '../components/dashboard/NotificationSummary';
import RecentNotifications from '../components/dashboard/RecentNotifications';
import NotificationForm from '../components/forms/NotificationForm';
import { Notification } from '../types';

const Dashboard = () => {
  const { user } = useAuthStore();
  const { fetchNotifications, createNotification } = useNotificationStore();
  
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);
  
  const handleCreateNotification = async (data: Partial<Notification>) => {
    await createNotification(data);
  };
  
  return (
    <MainLayout title={`Welcome, ${user?.name}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Hostel Notification System</h2>
            <p className="text-muted-foreground">
              {user?.role === 'warden' 
                ? 'Manage and send notifications to students. Monitor engagement and ensure all important information is delivered effectively.'
                : 'Stay updated with all hostel announcements and notifications. Never miss important updates.'
              }
            </p>
          </div>
          
          <RecentNotifications />
        </div>
        
        <div className="space-y-6">
          <NotificationSummary />
          
          {user?.role === 'warden' && (
            <NotificationForm onSubmit={handleCreateNotification} />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;