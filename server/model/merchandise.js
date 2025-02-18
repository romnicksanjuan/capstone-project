const mongoose = require('mongoose')

const merchandiseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        data: { type: Buffer, required: true },
        contentType: { type: String, required: true }
    },
    stock: {
        type: Number,
        required: true,
    },
})

module.exports = mongoose.model('Merchandise', merchandiseSchema)