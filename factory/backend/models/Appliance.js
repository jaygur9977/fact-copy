const mongoose = require('mongoose');

const applianceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  powerPerHour: { type: Number, required: true }, // in watts
});

module.exports = mongoose.model('Appliance', applianceSchema);
