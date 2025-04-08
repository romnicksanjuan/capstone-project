const requestSchema = new mongoose.Schema({
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: String,
    description: String,
    status: {
      type: String,
      enum: ['pending', 'approved_by_dean', 'approved_by_president', 'completed', 'rejected'],
      default: 'pending'
    }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Request', requestSchema);
  