const mongoose = require('mongoose');

const borrowedItem = new mongoose.Schema({
  unitId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
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
});

module.exports = mongoose.model('borrow-item', borrowedItem);
