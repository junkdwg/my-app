require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const Item = require('./models/Item');
const path = require('path');

const app = express();
app.use(express.json());

// ✅ ต้องอยู่บนสุด ก่อน routes อื่น
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
const APP_VERSION = process.env.APP_VERSION || '1.0.0';
const APP_NAME = process.env.APP_NAME || 'my-app';

connectDB();

app.get('/health', (req, res) => {
  res.json({ status: 'ok', app: APP_NAME, version: APP_VERSION, uptime: process.uptime() });
});

app.get('/api/info', (req, res) => {
  res.json({ message: `Hello from ${APP_NAME}!`, version: APP_VERSION });
});

app.get('/items', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/items', async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/items/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[${APP_NAME}] v${APP_VERSION} running on port ${PORT}`);
  });
}

module.exports = app;