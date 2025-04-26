import { useState } from 'react';
import { MessageSquare, Star } from 'lucide-react';
import { FeedbackCategory, FeedbackRating } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import Button from '../ui/Button';
import Select from '../ui/Select';
import { motion } from 'framer-motion';

interface FeedbackFormProps {
  onSubmit: (data: {
    category: FeedbackCategory;
    rating: FeedbackRating;
    comment: string;
  }) => Promise<void>;
  isLoading?: boolean;
}

const FeedbackForm = ({ onSubmit, isLoading = false }: FeedbackFormProps) => {
  const [category, setCategory] = useState<FeedbackCategory>('mess');
  const [rating, setRating] = useState<FeedbackRating>(5);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ category, rating, comment });
    setComment('');
    setRating(5);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="mr-2 h-5 w-5 text-primary" />
          Submit Feedback
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Category"
            options={[
              { value: 'mess', label: 'Mess Food' },
              { value: 'facilities', label: 'Facilities' },
            ]}
            value={category}
            onChange={(value) => setCategory(value as FeedbackCategory)}
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <motion.button
                  key={value}
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setRating(value as FeedbackRating)}
                  className={`p-2 rounded-full transition-colors ${
                    value <= rating ? 'text-warning' : 'text-muted-foreground'
                  }`}
                >
                  <Star
                    size={24}
                    fill={value <= rating ? 'currentColor' : 'none'}
                  />
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              placeholder="Share your feedback..."
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 min-h-[100px]"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
          >
            Submit Feedback
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;