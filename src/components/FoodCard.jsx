import React from 'react';
import { Star, Plus, Leaf, Drumstick, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const FoodCard = ({ dish }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      whileHover={{ y: -12 }}
      className="bg-white dark:bg-white/5 rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-white/5 flex flex-col group h-full"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-white/5">
        <img 
          src={dish.image} 
          alt={dish.name} 
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800"; // Fallback generic food image
          }}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
        />
        
        {/* Badges */}
        <div className="absolute top-6 left-6 flex flex-col gap-2">
          {dish.tags?.map((tag) => (
            <span key={tag} className="px-4 py-1.5 bg-brand-primary/90 text-white text-[10px] font-black uppercase tracking-[0.1em] rounded-full backdrop-blur-sm shadow-lg">
              {tag}
            </span>
          ))}
        </div>

        {/* Veg/Non-Veg Indicator */}
        <div className="absolute top-6 right-6">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-md ${dish.isVeg ? 'bg-white/90 text-green-600' : 'bg-white/90 text-red-600'}`}>
            {dish.isVeg ? <Leaf size={20} /> : <Drumstick size={20} />}
          </div>
        </div>

        {/* Action Overlay */}
        <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
           <button 
            onClick={() => addToCart(dish)}
            className="w-16 h-16 bg-brand-primary text-white rounded-full flex items-center justify-center shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500 hover:bg-white hover:text-brand-primary"
           >
             <Plus size={32} />
           </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-outfit font-extrabold leading-tight group-hover:text-brand-primary transition-colors">
            {dish.name}
          </h3>
          <div className="flex items-center space-x-1.5 bg-brand-secondary/10 px-3 py-1 rounded-xl">
            <Star size={16} className="text-brand-secondary fill-brand-secondary" />
            <span className="font-black text-sm text-brand-secondary">{dish.rating}</span>
          </div>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-8 leading-relaxed">
          {dish.description}
        </p>

        <div className="mt-auto flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Starting from</span>
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-outfit font-black text-brand-primary">₹{dish.price}</span>
              {dish.originalPrice && (
                <span className="text-gray-400 line-through text-sm font-medium">₹{dish.originalPrice}</span>
              )}
            </div>
          </div>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => addToCart(dish)}
            className="hidden sm:flex w-14 h-14 bg-brand-light dark:bg-white/10 rounded-[1.5rem] items-center justify-center text-brand-dark dark:text-gray-300 hover:bg-brand-primary hover:text-white transition-all shadow-sm"
          >
            <ShoppingCart size={24} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
