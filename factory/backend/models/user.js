const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  householdSize: { type: Number, default: 1 },
  homeSize: { type: Number }, // in square feet
  energyProvider: { type: String },
  ratePerKwh: { type: Number, default: 0.12 }, // default $0.12 per kWh
  lastAnalysisDate: { type: Date },
  preferences: {
    receiveTips: { type: Boolean, default: true },
    tipFrequency: { type: String, enum: ['daily', 'weekly'], default: 'daily' },
  },
});

module.exports = mongoose.model('User', userSchema);