import { BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { motion } from 'framer-motion';
import { capitalizeFirstLetter } from '../../utils/formatters';

interface CategoryEngagement {
  category: string;
  readPercentage: number;
}

interface EngagementByCategoryProps {
  data: CategoryEngagement[];
}

const EngagementByCategory = ({ data }: EngagementByCategoryProps) => {
  // Sort data by read percentage (highest first)
  const sortedData = [...data].sort((a, b) => b.readPercentage - a.readPercentage);
  
  const categoryColors: Record<string, string> = {
    general: 'bg-primary',
    emergency: 'bg-error',
    mess: 'bg-warning',
    maintenance: 'bg-secondary',
    events: 'bg-accent',
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="mr-2 h-5 w-5 text-primary" />
          Engagement by Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedData.map((item) => (
            <div key={item.category} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">
                  {capitalizeFirstLetter(item.category)}
                </span>
                <span className="text-muted-foreground">
                  {item.readPercentage}% read rate
                </span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className={categoryColors[item.category] || 'bg-primary'}
                  style={{ width: '0%' }}
                  animate={{ width: `${item.readPercentage}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EngagementByCategory;