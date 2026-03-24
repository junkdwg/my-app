const mongoose = require('mongoose');

const deployLogSchema = new mongoose.Schema({
  version: { type: String, required: true },
  status: { type: String, enum: ['success', 'failed'], required: true },
  branch: { type: String, default: 'main' },
  commit: { type: String, default: '-' },
  duration: { type: String, default: '-' },
  deployedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DeployLog', deployLogSchema);