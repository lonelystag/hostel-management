import { PieChart as ChartPie } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { NotificationCategory, NotificationPriority } from '../../types';
import { capitalizeFirstLetter } from '../../utils/formatters';

interface CategoryBreakdown {
  category: NotificationCategory;
  count: number;
}

interface PriorityBreakdown {
  priority: NotificationPriority;
  count: number;
}

interface NotificationStatsProps {
  categoryBreakdown: CategoryBreakdown[];
  priorityBreakdown: PriorityBreakdown[];
  totalNotifications: number;
}

const NotificationStats = ({ 
  categoryBreakdown, 
  priorityBreakdown,
  totalNotifications
}: NotificationStatsProps) => {
  // Get percentage for each category
  const categoryPercentages = categoryBreakdown.map(item => ({
    ...item,
    percentage: Math.round((item.count / totalNotifications) * 100) || 0
  }));
  
  // Get percentage for each priority
  const priorityPercentages = priorityBreakdown.map(item => ({
    ...item,
    percentage: Math.round((item.count / totalNotifications) * 100) || 0
  }));
  
  const categoryColors: Record<string, string> = {
    general: 'bg-primary',
    emergency: 'bg-error',
    mess: 'bg-warning',
    maintenance: 'bg-secondary',
    events: 'bg-accent',
  };
  
  const priorityColors: Record<string, string> = {
    low: 'bg-secondary',
    medium: 'bg-warning',
    high: 'bg-error',
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ChartPie className="mr-2 h-5 w-5 text-primary" />
          Notification Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-medium mb-4">By Category</h4>
            <div className="space-y-4">
              {categoryPercentages.map((item) => (
                <div key={item.category} className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${categoryColors[item.category] || 'bg-primary'} mr-2`} />
                  <div className="flex-1">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize">{item.category}</span>
                      <span className="text-muted-foreground">
                        {item.count} ({item.percentage}%)
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={categoryColors[item.category] || 'bg-primary'}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-4">By Priority</h4>
            <div className="space-y-4">
              {priorityPercentages.map((item) => (
                <div key={item.priority} className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${priorityColors[item.priority] || 'bg-primary'} mr-2`} />
                  <div className="flex-1">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize">{capitalizeFirstLetter(item.priority)}</span>
                      <span className="text-muted-foreground">
                        {item.count} ({item.percentage}%)
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={priorityColors[item.priority] || 'bg-primary'}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationStats;