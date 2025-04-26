import { useEffect, useState } from 'react';
import { BarChart3, BellRing, BookOpen, FileCheck } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import AnalyticsCard from '../components/analytics/AnalyticsCard';
import EngagementByCategory from '../components/analytics/EngagementByCategory';
import NotificationStats from '../components/analytics/NotificationStats';
import { useNotificationStore } from '../store/notificationStore';
import { AnalyticsData } from '../types';

const Analytics = () => {
  const { notifications, readNotifications } = useNotificationStore();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  
  useEffect(() => {
    // Calculate analytics data
    if (notifications.length === 0) return;
    
    const totalNotifications = notifications.length;
    const readCount = readNotifications.length;
    const unreadCount = totalNotifications - readCount;
    
    // Calculate category breakdown
    const categoryMap = new Map<string, number>();
    notifications.forEach(n => {
      const count = categoryMap.get(n.category) || 0;
      categoryMap.set(n.category, count + 1);
    });
    
    const categoryBreakdown = Array.from(categoryMap.entries()).map(([category, count]) => ({
      category: category as any,
      count
    }));
    
    // Calculate priority breakdown
    const priorityMap = new Map<string, number>();
    notifications.forEach(n => {
      const count = priorityMap.get(n.priority) || 0;
      priorityMap.set(n.priority, count + 1);
    });
    
    const priorityBreakdown = Array.from(priorityMap.entries()).map(([priority, count]) => ({
      priority: priority as any,
      count
    }));
    
    // Calculate engagement by category
    const readNotificationIds = readNotifications.map(r => r.notificationId);
    const engagementByCategory = Array.from(categoryMap.entries()).map(([category, totalCount]) => {
      const categoryNotifications = notifications.filter(n => n.category === category);
      const readCategoryNotifications = categoryNotifications.filter(n => 
        readNotificationIds.includes(n.id)
      );
      
      const readPercentage = Math.round(
        (readCategoryNotifications.length / totalCount) * 100
      );
      
      return {
        category,
        readPercentage
      };
    });
    
    // Mock read time trend
    const readTimeTrend = [
      { date: '2023-06-01', avgReadTime: 5 },
      { date: '2023-06-02', avgReadTime: 8 },
      { date: '2023-06-03', avgReadTime: 4 },
      { date: '2023-06-04', avgReadTime: 7 },
      { date: '2023-06-05', avgReadTime: 6 },
    ];
    
    setAnalyticsData({
      totalNotifications,
      readCount,
      unreadCount,
      categoryBreakdown,
      priorityBreakdown,
      readTimeTrend,
      engagementByCategory
    });
  }, [notifications, readNotifications]);
  
  if (!analyticsData) {
    return (
      <MainLayout title="Analytics">
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
          <p className="mt-2 text-muted-foreground">Loading analytics...</p>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout title="Analytics">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <AnalyticsCard
          title="Total Notifications"
          value={analyticsData.totalNotifications}
          icon={<BellRing size={18} />}
          subtitle="All notifications sent in the system"
        />
        
        <AnalyticsCard
          title="Read Rate"
          value={`${Math.round((analyticsData.readCount / analyticsData.totalNotifications) * 100)}%`}
          icon={<BookOpen size={18} />}
          change={{ 
            value: 12, 
            isPositive: true 
          }}
        />
        
        <AnalyticsCard
          title="Unread Notifications"
          value={analyticsData.unreadCount}
          icon={<FileCheck size={18} />}
          change={{ 
            value: 5, 
            isPositive: false 
          }}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <NotificationStats
          categoryBreakdown={analyticsData.categoryBreakdown}
          priorityBreakdown={analyticsData.priorityBreakdown}
          totalNotifications={analyticsData.totalNotifications}
        />
        
        <EngagementByCategory
          data={analyticsData.engagementByCategory}
        />
      </div>
      
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Insights</h3>
        <div className="space-y-4">
          <div className="p-4 bg-secondary/50 rounded-lg">
            <h4 className="font-medium mb-2">Notification Effectiveness</h4>
            <p className="text-sm text-muted-foreground">
              {analyticsData.engagementByCategory.sort((a, b) => b.readPercentage - a.readPercentage)[0]?.category} 
              notifications have the highest engagement at 
              {' '}{analyticsData.engagementByCategory.sort((a, b) => b.readPercentage - a.readPercentage)[0]?.readPercentage}%.
              Consider using this category for important announcements.
            </p>
          </div>
          
          <div className="p-4 bg-secondary/50 rounded-lg">
            <h4 className="font-medium mb-2">Recommended Actions</h4>
            <p className="text-sm text-muted-foreground">
              {analyticsData.engagementByCategory.sort((a, b) => a.readPercentage - b.readPercentage)[0]?.readPercentage < 50 ? 
                `${analyticsData.engagementByCategory.sort((a, b) => a.readPercentage - b.readPercentage)[0]?.category} notifications have low engagement. Consider improving their visibility or sending reminders.` :
                'All notification categories have good engagement rates. Continue with the current notification strategy.'
              }
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Analytics;