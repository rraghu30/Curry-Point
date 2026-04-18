import React, { useState, useMemo } from 'react';
import { useMenu } from '../hooks/useMenu';
import FoodCard from '../components/FoodCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, ChevronDown } from 'lucide-react';

const MenuPage = ({ category, title }) => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const { dishes, loading } = useMenu();

  const filteredDishes = useMemo(() => {
    let result = dishes.filter(dish => dish.category === category);
    if (search) {
      result = result.filter(dish =>
        dish.name.toLowerCase().includes(search.toLowerCase()) ||
        dish.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [dishes, category, search, sortBy]);

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Page Header */}
      <div className="mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-outfit font-extrabold text-gray-900 dark:text-white mb-2 sm:mb-4">
          {title}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
          Delicious {category} options crafted for you.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500 font-bold">Loading Menu...</div>
      ) : (
        <>
          {/* Search + Sort bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">

            {/* Search */}
            <div className="relative flex-grow">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                size={18}
              />
              <input
                type="text"
                placeholder="Search for dishes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 sm:py-4
                  bg-white dark:bg-[#1E2229]
                  text-gray-900 dark:text-white
                  placeholder:text-gray-400 dark:placeholder:text-gray-500
                  border border-gray-200 dark:border-[#2D333E]
                  rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
              />
            </div>

            {/* Sort + Filter */}
            <div className="flex gap-3">
              <div className="relative flex-grow sm:flex-grow-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none
                    bg-white dark:bg-[#1E2229]
                    text-gray-700 dark:text-gray-200
                    border border-gray-200 dark:border-[#2D333E]
                    rounded-2xl px-4 sm:px-6 py-3 sm:py-4 pr-10 shadow-sm
                    font-semibold focus:outline-none text-sm"
                >
                  <option value="popular">Popularity</option>
                  <option value="rating">Top Rated</option>
                  <option value="price-low">Price: Low → High</option>
                  <option value="price-high">Price: High → Low</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={16}
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-3 sm:p-4 rounded-2xl border transition-all shrink-0 ${
                  showFilters
                    ? 'bg-brand-primary text-white border-brand-primary'
                    : 'bg-white dark:bg-[#1E2229] text-brand-dark dark:text-gray-200 border-gray-200 dark:border-[#2D333E] hover:border-brand-primary'
                }`}
              >
                <Filter size={18} />
              </button>
            </div>
          </div>

          {/* Filter Drawer */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 overflow-hidden
                  bg-white dark:bg-[#1E2229]
                  rounded-2xl p-5 border border-gray-100 dark:border-[#2D333E]"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <h4 className="font-bold mb-3 text-sm text-gray-800 dark:text-gray-200">
                      Price Range
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1.5 bg-gray-100 dark:bg-[#2D333E] text-gray-600 dark:text-gray-300 rounded-xl text-xs cursor-pointer hover:bg-brand-primary/10">
                        Under ₹200
                      </span>
                      <span className="px-3 py-1.5 bg-gray-100 dark:bg-[#2D333E] text-gray-600 dark:text-gray-300 rounded-xl text-xs cursor-pointer hover:bg-brand-primary/10">
                        ₹200–₹500
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result count */}
          {filteredDishes.length > 0 && (
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
              Showing <span className="font-bold text-gray-700 dark:text-gray-300">{filteredDishes.length}</span> dishes
            </p>
          )}

          {/* Grid */}
          {filteredDishes.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8"
            >
              {filteredDishes.map((dish) => (
                <FoodCard key={dish.id} dish={dish} />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <div className="mb-6 inline-block p-6 bg-gray-100 dark:bg-[#1E2229] rounded-full">
                <Search size={40} className="text-gray-300 dark:text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                No dishes found
              </h3>
              <p className="text-gray-400 text-sm">
                Try adjusting your filters or search keywords.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MenuPage;
