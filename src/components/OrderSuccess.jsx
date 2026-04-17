import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const OrderSuccess = ({ orderId }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/20 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-[2.5rem] p-8 md:p-12 max-w-md w-full text-center shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-brand-primary" />
        
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle size={48} className="text-green-600" />
        </motion.div>

        <h2 className="text-3xl font-outfit font-extrabold text-brand-dark mb-4">
          Order Placed <span className="text-brand-primary">Successfully!</span>
        </h2>
        
        <p className="text-gray-500 mb-8">
          Thank you for ordering from Curry Point! Your delicious meal is being prepared and will be with you shortly.
        </p>

        <div className="bg-brand-light rounded-2xl p-4 mb-8 flex justify-between items-center text-sm">
          <span className="text-gray-500">Order ID:</span>
          <span className="font-bold text-brand-dark">#{orderId || 'CP' + Math.floor(Math.random() * 90000 + 10000)}</span>
        </div>

        <div className="space-y-4">
          <Link 
            to="/profile" 
            className="w-full btn-primary py-4 flex items-center justify-center space-x-2 group"
          >
            <span>Track My Order</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            to="/" 
            className="w-full py-4 text-gray-500 font-semibold hover:text-brand-dark transition-colors flex items-center justify-center space-x-2"
          >
            <ShoppingBag size={18} />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
