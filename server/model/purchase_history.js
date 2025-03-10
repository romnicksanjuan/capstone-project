const mongoose = require('mongoose')

const PurchaseHistorySchema = new mongoose.Schema({
    merchandise: { type: mongoose.Schema.Types.Mixed, required: true },
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