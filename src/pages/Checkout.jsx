import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Phone, MapPin, Landmark, CreditCard, Truck,
  ChevronRight, Tag, CheckCircle2, AlertCircle
} from 'lucide-react';
import OrderSuccess from '../components/OrderSuccess';

// ─── Shared input class — adapts to dark mode ──────────────────────────────────
const inputCls = (hasIcon = true) =>
  `w-full ${hasIcon ? 'pl-11' : 'pl-4'} pr-4 py-3
   bg-gray-100 dark:bg-[#2D333E]
   text-gray-900 dark:text-white
   placeholder:text-gray-400 dark:placeholder:text-gray-500
   border-2 border-transparent
   focus:border-brand-primary/50
   rounded-2xl text-sm focus:outline-none transition-all`;

// ─── Field wrapper ─────────────────────────────────────────────────────────────
const Field = ({ label, icon: Icon, error, children }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5 ml-1">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <Icon
          size={17}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none z-10"
        />
      )}
      {children}
    </div>
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="flex items-center gap-1 text-red-500 text-xs mt-1.5 ml-1"
        >
          <AlertCircle size={12} /> {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

// ─── Payment Method Card ───────────────────────────────────────────────────────
const PaymentCard = ({ id, selected, onSelect, icon, title, subtitle }) => (
  <motion.button
    type="button"
    onClick={() => onSelect(id)}
    whileTap={{ scale: 0.98 }}
    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
      selected
        ? 'border-brand-primary bg-orange-50 dark:bg-orange-950/30'
        : 'border-gray-200 dark:border-[#3a4150] bg-gray-100 dark:bg-[#2D333E] hover:border-brand-primary/40'
    }`}
  >
    <div
      className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${
        selected
          ? 'bg-brand-primary text-white'
          : 'bg-white dark:bg-[#1E2229] text-gray-500 dark:text-gray-400'
      }`}
    >
      {icon}
    </div>
    <div className="flex-grow">
      <p className={`font-bold text-sm ${selected ? 'text-brand-primary' : 'text-gray-800 dark:text-gray-100'}`}>
        {title}
      </p>
      <p className="text-xs text-gray-400 dark:text-gray-500">{subtitle}</p>
    </div>
    <div
      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
        selected ? 'border-brand-primary' : 'border-gray-300 dark:border-gray-600'
      }`}
    >
      {selected && <div className="w-2.5 h-2.5 rounded-full bg-brand-primary" />}
    </div>
  </motion.button>
);

// ─── Section Card wrapper ──────────────────────────────────────────────────────
const SectionCard = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white dark:bg-[#1E2229] rounded-3xl p-7 shadow-sm border border-gray-100 dark:border-[#2D333E]"
  >
    {children}
  </motion.div>
);

const SectionTitle = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-9 h-9 rounded-xl bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center">
      <Icon size={18} className="text-brand-primary" />
    </div>
    <h2 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h2>
  </div>
);

// ─── Main Checkout Page ────────────────────────────────────────────────────────
const Checkout = () => {
  const { user } = useAuth();
  const { cartItems, subtotal, total, discountAmount, appliedCoupon, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || '',
    mobile: '',
    address: '',
    landmark: '',
  });
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [upiId, setUpiId] = useState('');
  const [upiError, setUpiError] = useState('');
  const [isPlacing, setIsPlacing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required';
    if (!form.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) {
      newErrors.mobile = 'Enter a valid 10-digit Indian mobile number';
    }
    if (!form.address.trim()) newErrors.address = 'Delivery address is required';

    if (paymentMethod === 'upi') {
      if (!upiId.trim()) {
        setUpiError('UPI ID is required');
        newErrors._upi = true;
      } else if (!/^[\w.\-]+@[\w]+$/.test(upiId.trim())) {
        setUpiError('Enter a valid UPI ID (e.g., name@upi)');
        newErrors._upi = true;
      } else {
        setUpiError('');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validate()) return;
    setIsPlacing(true);

    try {
      const orderPayload = {
        customerName: user?.name || form.name,
        mobileNumber: form.mobile,
        address: `${form.address} ${form.landmark ? '(' + form.landmark + ')' : ''}`,
        paymentMethod: paymentMethod === 'upi' ? 'UPI' : 'Cash on Delivery',
        totalAmount: total,
        items: cartItems.map(item => ({ id: item.id, quantity: item.quantity, price: item.price }))
      };

      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      if (res.ok) {
        const data = await res.json();
        setPlacedOrderId(data.orderId);
        setShowSuccess(true);
        clearCart();
      }
    } catch (err) {
      console.error('Failed to place order:', err);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsPlacing(false);
    }
  };

  if (showSuccess) return <OrderSuccess orderId={placedOrderId} />;
  if (cartItems.length === 0) { navigate('/'); return null; }

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* ── Page Header ── */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-4xl font-outfit font-extrabold text-gray-900 dark:text-white">
          Checkout
        </h1>
        <p className="text-gray-400 dark:text-gray-500 mt-1 text-sm">
          Just a few details and your food is on its way! 🍽️
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* ──────────────── LEFT: Form ──────────────── */}
        <div className="lg:col-span-2 space-y-8">

          {/* Section 1 — Delivery Details */}
          <SectionCard delay={0.05}>
            <SectionTitle icon={MapPin} title="Delivery Details" />
            <div className="space-y-5">

              {/* Full Name */}
              <Field label="Full Name *" icon={User} error={errors.name}>
                <input
                  id="checkout-name"
                  type="text"
                  placeholder="e.g. Rohit Sharma"
                  value={form.name}
                  onChange={set('name')}
                  className={inputCls()}
                />
              </Field>

              {/* Mobile */}
              <Field label="Mobile Number *" icon={Phone} error={errors.mobile}>
                <input
                  id="checkout-mobile"
                  type="tel"
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  value={form.mobile}
                  onChange={set('mobile')}
                  className={inputCls()}
                />
              </Field>

              {/* Address */}
              <Field label="Delivery Address *" icon={MapPin} error={errors.address}>
                <textarea
                  id="checkout-address"
                  rows={3}
                  placeholder="House/Flat No., Street, Area, City, Pincode"
                  value={form.address}
                  onChange={set('address')}
                  className={`w-full pl-11 pr-4 py-3
                    bg-gray-100 dark:bg-[#2D333E]
                    text-gray-900 dark:text-white
                    placeholder:text-gray-400 dark:placeholder:text-gray-500
                    border-2 border-transparent
                    focus:border-brand-primary/50
                    rounded-2xl text-sm focus:outline-none transition-all resize-none`}
                />
              </Field>

              {/* Landmark */}
              <Field label="Landmark (Optional)" icon={Landmark}>
                <input
                  id="checkout-landmark"
                  type="text"
                  placeholder="Near school, beside post office…"
                  value={form.landmark}
                  onChange={set('landmark')}
                  className={inputCls()}
                />
              </Field>
            </div>
          </SectionCard>

          {/* Section 2 — Payment Method */}
          <SectionCard delay={0.1}>
            <SectionTitle icon={CreditCard} title="Payment Method" />
            <div className="space-y-3">
              <PaymentCard
                id="cod"
                selected={paymentMethod === 'cod'}
                onSelect={setPaymentMethod}
                icon={<Truck size={20} />}
                title="Cash on Delivery"
                subtitle="Pay with cash when your order arrives"
              />
              <PaymentCard
                id="upi"
                selected={paymentMethod === 'upi'}
                onSelect={setPaymentMethod}
                icon={<span className="font-black text-base">₹</span>}
                title="UPI Payment"
                subtitle="Pay instantly using any UPI app"
              />
            </div>

            {/* UPI ID Input — animated */}
            <AnimatePresence>
              {paymentMethod === 'upi' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-[#2D333E]">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1.5 ml-1">
                      Enter UPI ID *
                    </label>
                    <input
                      id="checkout-upi-id"
                      type="text"
                      placeholder="e.g. yourname@okicici"
                      value={upiId}
                      onChange={(e) => { setUpiId(e.target.value); setUpiError(''); }}
                      className={`w-full px-4 py-3
                        bg-gray-100 dark:bg-[#2D333E]
                        text-gray-900 dark:text-white
                        placeholder:text-gray-400 dark:placeholder:text-gray-500
                        border-2 rounded-2xl text-sm focus:outline-none transition-all
                        ${upiError
                          ? 'border-red-400'
                          : 'border-transparent focus:border-brand-primary/50'}`}
                    />
                    <AnimatePresence>
                      {upiError && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-1 text-red-500 text-xs mt-1.5 ml-1"
                        >
                          <AlertCircle size={12} /> {upiError}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 ml-1">
                      Supported: GPay, PhonePe, Paytm, BHIM, etc.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </SectionCard>
        </div>

        {/* ──────────────── RIGHT: Order Summary ──────────────── */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white dark:bg-[#1E2229] rounded-3xl p-7 shadow-sm border border-gray-100 dark:border-[#2D333E] sticky top-28"
          >
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>

            {/* Items */}
            <div className="space-y-3 mb-6 max-h-52 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-11 h-11 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-grow min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{item.name}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-white shrink-0">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="border-t border-gray-100 dark:border-[#2D333E] pt-4 space-y-3 mb-6">
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-sm text-green-600 font-medium">
                  <span className="flex items-center gap-1">
                    <Tag size={13} /> Coupon ({appliedCoupon.code})
                  </span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Delivery Fee</span>
                <span className="text-green-600 font-bold">FREE</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-100 dark:border-[#2D333E]">
                <span className="font-bold text-base text-gray-900 dark:text-white">Total</span>
                <span className="font-extrabold text-2xl text-brand-primary">₹{total}</span>
              </div>
            </div>

            {/* Selected payment badge */}
            <div className="bg-gray-100 dark:bg-[#2D333E] rounded-2xl px-4 py-3 mb-5 flex items-center gap-2">
              {paymentMethod === 'cod' ? (
                <>
                  <Truck size={16} className="text-brand-primary" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Cash on Delivery</span>
                </>
              ) : (
                <>
                  <span className="text-brand-primary font-black text-base leading-none">₹</span>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                    UPI {upiId ? `— ${upiId}` : ''}
                  </span>
                </>
              )}
            </div>

            {/* Place Order button */}
            <button
              id="place-order-btn"
              onClick={handlePlaceOrder}
              disabled={isPlacing}
              className="w-full btn-primary py-4 text-base flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isPlacing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  <span>Placing Order…</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={18} />
                  <span>Place Order</span>
                  <ChevronRight size={16} />
                </>
              )}
            </button>

            <p className="text-center text-[10px] text-gray-400 dark:text-gray-600 mt-3">
              By placing your order, you agree to our Terms &amp; Conditions.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
