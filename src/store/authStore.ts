import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

// Mock data for demonstration
const mockUsers = [
  {
    id: 'student-1',
    name: 'John Doe',
    email: 'student@example.com',
    role: 'student',
    hostelId: 'hostel-1',
    roomNumber: 'A-101',
    profileImage: 'https://i.pravatar.cc/150?u=student1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'warden-1',
    name: 'Jane Smith',
    email: 'warden@example.com',
    role: 'warden',
    hostelId: 'hostel-1',
    profileImage: 'https://i.pravatar.cc/150?u=warden1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      login: async (email, password) => {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        // Mock authentication logic
        const foundUser = mockUsers.find(user => user.email === email);
        
        if (!foundUser) {
          throw new Error('Invalid credentials');
        }
        
        // In a real app, you would validate the password here
        
        // Mock token
        const token = `mock-token-${Date.now()}`;
        
        set({
          user: foundUser as User,
          token,
          isAuthenticated: true,
        });
        
        return foundUser as User;
      },
      
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
      
      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);