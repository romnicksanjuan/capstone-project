const mongoose = require('mongoose');

const itemTypeSchema = new mongoose.Schema({
    type: { type: String, required: true }
}, { timestamps: true });


module.exports = mongoose.model("Item-type", itemTypeSchema);
