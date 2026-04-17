import React from 'react';
import { motion } from 'framer-motion';
import { Tag, Clock, Gift, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { dishes, coupons } from '../data/menu';
import FoodCard from '../components/FoodCard';

const Offers = () => {
  const offerDishes = dishes.filter(d => d.originalPrice);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-full text-sm font-bold mb-6"
        >
          <Zap size={16} fill="currentColor" />
          <span>LIMITED TIME OFFERS</span>
        </motion.div>
        <h1 className="text-4xl lg:text-5xl font-outfit font-extrabold text-brand-dark mb-6">
          Today's Special <span className="text-brand-primary">Deals</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Save big on your favorite dishes with our exclusive daily offers. Grab them before they're gone!
        </p>
      </div>

      {/* Coupon Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {coupons.map((coupon, idx) => (
          <motion.div
            key={coupon.code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] border-2 border-dashed border-brand-primary/20 relative overflow-hidden group hover:border-brand-primary transition-colors"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-primary/5 rounded-full blur-2xl group-hover:bg-brand-primary/10 transition-colors" />
            
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-brand-primary/10 rounded-2xl text-brand-primary">
                <Gift size={24} />
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-gray-400">
                <Clock size={12} />
                <span>Expiring soon</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-brand-dark mb-2">{coupon.discount}% OFF</h3>
            <p className="text-gray-500 text-sm mb-6">{coupon.description}</p>
            
            <div className="flex items-center justify-between bg-brand-light p-4 rounded-2xl mt-4 border border-gray-100">
              <span className="font-outfit font-extrabold tracking-widest text-brand-dark">{coupon.code}</span>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(coupon.code);
                  alert('Coupon code copied!');
                }}
                className="text-xs font-bold text-brand-primary hover:underline"
              >
                COPY CODE
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Discounted Dishes */}
      <div className="mb-12">
        <h2 className="text-2xl font-outfit font-extrabold text-brand-dark mb-8 flex items-center gap-3">
          <Tag className="text-brand-primary" />
          <span>Discounted Items</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {offerDishes.map((dish) => (
            <FoodCard key={dish.id} dish={dish} />
          ))}
        </div>
      </div>

      {/* Combo Banner */}
      <div className="mt-20 relative rounded-[3rem] overflow-hidden bg-brand-dark text-white p-12 lg:p-20">
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <img 
            src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800"
            alt="Combo"
            className="w-full h-full object-cover opacity-80 mask-gradient-left transition-opacity duration-700"
          />
        </div>
        <div className="relative z-10 max-w-xl">
          <span className="text-brand-primary font-bold text-sm tracking-widest uppercase mb-4 block">Weekend Combo</span>
          <h2 className="text-4xl lg:text-5xl font-outfit font-extrabold mb-6 leading-tight">
            Family Feast <br />Pack at <span className="text-brand-primary">₹999</span>
          </h2>
          <p className="text-gray-400 mb-10 text-lg leading-relaxed">
            Includes 2 Biryanis, 1 Paneer/Chicken Starter, 2 Desserts, and Drinks. Perfect for a family of 4.
          </p>
          <Link to="/veg" className="btn-primary inline-flex items-center gap-3 px-10 py-4">
            <span>Order Combo Now</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Offers;
