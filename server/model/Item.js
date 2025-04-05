const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    required: true
  },
  serialItem: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true
  },
  link: { type: String, required: true },
  qr_code_image: {
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true }
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
