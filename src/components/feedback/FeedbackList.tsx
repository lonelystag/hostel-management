import { motion } from 'framer-motion';
import { MessageSquare, Star, CheckCircle } from 'lucide-react';
import { Feedback } from '../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { formatDateTime } from '../../utils/formatters';

interface FeedbackListProps {
  feedbacks: Feedback[];
  isLoading?: boolean;
}

const FeedbackList = ({ feedbacks, isLoading = false }: FeedbackListProps) => {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
        <p className="mt-2 text-muted-foreground">Loading feedback...</p>
      </div>
    );
  }

  if (feedbacks.length === 0) {
    return (
      <div className="text-center py-12 bg-card rounded-lg border border-border">
        <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-2 text-muted-foreground">No feedback yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {feedbacks.map((feedback, index) => (
        <motion.div
          key={feedback.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="capitalize text-lg">
                    {feedback.category} Feedback
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {formatDateTime(feedback.createdAt)}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-warning"
                      fill={i < feedback.rating ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{feedback.comment}</p>
              
              {feedback.resolved && (
                <div className="mt-4 p-3 bg-success/10 rounded-md">
                  <div className="flex items-center text-success mb-2">
                    <CheckCircle size={16} className="mr-2" />
                    <span className="text-sm font-medium">Resolved</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {feedback.response}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default FeedbackList;