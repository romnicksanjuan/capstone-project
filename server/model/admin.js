const mongoose = require("mongoose")
const adminSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin"] },
}, { timestamps: true }
)

module.exports = mongoose.model("admin", adminSchema)