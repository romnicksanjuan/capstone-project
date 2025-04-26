const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  unit: {
    type: String,
    required: true,
  },
  issue: {
    type: String,
    required: true,
  },
  dateReported: {
    type: Date,
    required: true,
  },
  remarks: {
    type: String,
    default: '',
  },
  quantity: {
    type: String,
    default: '',
  },
  actionTaken: {
    type: String,
    default: '',
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model('DamageLost', reportSchema);
