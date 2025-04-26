export type UserRole = 'student' | 'warden';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  hostelId: string;
  roomNumber?: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export type NotificationCategory = 'general' | 'emergency' | 'mess' | 'maintenance' | 'events';

export type NotificationPriority = 'low' | 'medium' | 'high';

export interface Notification {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  priority: NotificationPriority;
  createdAt: string;
  createdBy: User;
  updatedAt: string;
  expiresAt?: string;
  hostelId: string;
}

export interface NotificationRead {
  id: string;
  notificationId: string;
  userId: string;
  readAt: string;
}

export interface Hostel {
  id: string;
  name: string;
  location: string;
}

export type FeedbackCategory = 'mess' | 'facilities';
export type FeedbackRating = 1 | 2 | 3 | 4 | 5;

export interface Feedback {
  id: string;
  category: FeedbackCategory;
  rating: FeedbackRating;
  comment: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  hostelId: string;
  resolved?: boolean;
  response?: string;
}

export interface AnalyticsData {
  totalNotifications: number;
  readCount: number;
  unreadCount: number;
  categoryBreakdown: {
    category: NotificationCategory;
    count: number;
  }[];
  priorityBreakdown: {
    priority: NotificationPriority;
    count: number;
  }[];
  readTimeTrend: {
    date: string;
    avgReadTime: number;
  }[];
  engagementByCategory: {
    category: NotificationCategory;
    readPercentage: number;
  }[];
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface NotificationFilters {
  category?: NotificationCategory;
  priority?: NotificationPriority;
  search?: string;
  read?: boolean;
}