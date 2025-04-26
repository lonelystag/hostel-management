import { useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import FeedbackForm from '../components/feedback/FeedbackForm';
import FeedbackList from '../components/feedback/FeedbackList';
import { useFeedbackStore } from '../store/feedbackStore';
import { useAuthStore } from '../store/authStore';

const Feedback = () => {
  const { user } = useAuthStore();
  const { feedbacks, isLoading, createFeedback, fetchFeedbacks } = useFeedbackStore();

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  const handleSubmitFeedback = async (data: {
    category: 'mess' | 'facilities';
    rating: 1 | 2 | 3 | 4 | 5;
    comment: string;
  }) => {
    await createFeedback(data);
  };

  return (
    <MainLayout title="Feedback">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <FeedbackList
            feedbacks={feedbacks}
            isLoading={isLoading}
          />
        </div>
        
        {user?.role === 'student' && (
          <div>
            <FeedbackForm
              onSubmit={handleSubmitFeedback}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Feedback;