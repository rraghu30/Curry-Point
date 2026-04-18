import React, { useState } from 'react';
import { Star, Plus, Leaf, Drumstick, ShoppingCart, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const FoodCard = ({ dish }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(dish);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="bg-white dark:bg-white/5 rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-white/5 flex flex-col group h-full"
    >
      {/* ── Image ── */}
      <div className="relative h-44 sm:h-56 lg:h-64 overflow-hidden bg-gray-100 dark:bg-white/5 shrink-0">
        <img
          src={dish.image}
          alt={dish.name}
          onError={(e) => {
            e.target.src =
              'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800';
          }}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 sm:top-6 sm:left-6 flex flex-col gap-1.5">
          {dish.tags?.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-brand-primary/90 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-[0.1em] rounded-full backdrop-blur-sm shadow-lg"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Veg/Non-Veg indicator */}
        <div className="absolute top-3 right-3 sm:top-6 sm:right-6">
          <div
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg backdrop-blur-md ${
              dish.isVeg ? 'bg-white/90 text-green-600' : 'bg-white/90 text-red-600'
            }`}
          >
            {dish.isVeg ? <Leaf size={16} /> : <Drumstick size={16} />}
          </div>
        </div>

        {/* Desktop hover overlay */}
        <div className="hidden sm:flex absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center">
          <button
            onClick={handleAdd}
            className="w-16 h-16 bg-brand-primary text-white rounded-full flex items-center justify-center shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500 hover:bg-white hover:text-brand-primary"
          >
            <Plus size={32} />
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-4 sm:p-8 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2 sm:mb-4 gap-2">
          <h3 className="text-base sm:text-2xl font-outfit font-extrabold leading-tight group-hover:text-brand-primary transition-colors">
            {dish.name}
          </h3>
          <div className="flex items-center space-x-1 bg-brand-secondary/10 px-2.5 py-1 rounded-xl shrink-0">
            <Star size={13} className="text-brand-secondary fill-brand-secondary" />
            <span className="font-black text-xs text-brand-secondary">{dish.rating}</span>
          </div>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm line-clamp-2 mb-4 sm:mb-8 leading-relaxed">
          {dish.description}
        </p>

        {/* Price + Add to Cart */}
        <div className="mt-auto flex justify-between items-center gap-3">
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">
              Price
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-xl sm:text-3xl font-outfit font-black text-brand-primary">
                ₹{dish.price}
              </span>
              {dish.originalPrice && (
                <span className="text-gray-400 line-through text-xs sm:text-sm font-medium">
                  ₹{dish.originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* Add to Cart — always visible on mobile, also visible on desktop */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={handleAdd}
            aria-label="Add to cart"
            className={`flex-shrink-0 flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl font-bold text-sm transition-all duration-300 shadow-sm
              ${added
                ? 'bg-green-500 text-white'
                : 'bg-brand-light dark:bg-white/10 text-brand-dark dark:text-gray-200 hover:bg-brand-primary hover:text-white'
              }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {added ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-1"
                >
                  <Check size={16} />
                  <span className="hidden sm:inline text-xs">Added</span>
                </motion.span>
              ) : (
                <motion.span
                  key="cart"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-1.5"
                >
                  <ShoppingCart size={18} />
                  <span className="hidden sm:inline text-xs font-semibold">Add</span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
