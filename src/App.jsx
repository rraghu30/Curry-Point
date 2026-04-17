import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Importing pages directly for maximum reliability
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import Offers from './pages/Offers';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import CouponSystem from './pages/CouponSystem';
import Profile from './pages/Profile';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-16 lg:pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/veg" element={<MenuPage category="veg" title="Vegetarian Menu" />} />
          <Route path="/non-veg" element={<MenuPage category="non-veg" title="Non-Veg Menu" />} />
          <Route path="/sweets" element={<MenuPage category="sweets" title="Sweets & Desserts" />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/coupons" element={<CouponSystem />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Profile activeTab="orders" />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
