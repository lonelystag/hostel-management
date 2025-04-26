import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? (
          <Moon size={20} className="text-accent" />
        ) : (
          <Sun size={20} className="text-accent" />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;