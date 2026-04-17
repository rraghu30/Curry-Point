import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-dark dark:bg-black text-white pt-24 pb-12 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Section */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">C</div>
              <span className="text-2xl font-outfit font-extrabold tracking-tight">
                Curry<span className="text-brand-primary">Point</span>
              </span>
            </Link>
            <p className="text-gray-400 text-lg leading-relaxed max-w-xs">
              Crafting premium culinary experiences where traditional spices meet modern gourmet standards.
            </p>
            <div className="flex space-x-5">
              <SocialIcon icon={<Facebook size={20} />} href="https://facebook.com" />
              <SocialIcon icon={<Twitter size={20} />} href="https://twitter.com" />
              <SocialIcon icon={<Instagram size={20} />} href="https://instagram.com" />
              <SocialIcon icon={<Youtube size={20} />} href="https://youtube.com" />
            </div>
          </div>

          {/* Quick Explore */}
          <div>
            <h4 className="text-xl font-bold mb-8 text-white/90">Explore Cuisine</h4>
            <ul className="space-y-5 text-gray-400">
              <li><Link to="/veg" className="hover:text-brand-primary hover:translate-x-2 transition-all block">Vegetarian Delight</Link></li>
              <li><Link to="/non-veg" className="hover:text-brand-primary hover:translate-x-2 transition-all block">Non-Veg Specialty</Link></li>
              <li><Link to="/sweets" className="hover:text-brand-primary hover:translate-x-2 transition-all block">Artisanal Sweets</Link></li>
              <li><Link to="/offers" className="hover:text-brand-primary hover:translate-x-2 transition-all block">Exclusive Deals</Link></li>
              <li><Link to="/coupons" className="hover:text-brand-primary hover:translate-x-2 transition-all block">Privilege Coupons</Link></li>
            </ul>
          </div>

          {/* Concierge Contact */}
          <div>
            <h4 className="text-xl font-bold mb-8 text-white/90">Concierge</h4>
            <ul className="space-y-6 text-gray-400">
              <li className="flex items-start space-x-4">
                <div className="mt-1 p-2 bg-white/5 rounded-lg text-brand-primary">
                  <MapPin size={20} />
                </div>
                <span>123 Spice Garden, <br />South Wing, Bangalore</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="p-2 bg-white/5 rounded-lg text-brand-primary">
                  <Phone size={20} />
                </div>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="p-2 bg-white/5 rounded-lg text-brand-primary">
                  <Mail size={20} />
                </div>
                <span>concierge@currypoint.com</span>
              </li>
            </ul>
          </div>

          {/* Privilege Club */}
          <div>
            <h4 className="text-xl font-bold mb-8 text-white/90">Privilege Club</h4>
            <p className="text-gray-400 mb-6 font-medium">Join our inner circle for secret recipes and early-access offers.</p>
            <form className="space-y-4">
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="name@exclusive.com" 
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-brand-primary/50 transition-all text-sm group-hover:bg-white/10"
                />
              </div>
              <button className="w-full btn-primary py-4 text-sm font-bold shadow-2xl hover:-translate-y-1 transition-all">Submit Invitation</button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© 2026 Curry Point Global. Designed with Passion.</p>
          <div className="flex space-x-8 mt-6 md:mt-0 font-medium">
            <a href="#" className="hover:text-brand-primary transition-colors uppercase tracking-widest text-[10px]">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors uppercase tracking-widest text-[10px]">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors uppercase tracking-widest text-[10px]">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon, href }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-brand-primary hover:text-white transition-all duration-300 transform hover:-translate-y-2 border border-white/5 shadow-lg"
  >
    {icon}
  </a>
);

export default Footer;
