import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundBlobs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Top Left Blob */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-brand-primary/10 blur-[100px] dark:bg-brand-primary/5"
      />
      
      {/* Middle Right Blob */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -70, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[20%] -right-[5%] w-[35%] h-[35%] rounded-full bg-brand-secondary/10 blur-[120px] dark:bg-brand-secondary/5"
      />

      {/* Bottom Left Blob */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[10%] -left-[5%] w-[30%] h-[30%] rounded-full bg-brand-primary/10 blur-[100px] dark:bg-brand-primary/5"
      />

      {/* Light Beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-brand-primary/20 via-transparent to-transparent opacity-30 hidden lg:block" />
    </div>
  );
};

export const FloatingIcon = ({ icon: Icon, color, delay = 0, initialX, initialY }) => (
  <motion.div
    initial={{ x: initialX, y: initialY, opacity: 0 }}
    animate={{ 
      y: [initialY, initialY - 30, initialY],
      opacity: 1,
      rotate: [0, 10, -10, 0]
    }}
    transition={{
      y: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      },
      rotate: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      },
      opacity: { duration: 1 }
    }}
    className={`absolute p-4 rounded-2xl glass-card ${color} hidden lg:block z-20`}
  >
    <Icon size={28} />
  </motion.div>
);
