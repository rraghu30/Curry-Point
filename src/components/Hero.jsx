import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Utensils, Star, Zap, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BackgroundBlobs, FloatingIcon } from './DecorativeElements';

const Hero = () => {
  return (
    <section className="relative min-h-[95vh] flex items-center pt-28 pb-20 overflow-hidden bg-white dark:bg-[#0A0A0B]">
      <BackgroundBlobs />
      
      {/* Premium Floating Elements */}
      <FloatingIcon 
        icon={Flame} 
        color="text-orange-500" 
        delay={0} 
        initialX="10%" 
        initialY="20%" 
      />
      <FloatingIcon 
        icon={Star} 
        color="text-brand-secondary" 
        delay={1} 
        initialX="85%" 
        initialY="30%" 
      />
      <FloatingIcon 
        icon={Zap} 
        color="text-yellow-400" 
        delay={0.5} 
        initialX="15%" 
        initialY="70%" 
      />

      {/* Decorative Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/5 via-transparent to-brand-secondary/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-3 bg-white/50 dark:bg-white/5 backdrop-blur-md px-6 py-2.5 rounded-full border border-brand-primary/20 shadow-xl"
            >
              <span className="w-2.5 h-2.5 bg-brand-primary rounded-full animate-pulse shadow-[0_0_10px_#FF8A00]" />
              <span className="text-brand-primary font-bold text-sm tracking-widest uppercase">Voted #1 Curry Platform 2024</span>
            </motion.div>

            <h1 className="text-6xl lg:text-[100px] font-outfit font-black leading-[0.95] text-brand-dark dark:text-white tracking-tighter">
              Savor the <br />
              <span className="hd-gradient-text drop-shadow-[0_10px_30px_rgba(255,138,0,0.3)]">Authentic</span> <br />
              Cuisine
            </h1>

            <p className="text-gray-600 dark:text-gray-400 text-xl max-w-lg leading-relaxed font-inter">
              Experience a <span className="text-brand-dark dark:text-gray-200 font-bold">symphony of traditional spices</span> and modern culinary techniques, crafted daily for the gourmet in you.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-8 pt-4">
              <Link to="/veg" className="w-full sm:w-auto btn-primary py-6 px-12 text-xl flex items-center justify-center space-x-4 shadow-[0_20px_50px_rgba(255,138,0,0.4)] hover:scale-105 active:scale-95 transition-all group">
                <span>Explore Full Menu</span>
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              
              <button className="flex items-center space-x-5 group text-brand-dark dark:text-gray-300 hover:text-brand-primary transition-all">
                <div className="w-16 h-16 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl flex items-center justify-center shadow-xl group-hover:bg-brand-primary group-hover:text-white group-hover:rotate-12 transition-all">
                  <Play size={24} className="ml-1 fill-current" />
                </div>
                <span className="font-extrabold text-xl tracking-tight">Watch Our Story</span>
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-10 pt-12 border-t border-gray-100 dark:border-white/5">
              <StatItem value="50+" label="Spice Blends" />
              <StatItem value="25min" label="Avg Delivery" />
              <StatItem value="15k+" label="Happy Foodies" />
            </div>
          </motion.div>

          {/* Visual Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative"
          >
            {/* Soft Glow Background */}
            <div className="absolute -inset-10 bg-brand-primary/20 blur-[100px] rounded-full animate-pulse" />
            
            <div className="relative z-10 rounded-[5rem] overflow-hidden shadow-[0_100px_150px_-30px_rgba(255,138,0,0.3)] border-[8px] border-white dark:border-white/5">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8 }}
                src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800" 
                alt="Delicious Indian Platter" 
                className="w-full h-[650px] object-cover"
              />
            </div>
            
            {/* Float Badge */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-12 -left-12 bg-white/90 dark:bg-brand-dark/90 backdrop-blur-xl p-8 rounded-[3rem] shadow-2xl z-20 hidden sm:flex items-center space-x-6 border border-brand-primary/20"
            >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-400 shadow-inner">
                <Utensils size={32} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 uppercase font-black tracking-widest">Pure Authentic</p>
                <p className="font-outfit font-black text-2xl text-brand-dark dark:text-white">Farm to Table</p>
              </div>
            </motion.div>

            <motion.div 
              animate={{ rotate: [12, 15, 12] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -bottom-10 -right-10 w-48 h-48 bg-brand-secondary rounded-full flex flex-col items-center justify-center text-brand-dark shadow-[0_20px_60px_rgba(255,199,0,0.4)] z-20"
            >
              <span className="text-sm font-black uppercase tracking-[0.2em]">Fresh</span>
              <span className="text-5xl font-outfit font-black">100%</span>
              <span className="text-sm font-black uppercase tracking-[0.2em]">Natural</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


const StatItem = ({ value, label }) => (
  <div className="space-y-1">
    <p className="text-2xl lg:text-3xl font-outfit font-black text-brand-dark dark:text-white">{value}</p>
    <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest">{label}</p>
  </div>
);

export default Hero;
