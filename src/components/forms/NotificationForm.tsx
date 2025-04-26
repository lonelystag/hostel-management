import { useState } from 'react';
import { Notification, NotificationCategory, NotificationPriority } from '../../types';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { SendHorizontal } from 'lucide-react';

interface NotificationFormProps {
  onSubmit: (data: Partial<Notification>) => Promise<void>;
  isLoading?: boolean;
}

const NotificationForm = ({ onSubmit, isLoading = false }: NotificationFormProps) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<NotificationCategory>('general');
  const [priority, setPriority] = useState<NotificationPriority>('medium');
  
  const categoryOptions = [
    { value: 'general', label: 'General' },
    { value: 'emergency', label: 'Emergency' },
    { value: 'mess', label: 'Mess' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'events', label: 'Events' },
  ];
  
  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !message) return;
    
    await onSubmit({
      title,
      message,
      category,
      priority,
    });
    
    // Reset form
    setTitle('');
    setMessage('');
    setCategory('general');
    setPriority('medium');
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <SendHorizontal className="mr-2 h-5 w-5 text-primary" />
          Create Notification
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <Input
            label="Title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Notification title"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Category"
              id="category"
              options={categoryOptions}
              value={category}
              onChange={(value) => setCategory(value as NotificationCategory)}
              required
            />
            
            <Select
              label="Priority"
              id="priority"
              options={priorityOptions}
              value={priority}
              onChange={(value) => setPriority(value as NotificationPriority)}
              required
            />
          </div>
          
          <div>
            <label 
              htmlFor="message" 
              className="block text-sm font-medium text-foreground mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="Enter the notification message..."
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
          >
            Send Notification
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default NotificationForm;