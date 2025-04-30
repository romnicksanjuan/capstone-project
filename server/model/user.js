const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    profileImage: {
        data: Buffer,
        contentType: String,
    },
    email: { type: String, },
    password: { type: String, },
    name: { type: String,  default: 'N/A'},
    gender: { type: String,  default: 'N/A'},
    department: { type: String, default: 'N/A'},
    phoneNumber: { type: String, default: 'N/A' },
    designation: { type: String, default: 'N/A' },
    dateOfBirth: { type: Date,  default: 'N/A'},
    role: { type: String, required: true, enum: ['dean', 'president', 'admin', 'requester'] },
}, { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)