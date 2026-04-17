import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Package, Settings, LogOut, ChevronRight, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Profile = ({ activeTab = 'profile' }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(activeTab);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const orderHistory = [
    { id: 'ORD-5542', date: '12 Oct 2026', items: 'Paneer Butter Masala x 2', total: 560, status: 'Delivered' },
    { id: 'ORD-5410', date: '05 Oct 2026', items: 'Butter Chicken, Garlic Naan', total: 420, status: 'Delivered' },
    { id: 'ORD-5321', date: '28 Sep 2026', items: 'Gulab Jamun x 4', total: 160, status: 'Delivered' },
  ];

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-50 overflow-hidden">
            <div className="p-8 bg-brand-primary/5 text-center">
              <div className="w-20 h-20 bg-brand-primary rounded-3xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-lg">
                {user.name.charAt(0)}
              </div>
              <h2 className="text-xl font-bold text-brand-dark">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            
            <div className="p-4">
              <SidebarItem 
                icon={<User size={18} />} 
                label="My Profile" 
                active={currentTab === 'profile'} 
                onClick={() => setCurrentTab('profile')}
              />
              <SidebarItem 
                icon={<Package size={18} />} 
                label="Order History" 
                active={currentTab === 'orders'} 
                onClick={() => setCurrentTab('orders')}
              />
              <SidebarItem 
                icon={<Settings size={18} />} 
                label="Account Settings" 
                active={currentTab === 'settings'} 
                onClick={() => setCurrentTab('settings')}
              />
              <hr className="my-2 border-gray-50" />
              <button 
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-6 py-4 text-brand-error hover:bg-red-50 rounded-2xl transition-all"
              >
                <LogOut size={18} />
                <span className="font-bold text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[3rem] p-8 lg:p-12 shadow-sm border border-gray-50 min-h-[600px]"
          >
            {currentTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-outfit font-extrabold text-brand-dark mb-8">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InfoField label="Full Name" value={user.name} icon={<User size={18} />} />
                  <InfoField label="Email Address" value={user.email} icon={<Mail size={18} />} />
                  <InfoField label="Phone Number" value="+91 98765 43210" icon={<Phone size={18} />} />
                  <InfoField label="Primary Address" value="Spice Garden Layout, Whitefield, Bangalore" icon={<MapPin size={18} />} />
                </div>
                
                <div className="mt-12">
                  <button className="btn-secondary px-8">Edit Profile</button>
                </div>
              </div>
            )}

            {currentTab === 'orders' && (
              <div>
                <h2 className="text-2xl font-outfit font-extrabold text-brand-dark mb-8">Your Orders</h2>
                <div className="space-y-4">
                  {orderHistory.map((order) => (
                    <div key={order.id} className="p-6 border border-gray-50 bg-brand-light/20 rounded-3xl flex items-center justify-between hover:border-brand-primary/20 transition-all group">
                      <div className="flex items-center space-x-6">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-primary border border-gray-100 shadow-sm">
                          <Package size={20} />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-brand-dark">{order.id}</span>
                            <span className="text-[10px] bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">{order.status}</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{order.items}</p>
                          <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
                            <Clock size={12} />
                            <span>{order.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-extrabold text-brand-dark text-lg">₹{order.total}</p>
                        <button className="text-brand-primary text-xs font-bold hover:underline group-hover:underline">Re-order</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentTab === 'settings' && (
              <div>
                <h2 className="text-2xl font-outfit font-extrabold text-brand-dark mb-8">Account Settings</h2>
                <p className="text-gray-500">Settings implementation would go here...</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all ${
      active 
      ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' 
      : 'text-gray-500 hover:bg-brand-light hover:text-brand-primary'
    }`}
  >
    {icon}
    <span className="font-bold text-sm">{label}</span>
  </button>
);

const InfoField = ({ label, value, icon }) => (
  <div className="space-y-2">
    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{label}</p>
    <div className="flex items-center space-x-3 p-4 bg-brand-light rounded-2xl border border-gray-100">
      <div className="text-brand-primary">{icon}</div>
      <span className="font-semibold text-brand-dark">{value}</span>
    </div>
  </div>
);

export default Profile;
