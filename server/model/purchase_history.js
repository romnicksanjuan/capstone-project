const mongoose = require('mongoose')

const PurchaseHistorySchema = new mongoose.Schema({
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Merchandise' },
    fullname: {
        type: String,
        required: true
    },
    program: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('purchase-history', PurchaseHistorySchema)