const mongoose = require('mongoose');

const energyUsageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  deviceId: { type: String, required: true },
  deviceName: { type: String, required: true },
  deviceType: { type: String, required: true },
  powerConsumption: { type: Number, required: true }, // in watts
  duration: { type: Number, required: true }, // in minutes
  timestamp: { type: Date, required: true, default: Date.now },
  cost: { type: Number }, // calculated cost
  location: { type: String }, // room/location
  isActive: { type: Boolean, default: true }, // if device is currently active
});

module.exports = mongoose.model('EnergyUsage', energyUsageSchema);