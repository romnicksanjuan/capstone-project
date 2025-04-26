const mongoose = require('mongoose');

const transferSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
  fromLocation: {
    type: String,
    required: true,
  },
  toLocation: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt
});

module.exports = mongoose.model('Transfer-Item', transferSchema);
