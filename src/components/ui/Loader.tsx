import { motion } from 'framer-motion';
import { BellRing } from 'lucide-react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <BellRing size={48} className="text-primary mb-4" />
        </motion.div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Loading</h2>
        <p className="text-muted-foreground mb-6">Please wait...</p>
        <motion.div 
          className="h-1 w-40 bg-secondary overflow-hidden rounded-full"
        >
          <motion.div 
            className="h-full bg-primary"
            animate={{ 
              x: ["-100%", "100%"],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Loader;