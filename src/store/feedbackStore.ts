import { create } from 'zustand';
import { Feedback, FeedbackCategory, FeedbackRating } from '../types';

interface FeedbackState {
  feedbacks: Feedback[];
  isLoading: boolean;
  createFeedback: (data: {
    category: FeedbackCategory;
    rating: FeedbackRating;
    comment: string;
  }) => Promise<Feedback>;
  fetchFeedbacks: () => Promise<Feedback[]>;
  resolveFeedback: (id: string, response: string) => Promise<void>;
}

// Mock data
const mockFeedbacks: Feedback[] = [
  {
    id: '1',
    category: 'mess',
    rating: 4,
    comment: 'The food quality has improved significantly this month.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: 'student-1',
    hostelId: 'hostel-1',
  },
  {
    id: '2',
    category: 'facilities',
    rating: 3,
    comment: 'The gym equipment needs maintenance.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: 'student-1',
    hostelId: 'hostel-1',
    resolved: true,
    response: 'Maintenance team has been notified and will fix the equipment this week.',
  },
];

export const useFeedbackStore = create<FeedbackState>((set, get) => ({
  feedbacks: [],
  isLoading: false,

  createFeedback: async (data) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newFeedback: Feedback = {
      id: `feedback-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: 'student-1', // Mock user ID
      hostelId: 'hostel-1', // Mock hostel ID
      ...data,
    };
    
    set(state => ({
      feedbacks: [newFeedback, ...state.feedbacks],
      isLoading: false,
    }));
    
    return newFeedback;
  },

  fetchFeedbacks: async () => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    set({ 
      feedbacks: mockFeedbacks,
      isLoading: false,
    });
    
    return mockFeedbacks;
  },

  resolveFeedback: async (id, response) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    set(state => ({
      feedbacks: state.feedbacks.map(feedback =>
        feedback.id === id
          ? { ...feedback, resolved: true, response, updatedAt: new Date().toISOString() }
          : feedback
      ),
      isLoading: false,
    }));
  },
}));