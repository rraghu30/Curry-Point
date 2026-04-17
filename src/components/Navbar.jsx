import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, LogOut, ChevronDown, Sun, Moon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { cartItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Veg Menu', path: '/veg' },
    { name: 'Non-Veg', path: '/non-veg' },
    { name: 'Sweets', path: '/sweets' },
    { name: 'Offers', path: '/offers' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed w-full z-50 backdrop-blur-2xl bg-white/80 dark:bg-[#121214]/90 border-b border-gray-200/50 dark:border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: -20, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              whileHover={{ rotate: 10 }}
              className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg"
            >
              C
            </motion.div>
            <span className="text-2xl font-outfit font-extrabold tracking-tight text-brand-dark dark:text-white">
              Curry<span className="text-brand-primary">Point</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-600 dark:text-gray-300 hover:text-brand-primary font-semibold transition-all hover:scale-105"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-4 bg-gray-100/80 dark:bg-white/5 p-1 rounded-full border border-gray-200/50 dark:border-white/5">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full transition-all duration-300 hover:bg-white dark:hover:bg-white/10 shadow-sm"
                aria-label="Toggle Theme"
              >
                {theme === 'light' ? (
                  <Moon size={18} className="text-gray-600" />
                ) : (
                  <Sun size={18} className="text-brand-secondary" />
                )}
              </button>
              <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-brand-primary transition-colors">
                <Search size={20} />
              </button>
            </div>

            <Link to="/cart" className="relative text-gray-600 dark:text-gray-300 hover:text-brand-primary transition-colors">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-brand-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-brand-dark shadow-lg shadow-brand-primary/20"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 bg-gray-100 dark:bg-white/5 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-all border border-transparent hover:border-brand-primary/20"
                >
                  <div className="w-8 h-8 bg-brand-primary/20 rounded-full flex items-center justify-center text-brand-primary">
                    <User size={18} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{user.name.split(' ')[0]}</span>
                  <ChevronDown size={14} className="text-gray-500" />
                </button>

                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-52 bg-white dark:bg-[#1A1A1D] rounded-2xl shadow-2xl py-2 border border-blue-50/50 dark:border-white/10 backdrop-blur-xl"
                    >
                      <Link to="/profile" className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-brand-primary/5 dark:hover:bg-brand-primary/10 hover:text-brand-primary">Profile Settings</Link>
                      <Link to="/orders" className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-brand-primary/5 dark:hover:bg-brand-primary/10 hover:text-brand-primary">Order History</Link>
                      <hr className="my-1 border-gray-100 dark:border-white/10" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 text-sm text-brand-error flex items-center space-x-2 hover:bg-red-50 dark:hover:bg-red-900/10"
                      >
                        <LogOut size={14} />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="btn-primary flex items-center space-x-2 py-2.5 shadow-brand-primary/20">
                <User size={18} />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-white/5 rounded-full"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <Link to="/cart" className="relative text-gray-600 dark:text-gray-300">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-700 dark:text-white">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-brand-dark border-t border-gray-100 dark:border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-base font-medium rounded-xl hover:bg-brand-light dark:hover:bg-white/5"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 px-4">
                {isAuthenticated ? (
                  <button onClick={handleLogout} className="w-full btn-secondary">Logout</button>
                ) : (
                  <Link to="/login" onClick={() => setIsOpen(false)} className="block w-full text-center btn-primary">Login / Register</Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
