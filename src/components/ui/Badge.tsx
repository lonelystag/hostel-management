import { cn } from '../../utils/cn';
import { NotificationCategory, NotificationPriority } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'error';
  className?: string;
}

const Badge = ({ children, variant = 'primary', className }: BadgeProps) => {
  return (
    <span
      className={cn(
        'badge',
        `badge-${variant}`,
        className
      )}
    >
      {children}
    </span>
  );
};

export const CategoryBadge = ({ category }: { category: NotificationCategory }) => {
  const variants: Record<NotificationCategory, {
    variant: BadgeProps['variant'],
    label: string
  }> = {
    general: { variant: 'primary', label: 'General' },
    emergency: { variant: 'error', label: 'Emergency' },
    mess: { variant: 'warning', label: 'Mess' },
    maintenance: { variant: 'secondary', label: 'Maintenance' },
    events: { variant: 'accent', label: 'Events' },
  };

  const { variant, label } = variants[category];

  return (
    <Badge variant={variant}>
      {label}
    </Badge>
  );
};

export const PriorityBadge = ({ priority }: { priority: NotificationPriority }) => {
  const variants: Record<NotificationPriority, {
    variant: BadgeProps['variant'],
    label: string
  }> = {
    low: { variant: 'secondary', label: 'Low Priority' },
    medium: { variant: 'warning', label: 'Medium Priority' },
    high: { variant: 'error', label: 'High Priority' },
  };

  const { variant, label } = variants[priority];

  return (
    <Badge variant={variant}>
      {label}
    </Badge>
  );
};

export default Badge;