const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize SQLite database
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    // Enable Foreign Keys
    db.run('PRAGMA foreign_keys = ON');
    
    // Create Food Items Table
    db.run(`CREATE TABLE IF NOT EXISTS food_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      originalPrice REAL,
      image TEXT,
      category TEXT,
      isVeg INTEGER,
      rating REAL,
      tags TEXT
    )`);

    // Create Orders Table
    db.run(`CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customerName TEXT,
      mobileNumber TEXT,
      address TEXT,
      paymentMethod TEXT,
      totalAmount REAL,
      status TEXT DEFAULT 'Pending',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // Create Order Items Table
    db.run(`CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER,
      food_id INTEGER,
      quantity INTEGER,
      price REAL,
      FOREIGN KEY (order_id) REFERENCES orders(id),
      FOREIGN KEY (food_id) REFERENCES food_items(id)
    )`);
  }
});

// --- API ENDPOINTS ---

// GET all food items
app.get('/api/menu', (req, res) => {
  db.all('SELECT * FROM food_items', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    // Parse tags back into array
    const menu = rows.map(item => ({
      ...item,
      isVeg: item.isVeg === 1,
      tags: item.tags ? JSON.parse(item.tags) : []
    }));
    res.json(menu);
  });
});

// POST a new food item
app.post('/api/menu', (req, res) => {
  const { name, description, price, originalPrice, image, category, isVeg, rating, tags } = req.body;
  const sql = `INSERT INTO food_items (name, description, price, originalPrice, image, category, isVeg, rating, tags)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [name, description, price, originalPrice, image, category, isVeg ? 1 : 0, rating, JSON.stringify(tags || [])];
  
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, ...req.body });
  });
});

// PUT (Update) a food item
app.put('/api/menu/:id', (req, res) => {
  const { name, description, price, originalPrice, image, category, isVeg, rating, tags } = req.body;
  const sql = `UPDATE food_items 
               SET name = ?, description = ?, price = ?, originalPrice = ?, image = ?, category = ?, isVeg = ?, rating = ?, tags = ?
               WHERE id = ?`;
  const params = [name, description, price, originalPrice, image, category, isVeg ? 1 : 0, rating, JSON.stringify(tags || []), req.params.id];
  
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Item updated successfully' });
  });
});

// DELETE a food item
app.delete('/api/menu/:id', (req, res) => {
  const itemId = req.params.id;
  
  // First, delete related items to prevent constraint errors
  db.run('DELETE FROM order_items WHERE food_id = ?', [itemId], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    
    db.run('DELETE FROM food_items WHERE id = ?', [itemId], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Item deleted successfully', changes: this.changes });
    });
  });
});

// GET all orders (Admin)
app.get('/api/orders', (req, res) => {
  db.all('SELECT * FROM orders ORDER BY createdAt DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST a new order (Customer)
app.post('/api/orders', (req, res) => {
  const { customerName, mobileNumber, address, paymentMethod, totalAmount, items } = req.body;
  
  db.run(`INSERT INTO orders (customerName, mobileNumber, address, paymentMethod, totalAmount) 
          VALUES (?, ?, ?, ?, ?)`,
    [customerName, mobileNumber, address, paymentMethod, totalAmount],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      const orderId = this.lastID;
      
      // Insert order items
      if (items && items.length > 0) {
        const stmt = db.prepare('INSERT INTO order_items (order_id, food_id, quantity, price) VALUES (?, ?, ?, ?)');
        items.forEach(item => {
          stmt.run(orderId, item.id, item.quantity, item.price);
        });
        stmt.finalize();
      }
      
      // Emit socket notification here (to be added)
      res.json({ message: 'Order placed successfully', orderId });
    }
  );
});

// GET orders by mobile or name (Customer History)
app.get('/api/orders/history/:query', (req, res) => {
  const sql = `
    SELECT o.*, GROUP_CONCAT(fi.name || ' x ' || oi.quantity, ', ') as itemsSummary
    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    LEFT JOIN food_items fi ON oi.food_id = fi.id
    WHERE o.mobileNumber = ? OR o.customerName = ?
    GROUP BY o.id
    ORDER BY o.createdAt DESC
  `;
  db.all(sql, [req.params.query, req.params.query], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// GET single order status (Order Tracking)
app.get('/api/orders/:id', (req, res) => {
  const orderId = req.params.id;
  db.get('SELECT * FROM orders WHERE id = ?', [orderId], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) {
      // Fallback: If not found, check if ID is actually the dummy CP-style ID or something else
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(row);
  });
});

// UPDATE order status (Admin)
app.put('/api/orders/:id/status', (req, res) => {
  const { status } = req.body;
  const orderId = req.params.id;
  
  db.run('UPDATE orders SET status = ? WHERE id = ?', [status, orderId], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Status updated successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
