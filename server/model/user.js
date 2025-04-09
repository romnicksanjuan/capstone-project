const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    department: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    designation: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    role: { type: String, required: true, enum: ['dean', 'president', 'admin', 'requester'] },
}, { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)