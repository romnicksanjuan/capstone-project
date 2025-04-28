const mongoose = require('mongoose');

const borrowedItem = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.Mixed, required: true },
  PMSNumber: [{
    item: { type: String },
    quantity: { type: Number },
    itemDescription:  { type: String },
    brand:  { type: String },
  }],
  borrower: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: Number,
    required: true
  },
  purpose: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  department: {
    type: String,
    required: true
  },
  borrower_designation: {
    type: String,
    required: true
  },
  status_before: {
    type: String,
    required: true
  },
  status_after: {
    type: String,
    default: '--'
  },
  dateBorrowed: {
    type: Date,
    default: Date.now
  },
  dateReturned: {
    type: Date,
    default: null
  },
  action: {
    type: String,
    enum: ['Borrowed', 'Returned', 'Damage', 'Lost'],
    default: 'Borrowed'
  }
}, { timestamps: true });

module.exports = mongoose.model('borrow-item', borrowedItem);
