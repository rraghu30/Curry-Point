import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, X, LogIn, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { coupons } from '../data/menu';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, subtotal, total, discountAmount, appliedCoupon, applyCoupon } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);

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

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      navigate('/checkout');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-40 pb-24 max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-[#1E2229] p-12 rounded-[3rem] shadow-sm max-w-md mx-auto border border-gray-100 dark:border-[#2D333E]"
        >
          <div className="w-24 h-24 bg-gray-100 dark:bg-[#2D333E] rounded-full flex items-center justify-center mx-auto mb-8">
            <ShoppingBag size={48} className="text-brand-primary/40" />
          </div>
          <h2 className="text-2xl font-outfit font-extrabold text-gray-900 dark:text-white mb-4">Your cart is empty</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-10">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/veg" className="btn-primary inline-flex items-center space-x-2">
            <span>Explore Menu</span>
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-4xl font-outfit font-extrabold text-gray-900 dark:text-white mb-6 sm:mb-12">
          Shopping <span className="text-brand-primary">Cart</span>
        </h1>

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
                  className="bg-white dark:bg-[#1E2229] p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 dark:border-[#2D333E]"
                >
                  {/* Mobile layout: image + info row, then qty + delete row */}
                  <div className="flex items-start gap-3 sm:gap-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl object-cover shrink-0"
                    />
                    <div className="flex-grow min-w-0">
                      <h3 className="font-bold text-sm sm:text-lg text-gray-900 dark:text-white leading-tight">{item.name}</h3>
                      <p className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm mt-0.5 mb-1">
                        {item.category === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
                      </p>
                      <p className="font-extrabold text-brand-primary text-sm sm:text-base">₹{item.price}</p>
                    </div>
                    {/* Delete — top right on mobile */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 sm:p-3 text-brand-error hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors shrink-0"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Quantity controls — below on mobile */}
                  <div className="mt-3 flex items-center justify-between sm:hidden">
                    <div className="flex items-center bg-gray-100 dark:bg-[#2D333E] rounded-xl p-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-white dark:hover:bg-[#3a4150] rounded-lg transition-colors text-gray-700 dark:text-gray-200"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center font-bold text-gray-900 dark:text-white text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-9 h-9 flex items-center justify-center hover:bg-white dark:hover:bg-[#3a4150] rounded-lg transition-colors text-gray-700 dark:text-gray-200"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">₹{item.price * item.quantity}</p>
                  </div>

                  {/* Quantity controls — inline on desktop (hidden on mobile) */}
                  <div className="hidden sm:flex items-center mt-0">
                    {/* Desktop: overlay-style qty shown inside the top row */}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-[#1E2229] p-6 sm:p-8 rounded-[2rem] shadow-sm lg:sticky lg:top-32 border border-gray-100 dark:border-[#2D333E]">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-8">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-500 dark:text-gray-400">
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

                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                  <span>Delivery Fee</span>
                  <span className="text-green-600 font-bold">FREE</span>
                </div>
                
                <div className="pt-4 border-t border-gray-100 dark:border-[#2D333E] flex justify-between">
                  <span className="font-bold text-lg text-gray-900 dark:text-white">Total</span>
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
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-grow min-w-0 px-4 py-3 bg-gray-100 dark:bg-[#2D333E] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 rounded-xl text-sm focus:outline-none border-2 border-transparent focus:border-brand-primary/20"
                    />
                    <button 
                      disabled={!couponInput}
                      onClick={handleApplyCoupon}
                      className="shrink-0 px-6 py-3 bg-brand-dark dark:bg-gray-700 text-white rounded-xl font-bold text-sm hover:bg-black dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
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
                    onClick={() => applyCoupon(null)}
                    className="p-1 hover:bg-green-100 rounded-full text-green-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              <button
                id="proceed-to-checkout-btn"
                onClick={handleProceedToCheckout}
                className="w-full btn-primary py-4 text-lg"
              >
                Proceed to Checkout
              </button>

              {!isAuthenticated && (
                <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-3">
                  🔒 Login required to place an order
                </p>
              )}
              <p className="text-center text-[10px] text-gray-400 dark:text-gray-600 mt-2">
                By proceeding, you agree to our Terms &amp; Conditions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Login Required Modal ── */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowLoginModal(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 18, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#1E2229] rounded-[2rem] p-8 max-w-sm w-full text-center shadow-2xl relative overflow-hidden border border-gray-100 dark:border-[#2D333E]"
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-primary to-brand-secondary" />

              {/* Icon */}
              <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-5">
                <ShoppingBag size={36} className="text-brand-primary" />
              </div>

              <h2 className="text-2xl font-outfit font-extrabold text-gray-900 dark:text-white mb-2">
                Login Required
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
                You need to be logged in to place an order. Sign in or create a free account to continue.
              </p>

              <div className="space-y-3">
                <Link
                  to="/login?redirect=/checkout"
                  className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 text-base"
                  onClick={() => setShowLoginModal(false)}
                >
                  <LogIn size={18} />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/register?redirect=/checkout"
                  className="w-full py-3.5 border-2 border-brand-primary text-brand-primary rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-brand-primary hover:text-white transition-all text-base"
                  onClick={() => setShowLoginModal(false)}
                >
                  <UserPlus size={18} />
                  <span>Create Account</span>
                </Link>
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="w-full py-3 text-gray-400 text-sm font-medium hover:text-gray-600 transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Cart;
