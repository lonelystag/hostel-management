import { motion } from 'framer-motion';
import { Check, Info } from 'lucide-react';
import { Notification, NotificationRead } from '../../types';
import { formatDateTime, getRelativeTime } from '../../utils/formatters';
import { CategoryBadge, PriorityBadge } from '../ui/Badge';
import Button from '../ui/Button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/Card';
import { cn } from '../../utils/cn';

interface NotificationCardProps {
  notification: Notification;
  readNotifications: NotificationRead[];
  onMarkAsRead: (id: string) => void;
  isCompact?: boolean;
}

const NotificationCard = ({ 
  notification, 
  readNotifications, 
  onMarkAsRead,
  isCompact = false
}: NotificationCardProps) => {
  const isRead = readNotifications.some(
    r => r.notificationId === notification.id
  );
  
  const handleMarkAsRead = () => {
    if (!isRead) {
      onMarkAsRead(notification.id);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className={cn(
          'notification-card',
          notification.category,
          !isRead && 'unread',
          'hover:shadow-md transition-shadow duration-200'
        )}
      >
        <CardHeader className={cn("pb-3", isCompact && "py-3")}>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-foreground flex items-center">
                {notification.title}
                {!isRead && (
                  <span className="ml-2 h-2 w-2 rounded-full bg-primary animate-pulse" />
                )}
              </h3>
              <p className="text-sm text-muted-foreground">
                {getRelativeTime(notification.createdAt)}
              </p>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <CategoryBadge category={notification.category} />
              {!isCompact && <PriorityBadge priority={notification.priority} />}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className={isCompact ? 'py-0' : undefined}>
          <p className={cn("text-foreground", isCompact && "line-clamp-2")}>
            {notification.message}
          </p>
        </CardContent>
        
        {!isCompact && (
          <CardFooter className="flex justify-between items-center text-sm text-muted-foreground border-t border-border mt-3 pt-3">
            <div className="flex items-center">
              <Info size={16} className="mr-1" />
              <span>Posted by {notification.createdBy.name}</span>
            </div>
            
            {isRead ? (
              <div className="flex items-center text-success">
                <Check size={16} className="mr-1" />
                <span>Read</span>
              </div>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={handleMarkAsRead}
              >
                Mark as read
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};

export default NotificationCard;