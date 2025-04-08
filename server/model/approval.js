const mongoose = require('mongoose')

const approvalSchema = new mongoose.Schema({
    request: { type: mongoose.Schema.Types.ObjectId, ref: 'Request', required: true },
    approver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    role: {
      type: String,
      enum: ['dean', 'president', 'admin'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    approvedAt: Date,
    remarks: String
  }, { timestamps: true });
  
  module.exports = mongoose.model('Approval', approvalSchema);
  