const mongoose = require('mongoose');

const itemTypeSchema = new mongoose.Schema({
    status: { type: String, required: true }
}, { timestamps: true });


module.exports = mongoose.model("Item-type", itemTypeSchema);
