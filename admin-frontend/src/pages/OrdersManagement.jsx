import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, CheckCircle2, Clock, Truck, XCircle, Package } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOrders();
    // Poll for new orders every 10 seconds for real-time feel
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/orders`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setOrders(prev => 
          prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o)
        );
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const filteredOrders = orders.filter(order => 
    order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toString().includes(searchTerm)
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold flex items-center gap-1 w-max"><Clock size={12} /> Pending</span>;
      case 'Preparing':
        return <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold flex items-center gap-1 w-max"><Package size={12} /> Preparing</span>;
      case 'Out for Delivery':
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold flex items-center gap-1 w-max"><Truck size={12} /> Out for Delivery</span>;
      case 'Delivered':
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1 w-max"><CheckCircle2 size={12} /> Delivered</span>;
      case 'Cancelled':
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold flex items-center gap-1 w-max"><XCircle size={12} /> Cancelled</span>;
      default:
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold">{status}</span>;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-brand-dark mb-2">Orders Management</h2>
          <p className="text-gray-500">Monitor and update customer order statuses in real-time.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Search */}
        <div className="p-4 border-b border-gray-100 flex gap-4">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by Order ID or Customer Name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary/50"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
                <th className="p-4 font-semibold">Order ID</th>
                <th className="p-4 font-semibold">Customer</th>
                <th className="p-4 font-semibold">Address</th>
                <th className="p-4 font-semibold">Total Amount</th>
                <th className="p-4 font-semibold">Payment</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Update Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-bold text-gray-700">#{order.id}</td>
                  <td className="p-4">
                    <p className="font-bold text-brand-dark">{order.customerName}</p>
                    <p className="text-xs text-gray-500">{order.mobileNumber}</p>
                  </td>
                  <td className="p-4 text-gray-600 text-sm max-w-[200px] truncate">{order.address}</td>
                  <td className="p-4 font-bold text-brand-primary">₹{order.totalAmount}</td>
                  <td className="p-4 text-gray-600 text-sm uppercase font-semibold">{order.paymentMethod}</td>
                  <td className="p-4">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="p-4 text-right">
                    <div className="relative inline-block text-left">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 pl-3 pr-8 rounded-lg text-sm font-semibold focus:outline-none focus:border-brand-primary/50 cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-12 text-center text-gray-500">
                    <Package size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-lg font-bold">No orders found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersManagement;
