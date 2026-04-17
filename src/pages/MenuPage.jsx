import React, { useState, useMemo } from 'react';
import { dishes } from '../data/menu';
import FoodCard from '../components/FoodCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, ChevronDown, ListFilter } from 'lucide-react';

const MenuPage = ({ category, title }) => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  // Filter and Sort logic
  const filteredDishes = useMemo(() => {
    let result = dishes.filter(dish => dish.category === category);

    if (search) {
      result = result.filter(dish => 
        dish.name.toLowerCase().includes(search.toLowerCase()) ||
        dish.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [category, search, sortBy]);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-outfit font-extrabold text-brand-dark mb-4">{title}</h1>
        <p className="text-gray-500">Delicious {category} options crafted for you.</p>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col lg:flex-row gap-6 mb-12">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search for dishes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
          />
        </div>

        <div className="flex gap-4">
          <div className="relative inline-block text-left flex-grow lg:flex-grow-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-100 rounded-2xl px-6 py-4 pr-12 shadow-sm font-semibold text-gray-700 focus:outline-none min-w-[180px]"
            >
              <option value="popular">Popularity</option>
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
          </div>

          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`p-4 rounded-2xl border transition-all ${showFilters ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white text-brand-dark border-gray-100 hover:border-brand-primary'}`}
          >
            <Filter size={20} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden bg-white rounded-2xl p-6 border border-gray-100"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <h4 className="font-bold mb-3 text-sm">Price Range</h4>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-brand-light rounded-lg text-xs cursor-pointer hover:bg-brand-primary/10">Under ₹200</span>
                  <span className="px-3 py-1 bg-brand-light rounded-lg text-xs cursor-pointer hover:bg-brand-primary/10">₹200 - ₹500</span>
                </div>
              </div>
              {/* Add more filter options here if needed */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      {filteredDishes.length > 0 ? (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredDishes.map((dish) => (
            <FoodCard key={dish.id} dish={dish} />
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-24">
          <div className="mb-6 inline-block p-6 bg-gray-50 rounded-full">
            <Search size={48} className="text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">No dishes found</h3>
          <p className="text-gray-500">Try adjusting your filters or search keywords.</p>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
