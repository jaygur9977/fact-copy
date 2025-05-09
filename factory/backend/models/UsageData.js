const mongoose = require('mongoose');

const usageSchema = new mongoose.Schema({
  bills: [
    {
      month: String,
      units: Number
    }
  ],
  lastBillReading: Number,
  currentReading: Number,
  readingDate: String,
  currentUsage: Number,
  projectedUsage: Number,
  avgUsage: Number,
  alertMessage: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('UsageData', usageSchema);
