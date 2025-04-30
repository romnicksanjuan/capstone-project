const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
});

module.exports = mongoose.model('Department', departmentSchema);
