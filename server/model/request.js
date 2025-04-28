const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  requesterData: { type: mongoose.Schema.Types.Mixed, required: true },
  // requesterName: { type: String, required: true },
  department: { type: String, required: true },
  purpose: { type: String, required: true },
  date: { type: String, required: true },
  isFabrication: { type: Boolean, required: false },
  isRepair: { type: Boolean, required: false },
  isReplacement: { type: Boolean, required: false },
  isAdditional: { type: Boolean, required: false },
  others: { type: String, },
  quantity_and_materials: [{
    quantity: { type: Number },
    materials: { type: String }
  }],
  requestedBy: { type: String, required: true },
  deanApproval: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  presidentApproval: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  toLocation: {
    type: String,
    required: true,
  },
  // status: { type: String, enum: ['pending-approval', 'ready-for-release', 'in-progress', 'completed', 'not-available'], default: 'pending-approval' }
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
