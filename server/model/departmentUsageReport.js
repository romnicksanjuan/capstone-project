const mongoose = require('mongoose');

const departmentUsageReportSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
  },
//   item: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Inventory',
//     required: true,
//   },
  PMSNumber: {
    type: String,
    required: true,
  },
  totalIssued: {
    type: Number,
    required: true,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('DepartmentUsageReport', departmentUsageReportSchema);
