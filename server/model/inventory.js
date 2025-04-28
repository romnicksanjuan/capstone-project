const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  PMSNumber: {
    type: String,
    required: true
  },
  serialNumber: {
    type: String,
    required: true
  },
  itemDescription: {
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
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  accessory_type: {
    type: String,
    required: true
  },
  // link: { type: String, required: true },
  qr_code_image: {
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true }
  },
  dateAdded: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Inventory', itemSchema);
