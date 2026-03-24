require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const DeployLog = require('./models/item');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
const APP_VERSION = process.env.APP_VERSION || '1.0.0';
const APP_NAME = process.env.APP_NAME || 'my-app';

connectDB();

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', app: APP_NAME, version: APP_VERSION, uptime: process.uptime() });
});

// App info
app.get('/api/info', (req, res) => {
  res.json({ message: `Hello from ${APP_NAME}!`, version: APP_VERSION });
});

// GET deploy logs ทั้งหมด
app.get('/api/deploys', async (req, res) => {
  try {
    const logs = await DeployLog.find().sort({ deployedAt: -1 }).limit(20);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST บันทึก deploy log ใหม่
app.post('/api/deploys', async (req, res) => {
  try {
    const log = new DeployLog(req.body);
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET สถิติ
app.get('/api/stats', async (req, res) => {
  try {
    const total = await DeployLog.countDocuments();
    const success = await DeployLog.countDocuments({ status: 'success' });
    const failed = await DeployLog.countDocuments({ status: 'failed' });
    const latest = await DeployLog.findOne().sort({ deployedAt: -1 });
    res.json({ total, success, failed, latest });
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