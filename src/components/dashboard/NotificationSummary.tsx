import { Bell, CheckCircle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNotificationStore } from '../../store/notificationStore';
import Button from '../ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';

const NotificationSummary = () => {
  const { notifications, readNotifications } = useNotificationStore();
  
  const totalNotifications = notifications.length;
  const totalRead = readNotifications.length;
  const totalUnread = totalNotifications - totalRead;
  
  // Get notifications by category
  const categoryCounts = {
    general: notifications.filter(n => n.category === 'general').length,
    emergency: notifications.filter(n => n.category === 'emergency').length,
    mess: notifications.filter(n => n.category === 'mess').length,
    maintenance: notifications.filter(n => n.category === 'maintenance').length,
    events: notifications.filter(n => n.category === 'events').length,
  };
  
  // Get the category with the most notifications
  let topCategory = 'general';
  let topCount = 0;
  
  Object.entries(categoryCounts).forEach(([category, count]) => {
    if (count > topCount) {
      topCategory = category;
      topCount = count;
    }
  });
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="mr-2 h-5 w-5 text-primary" />
          Notification Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center p-4 bg-secondary/50 rounded-lg">
            <Eye className="h-8 w-8 text-foreground mb-2" />
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-2xl font-bold">{totalNotifications}</p>
          </div>
          <div className="flex flex-col items-center p-4 bg-secondary/50 rounded-lg">
            <CheckCircle className="h-8 w-8 text-success mb-2" />
            <p className="text-sm text-muted-foreground">Read</p>
            <p className="text-2xl font-bold">{totalRead}</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Notification Stats</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Unread</span>
              <span className="text-sm font-medium">{totalUnread}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Most common category</span>
              <span className="text-sm font-medium capitalize">{topCategory} ({topCount})</span>
            </div>
            <div className="w-full bg-secondary h-2 rounded-full mt-2">
              <div 
                className="bg-primary h-2 rounded-full"
                style={{ width: `${(totalRead / totalNotifications) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground text-center">
              {Math.round((totalRead / totalNotifications) * 100)}% read rate
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link to="/notifications" className="w-full">
          <Button className="w-full" variant="outline">
            View All Notifications
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default NotificationSummary;