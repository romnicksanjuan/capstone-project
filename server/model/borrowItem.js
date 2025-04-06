const mongoose = require('mongoose');

const borrowedItem = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.Mixed, required: true },
  serialNumber: {
    type: String,
    required: true
  },
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
    enum: ['Borrowed', 'Returned'],
    default: 'Borrowed'
  }
}, { timestamps: true });

module.exports = mongoose.model('borrow-item', borrowedItem);
