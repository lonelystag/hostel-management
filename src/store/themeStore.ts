import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: getInitialTheme(),
      
      toggleTheme: () => {
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        }));
      },
      
      setTheme: (theme) => {
        set({ theme });
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);

function getInitialTheme(): Theme {
  // Check if we're in the browser
  if (typeof window !== 'undefined') {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme-storage');
    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme);
        if (parsed.state?.theme) {
          return parsed.state.theme;
        }
      } catch (e) {
        console.error('Error parsing saved theme', e);
      }
    }
    
    // Check for system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  
  // Default to light theme
  return 'light';
}