import { Filter, X } from 'lucide-react';
import { useState } from 'react';
import { NotificationCategory, NotificationFilters as FiltersType, NotificationPriority } from '../../types';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

interface NotificationFiltersProps {
  onFilter: (filters: FiltersType) => void;
}

const NotificationFilters = ({ onFilter }: NotificationFiltersProps) => {
  const [filters, setFilters] = useState<FiltersType>({});
  const [isExpanded, setIsExpanded] = useState(false);
  
  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'general', label: 'General' },
    { value: 'emergency', label: 'Emergency' },
    { value: 'mess', label: 'Mess' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'events', label: 'Events' },
  ];
  
  const priorityOptions = [
    { value: '', label: 'All Priorities' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];
  
  const readOptions = [
    { value: '', label: 'All Notifications' },
    { value: 'true', label: 'Read' },
    { value: 'false', label: 'Unread' },
  ];
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };
  
  const handleCategoryChange = (value: string) => {
    setFilters(prev => ({ 
      ...prev, 
      category: value as NotificationCategory | undefined 
    }));
  };
  
  const handlePriorityChange = (value: string) => {
    setFilters(prev => ({ 
      ...prev, 
      priority: value as NotificationPriority | undefined 
    }));
  };
  
  const handleReadChange = (value: string) => {
    if (value === 'true') {
      setFilters(prev => ({ ...prev, read: true }));
    } else if (value === 'false') {
      setFilters(prev => ({ ...prev, read: false }));
    } else {
      setFilters(prev => {
        const newFilters = { ...prev };
        delete newFilters.read;
        return newFilters;
      });
    }
  };
  
  const handleApplyFilters = () => {
    onFilter(filters);
  };
  
  const handleClearFilters = () => {
    setFilters({});
    onFilter({});
  };
  
  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };
  
  const hasActiveFilters = Object.keys(filters).length > 0;
  
  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleExpand}
            leftIcon={<Filter size={16} />}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearFilters}
              leftIcon={<X size={16} />}
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <Input
          placeholder="Search notifications..."
          value={filters.search || ''}
          onChange={handleSearchChange}
        />
        
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Select
              options={categoryOptions}
              value={filters.category || ''}
              onChange={handleCategoryChange}
              label="Category"
            />
            
            <Select
              options={priorityOptions}
              value={filters.priority || ''}
              onChange={handlePriorityChange}
              label="Priority"
            />
            
            <Select
              options={readOptions}
              value={filters.read === undefined ? '' : String(filters.read)}
              onChange={handleReadChange}
              label="Status"
            />
          </div>
        )}
        
        <div className="flex justify-end mt-4">
          <Button
            variant="primary"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationFilters;