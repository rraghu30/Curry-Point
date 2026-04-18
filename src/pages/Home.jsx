import React from 'react';
import Hero from '../components/Hero';
import FoodCard from '../components/FoodCard';
import { useMenu } from '../hooks/useMenu';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const { dishes, loading } = useMenu();
  const featuredDishes = dishes.slice(0, 4);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading menu...</div>;

  return (
    <div className="space-y-24 pb-24">
      <Hero />

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl lg:text-5xl font-outfit font-extrabold mb-4">
              Explore Our <span className="text-brand-primary">Categories</span>
            </h2>
            <p className="text-gray-500 text-lg">Indulge in our carefully curated selection of delicacies.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <CategoryCard 
            title="Veg Menu" 
            path="/veg" 
            img="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800" 
            color="from-green-500/80 to-green-700/80"
          />
          <CategoryCard 
            title="Non-Veg" 
            path="/non-veg" 
            img="https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=800" 
            color="from-red-500/80 to-red-700/80"
          />
          <CategoryCard 
            title="Sweets" 
            path="/sweets" 
            img="https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&q=80&w=800" 
            color="from-pink-500/80 to-pink-700/80"
          />
          <CategoryCard 
            title="Special Offers" 
            path="/offers" 
            img="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800" 
            color="from-orange-500/80 to-orange-700/80"
          />
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl lg:text-5xl font-outfit font-extrabold mb-4">
              Featured <span className="text-brand-primary">Dishes</span>
            </h2>
            <p className="text-gray-500 text-lg">Hand-picked favorites by our award-winning chefs.</p>
          </div>
          <Link to="/veg" className="hidden md:flex items-center space-x-2 text-brand-primary font-bold hover:translate-x-2 transition-transform">
            <span>View Full Menu</span>
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {featuredDishes.map((dish) => (
            <FoodCard key={dish.id} dish={dish} />
          ))}
        </div>
      </section>

      {/* Modern Features Banner */}
      <section className="bg-brand-dark dark:bg-black py-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-secondary/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10 text-white">
          <FeatureItem 
            icon={<Clock size={40} className="text-brand-primary" />}
            title="Lightning Fast"
            desc="Fresh meals at your doorstep in under 30 minutes, guaranteed."
          />
          <FeatureItem 
            icon={<ShieldCheck size={40} className="text-brand-primary" />}
            title="Purest Quality"
            desc="Sourced from organic farms with 100% strict hygiene protocols."
          />
          <FeatureItem 
            icon={<MapPin size={40} className="text-brand-primary" />}
            title="Trace Your Order"
            desc="Watch your meal's journey from our pans to your plate in real-time."
          />
        </div>
      </section>

      {/* Premium Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl lg:text-5xl font-outfit font-extrabold mb-4">
            Voice of Our <span className="text-brand-primary">Connoisseurs</span>
          </h2>
          <div className="flex justify-center space-x-1 mt-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={24} className="text-brand-secondary fill-brand-secondary" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <TestimonialCard 
            name="Anjali Verma"
            role="Gourmet Critic"
            text="The Paneer Butter Masala was a masterpiece of textures and spices. Simply unparalleled."
            avatar="https://i.pravatar.cc/150?u=anjali"
          />
          <TestimonialCard 
            name="Rahul Nair"
            role="Local Guide"
            text="Curry Point has redefined Indian takeaway. The Biryani is consistently legendary."
            avatar="https://i.pravatar.cc/150?u=rahul"
          />
          <TestimonialCard 
            name="Suresh Gupta"
            role="Hospitality Specialist"
            text="From packaging to palate, everything exudes premium quality. A rare local gem."
            avatar="https://i.pravatar.cc/150?u=suresh"
          />
        </div>
      </section>
    </div>
  );
};

const CategoryCard = ({ title, path, img, color }) => (
  <Link to={path} className="group overflow-hidden rounded-[2.5rem] relative h-64 block shadow-lg hover:shadow-2xl transition-all duration-500">
    <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
    <div className={`absolute inset-0 bg-gradient-to-t ${color} opacity-30 group-hover:opacity-60 transition-opacity duration-300`} />
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
      <h3 className="text-white font-outfit font-extrabold text-2xl lg:text-3xl drop-shadow-xl group-hover:scale-110 transition-transform">{title}</h3>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="mt-4 text-white/90 text-sm font-semibold flex items-center space-x-2"
      >
        <span>Explore Menu</span>
        <ArrowRight size={16} />
      </motion.div>
    </div>
  </Link>
);

const FeatureItem = ({ icon, title, desc }) => (
  <div className="text-center md:text-left space-y-6 group">
    <div className="w-20 h-20 bg-white/5 dark:bg-white/10 rounded-[2rem] flex items-center justify-center mx-auto md:mx-0 group-hover:bg-brand-primary/20 transition-colors border border-white/5">
      {icon}
    </div>
    <div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 text-lg leading-relaxed">{desc}</p>
    </div>
  </div>
);

const TestimonialCard = ({ name, role, text, avatar }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white dark:bg-white/5 p-10 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all"
  >
    <div className="text-brand-primary text-5xl font-serif mb-6 opacity-30">“</div>
    <p className="text-gray-600 dark:text-gray-300 mb-10 text-lg italic leading-relaxed">"{text}"</p>
    <div className="flex items-center space-x-5">
      <img src={avatar} alt={name} className="w-14 h-14 rounded-2xl object-cover ring-4 ring-brand-primary/10" />
      <div>
        <h4 className="font-bold text-xl">{name}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{role}</p>
      </div>
    </div>
  </motion.div>
);

export default Home;
