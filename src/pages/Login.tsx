import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Lock, Mail } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import ThemeToggle from '../components/ui/ThemeToggle';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = (location.state as any)?.from || '/dashboard';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };
  
  const loginAsStudent = async () => {
    setEmail('student@example.com');
    setPassword('password');
    setIsLoading(true);
    
    try {
      await login('student@example.com', 'password');
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };
  
  const loginAsWarden = async () => {
    setEmail('warden@example.com');
    setPassword('password');
    setIsLoading(true);
    
    try {
      await login('warden@example.com', 'password');
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <GraduationCap className="h-12 w-12 text-primary mr-2" />
            <span className="text-3xl font-bold text-foreground">Campus Connect</span>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card p-8 rounded-lg shadow-lg border border-border college-card"
        >
          <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>
          
          {error && (
            <div className="p-3 mb-4 text-sm rounded-md bg-error/10 text-error">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your.email@example.com"
              leftIcon={<Mail size={18} />}
            />
            
            <Input
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              leftIcon={<Lock size={18} />}
            />
            
            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </form>
          
          <div className="mt-6">
            <p className="text-sm text-center text-muted-foreground mb-4">
              Quick Demo Login
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={loginAsStudent}
                disabled={isLoading}
              >
                Login as Student
              </Button>
              <Button
                variant="outline"
                onClick={loginAsWarden}
                disabled={isLoading}
              >
                Login as Warden
              </Button>
            </div>
          </div>
        </motion.div>
        
        <p className="text-center mt-8 text-sm text-muted-foreground">
          Campus Connect &copy; 2025. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default Login;