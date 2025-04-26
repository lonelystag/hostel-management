import { create } from 'zustand';
import { Notification, NotificationCategory, NotificationFilters, NotificationPriority, NotificationRead, User } from '../types';

interface NotificationState {
  notifications: Notification[];
  readNotifications: NotificationRead[];
  isLoading: boolean;
  hasMoreToLoad: boolean;
  
  fetchNotifications: (filters?: NotificationFilters) => Promise<Notification[]>;
  getNotificationById: (id: string) => Notification | undefined;
  markAsRead: (notificationId: string) => Promise<void>;
  createNotification: (data: Partial<Notification>) => Promise<Notification>;
  getUnreadCount: () => number;
}

// Mock data
const currentDate = new Date();
const threeDaysAgo = new Date(currentDate);
threeDaysAgo.setDate(currentDate.getDate() - 3);

const oneDayAgo = new Date(currentDate);
oneDayAgo.setDate(currentDate.getDate() - 1);

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Water Supply Interruption',
    message: 'Due to maintenance work, water supply will be interrupted from 10 AM to 2 PM tomorrow.',
    category: 'maintenance',
    priority: 'medium',
    createdAt: threeDaysAgo.toISOString(),
    updatedAt: threeDaysAgo.toISOString(),
    createdBy: {
      id: 'warden-1',
      name: 'Jane Smith',
      email: 'warden@example.com',
      role: 'warden',
      hostelId: 'hostel-1',
      profileImage: 'https://i.pravatar.cc/150?u=warden1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    hostelId: 'hostel-1',
  },
  {
    id: '2',
    title: 'Fire Drill Announcement',
    message: 'A fire drill will be conducted on Friday at 3 PM. All students must participate.',
    category: 'emergency',
    priority: 'high',
    createdAt: oneDayAgo.toISOString(),
    updatedAt: oneDayAgo.toISOString(),
    createdBy: {
      id: 'warden-1',
      name: 'Jane Smith',
      email: 'warden@example.com',
      role: 'warden',
      hostelId: 'hostel-1',
      profileImage: 'https://i.pravatar.cc/150?u=warden1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    hostelId: 'hostel-1',
  },
  {
    id: '3',
    title: 'Weekend Mess Menu',
    message: 'Special menu for the weekend includes pizza on Saturday and biryani on Sunday.',
    category: 'mess',
    priority: 'low',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: {
      id: 'warden-1',
      name: 'Jane Smith',
      email: 'warden@example.com',
      role: 'warden',
      hostelId: 'hostel-1',
      profileImage: 'https://i.pravatar.cc/150?u=warden1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    hostelId: 'hostel-1',
  },
  {
    id: '4',
    title: 'Cultural Night',
    message: 'Annual cultural night will be held next week. Register your performances by Monday.',
    category: 'events',
    priority: 'medium',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: {
      id: 'warden-1',
      name: 'Jane Smith',
      email: 'warden@example.com',
      role: 'warden',
      hostelId: 'hostel-1',
      profileImage: 'https://i.pravatar.cc/150?u=warden1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    hostelId: 'hostel-1',
  },
  {
    id: '5',
    title: 'Room Inspection',
    message: 'Monthly room inspection will be conducted on Tuesday starting at 10 AM.',
    category: 'general',
    priority: 'medium',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: {
      id: 'warden-1',
      name: 'Jane Smith',
      email: 'warden@example.com',
      role: 'warden',
      hostelId: 'hostel-1',
      profileImage: 'https://i.pravatar.cc/150?u=warden1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    hostelId: 'hostel-1',
  }
];

const mockReadNotifications: NotificationRead[] = [
  {
    id: 'read-1',
    notificationId: '1',
    userId: 'student-1',
    readAt: new Date().toISOString(),
  },
  {
    id: 'read-2',
    notificationId: '3',
    userId: 'student-1',
    readAt: new Date().toISOString(),
  }
];

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  readNotifications: [],
  isLoading: false,
  hasMoreToLoad: true,
  
  fetchNotifications: async (filters) => {
    set({ isLoading: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let filteredNotifications = [...mockNotifications];
    
    if (filters) {
      if (filters.category) {
        filteredNotifications = filteredNotifications.filter(
          n => n.category === filters.category
        );
      }
      
      if (filters.priority) {
        filteredNotifications = filteredNotifications.filter(
          n => n.priority === filters.priority
        );
      }
      
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredNotifications = filteredNotifications.filter(
          n => n.title.toLowerCase().includes(searchTerm) || 
               n.message.toLowerCase().includes(searchTerm)
        );
      }
      
      if (filters.read !== undefined) {
        const readIds = mockReadNotifications.map(r => r.notificationId);
        filteredNotifications = filteredNotifications.filter(
          n => filters.read ? readIds.includes(n.id) : !readIds.includes(n.id)
        );
      }
    }
    
    // Sort by date (newest first)
    filteredNotifications.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    set({ 
      notifications: filteredNotifications,
      readNotifications: mockReadNotifications,
      isLoading: false,
      hasMoreToLoad: false, // In a real app, this would be based on pagination
    });
    
    return filteredNotifications;
  },
  
  getNotificationById: (id) => {
    return get().notifications.find(n => n.id === id);
  },
  
  markAsRead: async (notificationId) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const readNotification: NotificationRead = {
      id: `read-${Date.now()}`,
      notificationId,
      userId: 'student-1', // Assuming current user is student-1
      readAt: new Date().toISOString(),
    };
    
    set(state => ({
      readNotifications: [...state.readNotifications, readNotification]
    }));
  },
  
  createNotification: async (data) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newNotification: Notification = {
      id: `notification-${Date.now()}`,
      title: data.title || '',
      message: data.message || '',
      category: data.category || 'general',
      priority: data.priority || 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: {
        id: 'warden-1',
        name: 'Jane Smith',
        email: 'warden@example.com',
        role: 'warden',
        hostelId: 'hostel-1',
        profileImage: 'https://i.pravatar.cc/150?u=warden1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      hostelId: 'hostel-1',
      ...data,
    };
    
    set(state => ({
      notifications: [newNotification, ...state.notifications]
    }));
    
    return newNotification;
  },
  
  getUnreadCount: () => {
    const { notifications, readNotifications } = get();
    const readIds = readNotifications.map(r => r.notificationId);
    return notifications.filter(n => !readIds.includes(n.id)).length;
  }
}));