import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Loader2, ArrowRight } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (!name || !email || !password) {
        throw new Error('Please fill in all fields');
      }
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 flex items-center justify-center px-4 bg-brand-light dark:bg-[#121214]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white dark:bg-[#1E2229] p-10 rounded-[3rem] shadow-sm border border-gray-50 dark:border-[#2D333E]">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-outfit font-extrabold text-brand-dark dark:text-white mb-2">Join Curry Point</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Create an account to start ordering</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-[#2D333E] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 border-2 border-transparent rounded-2xl text-sm focus:outline-none focus:border-brand-primary/50 transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-[#2D333E] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 border-2 border-transparent rounded-2xl text-sm focus:outline-none focus:border-brand-primary/50 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-200 mb-2 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-[#2D333E] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 border-2 border-transparent rounded-2xl text-sm focus:outline-none focus:border-brand-primary/50 transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && <p className="text-brand-error text-xs text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 flex items-center justify-center space-x-2"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  <span>Create Account</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-[#2D333E] text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-brand-primary font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
