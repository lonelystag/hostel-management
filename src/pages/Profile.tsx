import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Mail, MapPin, User } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuthStore } from '../store/authStore';

const Profile = () => {
  const { user, updateUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateUser({
      name,
      email,
    });
    
    setIsEditing(false);
  };
  
  if (!user) return null;
  
  return (
    <MainLayout title="My Profile">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8">
              <motion.div
                className="flex-shrink-0 flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="h-32 w-32 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold text-primary">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <p className="text-lg font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
              </motion.div>
              
              <motion.div 
                className="flex-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      label="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      leftIcon={<User size={18} />}
                    />
                    
                    <Input
                      label="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      leftIcon={<Mail size={18} />}
                    />
                    
                    <div className="flex space-x-2 justify-end pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false);
                          setName(user.name);
                          setEmail(user.email);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        Save Changes
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground flex items-center">
                          <User size={16} className="mr-2" />
                          Name
                        </p>
                        <p className="font-medium">{user.name}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Mail size={16} className="mr-2" />
                          Email
                        </p>
                        <p className="font-medium">{user.email}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground flex items-center">
                          <MapPin size={16} className="mr-2" />
                          Hostel
                        </p>
                        <p className="font-medium">Hostel #1</p>
                      </div>
                      
                      {user.role === 'student' && (
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground flex items-center">
                            <MapPin size={16} className="mr-2" />
                            Room Number
                          </p>
                          <p className="font-medium">{user.roomNumber || 'N/A'}</p>
                        </div>
                      )}
                      
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground flex items-center">
                          <Clock size={16} className="mr-2" />
                          Joined Date
                        </p>
                        <p className="font-medium">
                          {new Date(user.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end pt-4">
                      <Button
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Profile
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-secondary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications on your device
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-secondary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">WhatsApp Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive high priority alerts via WhatsApp
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-secondary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                >
                  Change Password
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start"
                >
                  Privacy Settings
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start text-error"
                >
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;