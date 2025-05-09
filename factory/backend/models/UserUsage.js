const mongoose = require('mongoose');

const userUsageSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  appliances: [
    {
      applianceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appliance' },
      hoursUsed: Number,
    },
  ],
});

module.exports = mongoose.model('UserUsage', userUsageSchema);
