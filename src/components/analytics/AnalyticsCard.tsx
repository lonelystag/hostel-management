import { cn } from '../../utils/cn';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
  className?: string;
}

const AnalyticsCard = ({ 
  title, 
  value, 
  icon, 
  change, 
  subtitle,
  className 
}: AnalyticsCardProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={cn(
            "mt-1 text-xs",
            change.isPositive ? "text-success" : "text-error"
          )}>
            {change.isPositive ? "+" : "-"}{Math.abs(change.value)}%
            {' '}
            <span className="text-muted-foreground">from last month</span>
          </p>
        )}
        {subtitle && (
          <p className="mt-3 text-xs text-muted-foreground">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;