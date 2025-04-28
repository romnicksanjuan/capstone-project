const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    profileImage: {
        data: Buffer,
        contentType: String,
    },
    email: { type: String, },
    password: { type: String, },
    name: { type: String, },
    gender: { type: String, },
    department: { type: String, },
    phoneNumber: { type: String, },
    designation: { type: String, },
    dateOfBirth: { type: Date, },
    role: { type: String, required: true, enum: ['dean', 'president', 'admin', 'requester'] },
}, { timestamps: true }
)

module.exports = mongoose.model("User", userSchema)