import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { coupons } from '../data/menu';
import OrderSuccess from '../components/OrderSuccess';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, subtotal, total, discountAmount, appliedCoupon, applyCoupon } = useCart();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleApplyCoupon = () => {
    const coupon = coupons.find(c => c.code.toUpperCase() === couponInput.toUpperCase());
    if (coupon) {
      if (subtotal >= (coupon.minOrder || 0)) {
        applyCoupon(coupon);
        setCouponInput('');
        setCouponError('');
      } else {
        setCouponError(`Minimum order of ₹${coupon.minOrder} required for this coupon.`);
      }
    } else {
      setCouponError('Invalid coupon code.');
    }
  };

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
    // Simulate API call
    setTimeout(() => {
      setIsPlacingOrder(false);
      setShowSuccess(true);
      clearCart();
    }, 2000);
  };

  if (showSuccess) {
    return <OrderSuccess />;
  }

  if (cartItems.length === 0) {
    return (
      <div className="pt-40 pb-24 max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[3rem] shadow-sm max-w-md mx-auto"
        >
          <div className="w-24 h-24 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-8">
            <ShoppingBag size={48} className="text-brand-primary/40" />
          </div>
          <h2 className="text-2xl font-outfit font-extrabold text-brand-dark mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-10">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/veg" className="btn-primary inline-flex items-center space-x-2">
            <span>Explore Menu</span>
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-outfit font-extrabold text-brand-dark mb-12">Shopping <span className="text-brand-primary">Cart</span></h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white p-6 rounded-3xl flex items-center gap-6 shadow-sm border border-gray-50"
              >
                <img src={item.image} alt={item.name} className="w-24 h-24 rounded-2xl object-cover" />
                
                <div className="flex-grow">
                  <h3 className="font-bold text-lg text-brand-dark">{item.name}</h3>
                  <p className="text-gray-400 text-sm mb-2">{item.category === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}</p>
                  <p className="font-extrabold text-brand-primary">₹{item.price}</p>
                </div>

                <div className="flex items-center bg-brand-light rounded-xl p-1">
                  <button 
                    disabled={isPlacingOrder}
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center font-bold">{item.quantity}</span>
                  <button 
                    disabled={isPlacingOrder}
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button 
                  disabled={isPlacingOrder}
                  onClick={() => removeFromCart(item.id)}
                  className="p-3 text-brand-error hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50"
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm sticky top-32 border border-gray-50">
            <h2 className="text-xl font-bold text-brand-dark mb-8">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              
              {appliedCoupon && (
                <div className="flex justify-between text-green-600 font-medium">
                  <div className="flex items-center gap-2">
                    <Tag size={16} />
                    <span>Coupon ({appliedCoupon.code})</span>
                  </div>
                  <span>-₹{discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-500">
                <span>Delivery Fee</span>
                <span className="text-green-600 font-bold">FREE</span>
              </div>
              
              <div className="pt-4 border-t border-gray-100 flex justify-between">
                <span className="font-bold text-lg">Total</span>
                <span className="font-extrabold text-2xl text-brand-primary">₹{total}</span>
              </div>
            </div>

            {/* Coupon Application */}
            {!appliedCoupon ? (
              <div className="mb-8">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Apply Coupon Code"
                    disabled={isPlacingOrder}
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-grow px-4 py-3 bg-brand-light rounded-xl text-sm focus:outline-none border-2 border-transparent focus:border-brand-primary/20"
                  />
                  <button 
                    disabled={isPlacingOrder || !couponInput}
                    onClick={handleApplyCoupon}
                    className="px-6 py-3 bg-brand-dark text-white rounded-xl font-bold text-sm hover:bg-black transition-colors disabled:opacity-50"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-brand-error text-xs mt-2 ml-2">{couponError}</p>}
              </div>
            ) : (
              <div className="mb-8 bg-green-50 p-4 rounded-xl border border-green-100 flex justify-between items-center">
                <div>
                  <p className="text-xs text-green-600 font-bold uppercase tracking-wider">Applied</p>
                  <p className="font-bold text-green-800">{appliedCoupon.code}</p>
                </div>
                <button 
                  disabled={isPlacingOrder}
                  onClick={() => applyCoupon(null)}
                  className="p-1 hover:bg-green-100 rounded-full text-green-700 disabled:opacity-50"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            <button 
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder}
              className="w-full btn-primary py-4 text-lg relative overflow-hidden"
            >
              {isPlacingOrder ? (
                <span className="flex items-center justify-center space-x-2">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  <span>Placing Order...</span>
                </span>
              ) : (
                "Proceed to Checkout"
              )}
            </button>
            <p className="text-center text-[10px] text-gray-400 mt-4">
              By proceeding, you agree to our Terms & Conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
