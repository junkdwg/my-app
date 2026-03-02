require('dotenv').config(); 

const express = require('express');
const app = express();

const PORT = process.env.PORT;
const APP_VERSION = process.env.APP_VERSION;
const APP_NAME = process.env.APP_NAME;

app.get('/', (req, res) => {
  res.json({
    message: `Hello from ${APP_NAME}!`,
    version: APP_VERSION,
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    app: APP_NAME,
    version: APP_VERSION,
    uptime: process.uptime()
  });
});

app.listen(PORT, () => {
  console.log(`[${APP_NAME}] v${APP_VERSION} running on port ${PORT}`);
});