import React, { useState, useEffect } from 'react';
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

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (user && currentTab === 'orders') {
      fetchOrderHistory();
    }
  }, [user, currentTab]);

  const fetchOrderHistory = async () => {
    setLoadingOrders(true);
    try {
      // Using user name to fetch history since dummy auth doesn't have mobile
      const res = await fetch(`http://localhost:5000/api/orders/history/${user.name}`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    } finally {
      setLoadingOrders(false);
    }
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-[#1E2229] rounded-[2.5rem] shadow-sm border border-gray-50 dark:border-[#2D333E] overflow-hidden">
            <div className="p-8 bg-brand-primary/5 dark:bg-brand-primary/10 text-center">
              <div className="w-20 h-20 bg-brand-primary rounded-3xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-lg">
                {user.name.charAt(0)}
              </div>
              <h2 className="text-xl font-bold text-brand-dark dark:text-white">{user.name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
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
              <hr className="my-2 border-gray-50 dark:border-gray-800" />
              <button 
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-6 py-4 text-brand-error hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-all"
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
            className="bg-white dark:bg-[#1E2229] rounded-[3rem] p-8 lg:p-12 shadow-sm border border-gray-50 dark:border-[#2D333E] min-h-[600px]"
          >
            {currentTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-outfit font-extrabold text-brand-dark dark:text-white mb-8">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InfoField label="Full Name" value={user.name} icon={<User size={18} />} />
                  <InfoField label="Email Address" value={user.email} icon={<Mail size={18} />} />
                  <InfoField label="Phone Number" value="Not linked" icon={<Phone size={18} />} />
                  <InfoField label="Primary Address" value="Not set" icon={<MapPin size={18} />} />
                </div>
                
                <div className="mt-12">
                  <button className="btn-secondary px-8">Edit Profile</button>
                </div>
              </div>
            )}

            {currentTab === 'orders' && (
              <div>
                <h2 className="text-2xl font-outfit font-extrabold text-brand-dark dark:text-white mb-8">Your Orders</h2>
                <div className="space-y-4">
                  {loadingOrders ? (
                    <div className="text-center py-20 text-gray-500">Loading your history...</div>
                  ) : orders.length > 0 ? (
                    orders.map((order) => (
                      <div key={order.id} className="p-6 border border-gray-50 dark:border-gray-800 bg-brand-light/20 dark:bg-white/5 rounded-3xl flex items-center justify-between hover:border-brand-primary/20 transition-all group">
                        <div className="flex items-center space-x-6">
                          <div className="w-12 h-12 bg-white dark:bg-[#2D333E] rounded-2xl flex items-center justify-center text-brand-primary border border-gray-100 dark:border-gray-700 shadow-sm">
                            <Package size={20} />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-brand-dark dark:text-white">#{order.id}</span>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                                order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-[300px] truncate">{order.itemsSummary || 'Multiple items'}</p>
                            <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
                              <Clock size={12} />
                              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right flex flex-col items-end gap-2">
                          <p className="font-extrabold text-brand-dark dark:text-white text-lg">₹{order.totalAmount}</p>
                          <Link 
                            to={`/track-order/${order.id}`}
                            className="text-brand-primary text-xs font-bold hover:underline flex items-center gap-1"
                          >
                            Track Order <ChevronRight size={14} />
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-20">
                      <Package size={48} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500">No orders found yet. Time to eat!</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentTab === 'settings' && (
              <div>
                <h2 className="text-2xl font-outfit font-extrabold text-brand-dark dark:text-white mb-8">Account Settings</h2>
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
      : 'text-gray-500 dark:text-gray-400 hover:bg-brand-light dark:hover:bg-white/5 hover:text-brand-primary'
    }`}
  >
    {icon}
    <span className="font-bold text-sm">{label}</span>
  </button>
);

const InfoField = ({ label, value, icon }) => (
  <div className="space-y-2">
    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">{label}</p>
    <div className="flex items-center space-x-3 p-4 bg-brand-light dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-gray-800">
      <div className="text-brand-primary">{icon}</div>
      <span className="font-semibold text-brand-dark dark:text-white">{value}</span>
    </div>
  </div>
);

export default Profile;
