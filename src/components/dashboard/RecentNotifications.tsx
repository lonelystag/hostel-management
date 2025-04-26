import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNotificationStore } from '../../store/notificationStore';
import Button from '../ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import NotificationCard from '../notifications/NotificationCard';

const RecentNotifications = () => {
  const { notifications, readNotifications, markAsRead } = useNotificationStore();
  
  // Get the 3 most recent notifications
  const recentNotifications = [...notifications]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);
  
  const handleMarkAsRead = async (id: string) => {
    await markAsRead(id);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5 text-primary" />
          Recent Notifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentNotifications.length > 0 ? (
            recentNotifications.map(notification => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                readNotifications={readNotifications}
                onMarkAsRead={handleMarkAsRead}
                isCompact
              />
            ))
          ) : (
            <p className="text-center py-6 text-muted-foreground">
              No notifications yet
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Link to="/notifications" className="w-full">
          <Button className="w-full" variant="outline">
            View All
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RecentNotifications;