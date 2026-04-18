import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Package, CheckCircle2, Clock, Truck, 
  MapPin, Phone, ChevronRight, ShoppingBag, 
  ArrowLeft, AlertCircle
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const OrderTracking = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        // 1. Check localStorage first
        const localOrders = JSON.parse(localStorage.getItem('cp_orders') || '[]');
        const localOrder = localOrders.find(o => String(o.id) === String(id));

        if (localOrder) {
          // Simulate status progression based on time elapsed
          const elapsed = Date.now() - new Date(localOrder.createdAt).getTime();
          const minutes = elapsed / (1000 * 60);
          
          let simulatedStatus = 'Pending';
          if (minutes > 15) simulatedStatus = 'Delivered';
          else if (minutes > 10) simulatedStatus = 'Out for Delivery';
          else if (minutes > 5) simulatedStatus = 'Preparing';

          setOrder({ ...localOrder, status: simulatedStatus });
          setLoading(false);
          return;
        }

        // 2. Fallback to API
        const res = await fetch(`${API_URL}/orders/${id}`);
        if (!res.ok) throw new Error('Order not found');
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderStatus();
    const interval = setInterval(fetchOrderStatus, 5000); // Poll more frequently for local simulation
    return () => clearInterval(interval);
  }, [id]);

  if (loading) return (
    <div className="min-h-screen pt-32 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (error || !order) return (
    <div className="min-h-screen pt-32 flex flex-col items-center justify-center px-4 text-center bg-white dark:bg-[#121214]">
      <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-500 mb-6">
        <AlertCircle size={40} />
      </div>
      <h2 className="text-2xl font-outfit font-extrabold text-brand-dark dark:text-white mb-4">Order Not Found</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
        We couldn't find an order with ID <span className="font-bold text-brand-primary">#{id}</span>. 
        It might still be processing. Please check your order history or wait a few seconds.
      </p>
      <Link to="/profile" className="btn-primary px-8 flex items-center gap-2">
        <ArrowLeft size={18} />
        Back to Profile
      </Link>
    </div>
  );

  const steps = [
    { status: 'Pending', icon: <Clock size={20} />, label: 'Order Received', desc: 'We have received your order' },
    { status: 'Preparing', icon: <Package size={20} />, label: 'Preparing', desc: 'Our chef is preparing your meal' },
    { status: 'Out for Delivery', icon: <Truck size={20} />, label: 'On the Way', desc: 'Your food is out for delivery' },
    { status: 'Delivered', icon: <CheckCircle2 size={20} />, label: 'Delivered', desc: 'Enjoy your delicious meal!' }
  ];

  const getCurrentStepIndex = () => {
    const statusMap = {
      'Pending': 0,
      'Preparing': 1,
      'Out for Delivery': 2,
      'Delivered': 3,
      'Cancelled': -1
    };
    return statusMap[order.status] ?? 0;
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="pt-32 pb-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <Link to="/profile" className="text-brand-primary font-bold flex items-center gap-2 mb-4 hover:underline">
            <ArrowLeft size={16} /> Back to My Orders
          </Link>
          <h1 className="text-3xl font-outfit font-extrabold text-brand-dark">Track Order <span className="text-brand-primary">#{order.id}</span></h1>
          <p className="text-gray-500 mt-2">Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
        </div>
        {order.status === 'Cancelled' && (
          <span className="px-4 py-2 bg-red-100 text-red-600 rounded-full font-bold text-sm uppercase">Cancelled</span>
        )}
      </div>

      {/* Progress Tracker */}
      {order.status !== 'Cancelled' && (
        <div className="bg-white dark:bg-[#1E2229] rounded-[3rem] p-8 md:p-12 shadow-sm border border-gray-100 dark:border-[#2D333E] mb-10">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-[23px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 md:top-[23px] md:bottom-auto md:w-full md:h-1 bg-gray-100 dark:bg-gray-800 -z-0">
              <motion.div 
                initial={{ height: 0, width: 0 }}
                animate={{ 
                  height: window.innerWidth < 768 ? `${(currentStepIndex / 3) * 100}%` : '100%',
                  width: window.innerWidth >= 768 ? `${(currentStepIndex / 3) * 100}%` : '4px'
                }}
                className="bg-brand-primary absolute left-0 top-0 transition-all duration-1000"
              />
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative z-10">
              {steps.map((step, idx) => {
                const isCompleted = idx <= currentStepIndex;
                const isActive = idx === currentStepIndex;
                
                return (
                  <div key={step.status} className="flex md:flex-col items-center gap-4 md:gap-3 text-center flex-1">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg ${
                      isCompleted 
                      ? 'bg-brand-primary text-white scale-110' 
                      : 'bg-white dark:bg-[#2D333E] text-gray-400 border border-gray-100 dark:border-gray-700'
                    } ${isActive ? 'ring-4 ring-orange-100 dark:ring-orange-900/30' : ''}`}>
                      {step.icon}
                    </div>
                    <div className="text-left md:text-center">
                      <p className={`font-bold text-sm ${isCompleted ? 'text-brand-dark dark:text-white' : 'text-gray-400'}`}>{step.label}</p>
                      <p className="text-[10px] text-gray-400 max-w-[120px] hidden md:block">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Order Details Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#1E2229] rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-[#2D333E]">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <MapPin size={18} className="text-brand-primary" /> Delivery Address
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">{order.address}</p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Phone size={14} /> <span>{order.mobileNumber}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E2229] rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-[#2D333E]">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <Package size={18} className="text-brand-primary" /> Order Summary
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Status</span>
              <span className="font-bold text-brand-primary">{order.status}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Payment Method</span>
              <span className="font-bold uppercase">{order.paymentMethod}</span>
            </div>
            <div className="pt-3 border-t border-gray-50 dark:border-gray-800 flex justify-between">
              <span className="font-bold">Total Paid</span>
              <span className="font-extrabold text-xl text-brand-primary">₹{order.totalAmount}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <Link to="/veg" className="inline-flex items-center gap-2 text-brand-primary font-bold hover:underline">
          <ShoppingBag size={18} /> Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderTracking;
