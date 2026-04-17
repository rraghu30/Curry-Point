import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, Search, CheckCircle, HelpCircle, ArrowRight, Zap, Info } from 'lucide-react';
import { coupons } from '../data/menu';

const CouponSystem = () => {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-20">
        <h1 className="text-4xl lg:text-5xl font-outfit font-extrabold text-brand-dark mb-6">
          How Our <span className="text-brand-primary">Coupon System</span> Works
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
          Get the best value on every order. Follow these simple steps and save more with Curry Point.
        </p>
      </div>

      {/* Steps Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
        <StepCard 
          number="01" 
          icon={<Search size={32} className="text-brand-primary" />} 
          title="Find a Coupon" 
          desc="Explore the Offers page or your dashboard to find active coupon codes." 
        />
        <StepCard 
          number="02" 
          icon={<Ticket size={32} className="text-brand-primary" />} 
          title="Add to Cart" 
          desc="Add your favorite dishes to the cart. Make sure to meet the minimum order value." 
        />
        <StepCard 
          number="03" 
          icon={<CheckCircle size={32} className="text-brand-primary" />} 
          title="Apply & Save" 
          desc="Enter the code in the 'Coupon Section' during checkout for instant savings." 
        />
      </div>

      {/* Active Coupons Section */}
      <div className="bg-brand-dark rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden mb-24">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <Zap className="text-brand-secondary fill-brand-secondary" />
            <h2 className="text-3xl font-outfit font-extrabold">Active Coupon Codes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coupons.map((coupon) => (
              <div key={coupon.code} className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 flex items-center justify-between group hover:bg-white/20 transition-all">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-brand-secondary uppercase tracking-tighter">{coupon.discount}% OFF</span>
                    <span className="w-1 h-1 bg-white/30 rounded-full" />
                    <span className="text-xs text-secondary-200">Min. ₹{coupon.minOrder || 0}</span>
                  </div>
                  <h3 className="text-2xl font-outfit font-extrabold tracking-widest">{coupon.code}</h3>
                  <p className="text-xs text-gray-300 mt-2">{coupon.description}</p>
                </div>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(coupon.code);
                    alert('Copied to clipboard!');
                  }}
                  className="px-6 py-2 bg-white text-brand-dark rounded-xl font-bold text-xs hover:bg-brand-secondary transition-colors"
                >
                  COPY
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-outfit font-extrabold text-brand-dark mb-12 text-center">Frequently Asked <span className="text-brand-primary">Questions</span></h2>
        <div className="space-y-6">
          <FaqItem 
            q="Can I use multiple coupons in one order?" 
            a="No, only one coupon code can be applied per order. Choose the one that gives you the best discount!" 
          />
          <FaqItem 
            q="Why is my coupon code not clicking?" 
            a="Make sure you have met the minimum order value and the coupon is not expired. Some coupons are also specific to certain food categories." 
          />
          <FaqItem 
            q="What happens if I cancel an order where a coupon was used?" 
            a="The coupon will be returned to your account and can be used for your next order, provided it is still within its validity period." 
          />
        </div>
      </div>
    </div>
  );
};

const StepCard = ({ number, icon, title, desc }) => (
  <div className="relative group text-center md:text-left">
    <div className="text-6xl font-outfit font-black text-brand-primary/5 absolute -top-10 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 group-hover:text-brand-primary/10 transition-colors">
      {number}
    </div>
    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50 relative z-10 hover-card">
      <div className="mb-6 inline-block p-4 bg-brand-light rounded-2xl">{icon}</div>
      <h3 className="text-xl font-bold text-brand-dark mb-3">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  </div>
);

const FaqItem = ({ q, a }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-50 shadow-sm transition-all hover:border-brand-primary/20">
    <div className="flex gap-4">
      <div className="text-brand-primary mt-1">
        <HelpCircle size={20} />
      </div>
      <div>
        <h4 className="font-bold text-brand-dark mb-2">{q}</h4>
        <p className="text-gray-500 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  </div>
);

export default CouponSystem;
