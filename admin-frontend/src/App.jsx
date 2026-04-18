import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, UtensilsCrossed, ShoppingBag, Bell } from 'lucide-react';
import MenuManagement from './pages/MenuManagement';
import OrdersManagement from './pages/OrdersManagement';

const Sidebar = () => {
  const location = useLocation();
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Menu Items', path: '/menu', icon: <UtensilsCrossed size={20} /> },
    { name: 'Orders', path: '/orders', icon: <ShoppingBag size={20} /> },
  ];

  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200 fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h1 className="text-2xl font-black text-brand-dark">Admin<span className="text-brand-primary">Panel</span></h1>
        <button className="relative p-2 text-gray-500 hover:text-brand-primary transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
      <nav className="p-4 flex-grow space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
              location.pathname === item.path
                ? 'bg-brand-primary/10 text-brand-primary'
                : 'text-gray-500 hover:bg-gray-50 hover:text-brand-dark'
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

const Dashboard = () => (
  <div>
    <h2 className="text-3xl font-extrabold text-brand-dark mb-6">Dashboard Overview</h2>
    <div className="grid grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-gray-500 font-bold mb-2">Total Orders</h3>
        <p className="text-4xl font-black text-brand-dark">128</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-gray-500 font-bold mb-2">Revenue</h3>
        <p className="text-4xl font-black text-brand-primary">₹45,200</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-gray-500 font-bold mb-2">Menu Items</h3>
        <p className="text-4xl font-black text-brand-dark">42</p>
      </div>
    </div>
  </div>
);



const App = () => {
  return (
    <BrowserRouter>
      <div className="flex bg-brand-light min-h-screen">
        <Sidebar />
        <main className="ml-64 p-10 flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/menu" element={<MenuManagement />} />
            <Route path="/orders" element={<OrdersManagement />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
