"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 800); // Small delay before fade out
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 2;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center font-mono text-primary"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-start w-64">
            <div className="mb-4 text-sm opacity-70">
              <p>&gt; SYSTEM INITIALIZATION...</p>
              <p>&gt; CONNECTING TO AI CORE...</p>
              <p>&gt; RUNNING SECURITY SCAN...</p>
            </div>
            
            <div className="text-4xl font-bold tracking-tighter mb-2">
              {progress >= 100 ? 100 : progress}%
            </div>
            
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            
            {progress === 100 && (
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="mt-4 text-accent text-sm"
              >
                ACCESS GRANTED.
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
