// models/StockTransaction.js
const mongoose = require('mongoose');

const stockTransactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  itemName: {
    type: String,
    required: true,
    trim: true,
  },
  action: {
    type: String,
    required: true,
    enum: ['Stock In', 'Stock Out'],
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  // details: {
  //   type: String,
  //   default: '',
  //   trim: true,
  // },
}, { timestamps: true });

module.exports = mongoose.model('StockTransaction', stockTransactionSchema);
