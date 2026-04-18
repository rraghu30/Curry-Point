require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

console.log('Backend connected to Supabase.');

// --- API ENDPOINTS ---

// GET all food items
app.get('/api/menu', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('food_items')
      .select('*');
    
    if (error) throw error;
    
    // Transform to match frontend expectations if necessary
    const menu = data.map(item => ({
      ...item,
      isVeg: item.is_veg,
      originalPrice: item.original_price,
      tags: item.tags // Supabase JSONB is already an array
    }));
    
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new food item
app.post('/api/menu', async (req, res) => {
  const { name, description, price, originalPrice, image, category, isVeg, rating, tags } = req.body;
  
  try {
    const { data, error } = await supabase
      .from('food_items')
      .insert([
        { 
          name, 
          description, 
          price, 
          original_price: originalPrice, 
          image, 
          category, 
          is_veg: isVeg, 
          rating, 
          tags 
        }
      ])
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT (Update) a food item
app.put('/api/menu/:id', async (req, res) => {
  const { name, description, price, originalPrice, image, category, isVeg, rating, tags } = req.body;
  
  try {
    const { data, error } = await supabase
      .from('food_items')
      .update({ 
        name, 
        description, 
        price, 
        original_price: originalPrice, 
        image, 
        category, 
        is_veg: isVeg, 
        rating, 
        tags 
      })
      .eq('id', req.params.id)
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a food item
app.delete('/api/menu/:id', async (req, res) => {
  try {
    const { error } = await supabase
      .from('food_items')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all orders (Admin)
app.get('/api/orders', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    // Map column names
    const orders = data.map(o => ({
      ...o,
      customerName: o.customer_name,
      mobileNumber: o.mobile_number,
      paymentMethod: o.payment_method,
      totalAmount: o.total_amount,
      createdAt: o.created_at
    }));

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new order (Customer)
app.post('/api/orders', async (req, res) => {
  const { customerName, mobileNumber, address, paymentMethod, totalAmount, items } = req.body;
  
  try {
    // 1. Insert Order
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert([
        { 
          customer_name: customerName, 
          mobile_number: mobileNumber, 
          address, 
          payment_method: paymentMethod, 
          total_amount: totalAmount 
        }
      ])
      .select();

    if (orderError) throw orderError;
    const orderId = orderData[0].id;

    // 2. Insert Order Items
    if (items && items.length > 0) {
      const orderItems = items.map(item => ({
        order_id: orderId,
        food_id: item.id,
        quantity: item.quantity,
        price: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;
    }

    res.json({ message: 'Order placed successfully', orderId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET orders by mobile or name (Customer History)
app.get('/api/orders/history/:query', async (req, res) => {
  const query = req.params.query;
  try {
    // We'll fetch orders and their items using a join or multiple queries
    // For simplicity and since we don't have a view, we fetch orders then items
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          quantity,
          price,
          food_items ( name )
        )
      `)
      .or(`mobile_number.eq.${query},customer_name.eq.${query}`)
      .order('created_at', { ascending: false });

    if (ordersError) throw ordersError;

    const history = orders.map(o => {
      const itemsSummary = o.order_items.map(oi => `${oi.food_items.name} x ${oi.quantity}`).join(', ');
      return {
        ...o,
        customerName: o.customer_name,
        mobileNumber: o.mobile_number,
        paymentMethod: o.payment_method,
        totalAmount: o.total_amount,
        createdAt: o.created_at,
        itemsSummary
      };
    });

    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single order status (Order Tracking)
app.get('/api/orders/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Order not found' });

    res.json({
      ...data,
      customerName: data.customer_name,
      mobileNumber: data.mobile_number,
      paymentMethod: data.payment_method,
      totalAmount: data.total_amount,
      createdAt: data.created_at
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE order status (Admin)
app.put('/api/orders/:id/status', async (req, res) => {
  const { status } = req.body;
  try {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: 'Status updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
