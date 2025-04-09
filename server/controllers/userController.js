const User = require("../model/user.js")
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer')
const Otp = require('../model/otp.js')
const crypto = require("crypto")

const createAdmin = async (req, res) => {
    const { email, password, gender, department, phoneNumber, designation, dateOfBirth } = req.body
    console.log(email, password)
    try {
        const findUser = await User.findOne({ email })

        if (findUser) {
            res.status(400).json({ success: false, message: "Email is already exist" })
            return
        }
        const newUser = new User({ email, password, role: "admin", gender, department, phoneNumber, designation, dateOfBirth })
        const save = await newUser.save()
        console.log(save)
        res.status(200).json({ success: true, message: "User Created Successfull" })
    } catch (error) {
        console.log(error)
    }
}


const loginAdmin = async (req, res) => {
    const { email, password } = req.body
    // console.log(email, password)
    try {
        const findEmail = await User.findOne({ email })

        if (!findEmail) {
            res.status(404).json({ success: false, message: "Incorrect Email or Password" })
            return
        }

        const findPassword = await User.findOne({ password })

        if (!findPassword) {
            res.status(404).json({ success: false, message: "Incorrect Email or Password" })
            return
        }


        const payload = { id: findEmail._id, email: findPassword.email, role: findPassword.role }
        const sercretKEy = "romnickPogi"
        const token = jwt.sign(payload, sercretKEy, { expiresIn: "10h" })

        res.cookie("token", token, {
            // withCredentials: true,
            httpOnly: true,
            secure: true,       // 🔥 Required for HTTPS
            sameSite: 'None',    // 🔥 Required for cross-origin cookies
            maxAge: 24 * 60 * 60 * 1000,
            // maxAge: 60 * 1000
        })
        res.status(201).json({ success: true, message: "Login Successfull", token, role: findEmail.role })

    } catch (error) {
        console.log(error)
    }
}


const transporter = nodemailer.createTransport({
    tls: {
        rejectUnauthorized: false  // Ignore certificate validation
    },
    service: 'gmail',
    auth: {
        user: 'romnicksanjuan22@gmail.com',
        pass: 'miho qtfh mijo xlts'
    }
})


// send otp
const sendOtp = async (req, res) => {
    const { email } = req.body
    console.log(email)
    try {
        // Generate 6-digit OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins expiration
        console.log(otp)

        // Send OTP via email
        const mailOptions = {
            from: "romnicksanjuan22@gmail.com",
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP is ${otp}. It will expire with in 5 minutes.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error.message)
                return
            };
            res.status(200).json({ message: "OTP sent!" });
        });

        const saveOtp = new Otp({ email, otp, expiresAt })
        await saveOtp.save()
    } catch (error) {
        console.log(error)
    }
}

// verify otp
const verifyOtp = async (req, res) => {
    const { email, otp } = req.body
    const otpRecord = await Otp.findOne({ email, otp });

    if (!otpRecord) {
        return res.status(400).json({ success: true, message: "Invalid or expired OTP" });
    }
    // Proceed with password reset
    res.json({ message: "OTP verified!" });
}

// forgot password
const forgotPassword = async (req, res) => {
    const { email, newPassword, confirmPassword } = req.body

    try {

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" })
        }

        const findEmail = await User.findOne({ email })


        if (!findEmail) {
            return res.status(404).json({ success: false, message: "Email not found" })
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Password does not match" })
        }

        const save = await User.findOneAndUpdate({ email }, { password: newPassword }, { new: true })
        await save.save()

        res.status(200).json({ success: true, message: "Password Reset Successfull" })
    } catch (error) {
        console.log(error)
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true, // Make sure it's false in development if you're not using HTTPS
            sameSite: 'None',
        });
        // console.log("vovo")
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log(error)
    }
}

// change password
const changePassword = async (req, res) => {
    const { email, oldPassword, newPassword, confirmPassword } = req.body

    // console.log(email, oldPassword, newPassword, confirmPassword)

    try {
        const checkEmailAndPass = await User.findOne({ email, password: oldPassword })

        if (!checkEmailAndPass) {
            return res.status(404).json({ success: false, message: 'Incorrect Email of Password' })
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ success: false, message: 'New Password and Confirm Password Does not Match' })
        }

        checkEmailAndPass.password = newPassword

        checkEmailAndPass.save()

        res.status(200).json({ success: true, message: 'Password Change Successfull' })

    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    createAdmin, loginAdmin, forgotPassword, logout,
    sendOtp, verifyOtp, changePassword
}