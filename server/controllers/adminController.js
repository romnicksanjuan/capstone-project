const Admin = require("../model/admin")
const jwt = require("jsonwebtoken");

const createAdmin = async (req, res) => {
    const { email, password } = req.body
    console.log(email, password)
    try {
        const findAdmin = await Admin.findOne({ email })

        if (findAdmin) {
            res.status(400).json({ success: false, message: "Email is already exist" })
            return
        }
        const newAdmin = new Admin({ email, password, role: "admin" })
        const save = await newAdmin.save()
        console.log(save)
        res.status(200).json({ success: true, message: "Admin Created Successfull" })
    } catch (error) {
        console.log(error)
    }
}


const loginAdmin = async (req, res) => {
    const { email, password } = req.body
    console.log(email, password)
    try {
        const findEmail = await Admin.findOne({ email })

        if (!findEmail) {
            res.status(404).json({ success: false, message: "Email not found" })
            return
        }

        const findPassword = await Admin.findOne({ password })

        if (!findPassword) {
            res.status(404).json({ success: false, message: "Incorrect Password" })
            return
        }


        const payload = { email: findPassword.email, role: findPassword.role }
        const sercretKEy = "romnickPogi"
        const token = jwt.sign(payload, sercretKEy, { expiresIn: "10h" })

        res.cookie("token", token, {
            // withCredentials: true,
            httpOnly: true,   // ✅ Prevents JavaScript access (for security)
            secure: true,
            sameSite: "Strict",
            maxAge: 24 * 60 * 60 * 1000,
            // maxAge: 60 * 1000
        })
        res.status(201).json({ success: true, message: "Login Successfull" })

    } catch (error) {
        console.log(error)
    }
}

// forgot password
const forgotPassword = async (req, res) => {
    const { email, newPassword, confirmPassword } = req.body

    try {

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" })
        }

        const findEmail = await Admin.findOne({ email })


        if (!findEmail) {
            return res.status(404).json({ success: false, message: "Email not found" })
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Password does not match" })
        }

        const save = await Admin.findOneAndUpdate({ email }, { password: newPassword }, { new: true })
        await save.save()

        res.status(200).json({ success: true, message: "Password Reset Successfull" })
    } catch (error) {
        console.log(error)
    }
}
module.exports = { createAdmin, loginAdmin, forgotPassword }