const User = require("../model/user.js")
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer')
const Otp = require('../model/otp.js')
const crypto = require("crypto")
// admin
const createAdmin = async (req, res) => {
    const { email, password, gender, department, phoneNumber, designation, dateOfBirth, name } = req.body
    console.log(email, password)
    try {
        const findUser = await User.findOne({ email })

        if (findUser) {
            res.status(400).json({ success: false, message: "Email is already exist" })
            return
        }
        const newUser = new User({ email, password, role: "admin", gender, department, phoneNumber, designation, dateOfBirth, name })
        const save = await newUser.save()
        console.log(save)
        res.status(200).json({ success: true, message: "User Created Successfull" })
    } catch (error) {
        console.log(error)
    }
}

// deam
const createDean = async (req, res) => {
    const { deanEmail, deanPassword, departmentName, deanName, deanDesignation, accRole } = req.body
    console.log(deanEmail, deanPassword, departmentName, deanName, deanDesignation, accRole)

    // return
    try {
        const findUser = await User.findOne({ email: deanEmail })

        if (findUser) {
            res.status(400).json({ success: false, message: "Email is already exist" })
            return
        }
        const newUser = new User({ email: deanEmail, role: accRole, password: deanPassword, department: departmentName, name: deanName, designation: deanDesignation })
        const save = await newUser.save()
        console.log(save)
        res.status(200).json({ success: true, message: "Account Created Successfull" })
    } catch (error) {
        console.log(error)
    }
}

// display dean
const displayDean = async (req, res) => {
    try {
        const getDean = await User.find({ role: { $in: ['dean', 'president'] } });

        if (getDean.length > 0) {
            // console.log(getDean)
            res.json(getDean)
        }
    } catch (error) {
        console.log(error)
    }
}

// edit dean
const editDean = async (req, res) => {
    const { deanEmail, deanPassword, departmentName, deanName, deanDesignation, accRole } = req.body
    const { id } = req.params

    console.log(deanEmail, deanPassword, departmentName, deanName, deanDesignation, id, accRole)


    try {
        const findDean = await User.findById(id)

        if (findDean) {
            const updateDean = await User.findByIdAndUpdate(findDean._id, { email: deanEmail, password: deanPassword, department: departmentName, name: deanName, designation: deanDesignation, role: accRole })
            if (updateDean) {
                res.json({ message: 'Dean Updated Successfull ' })
            }
        }
    } catch (error) {
        console.log(error)
    }
}
// del dean
const deleteDean = async (req, res) => {
    const { id } = req.params

    try {
        const deleDean = await User.findByIdAndDelete(id)

        if (deleDean) {
            res.json({ message: 'Dean Deleted Successfull' })
        }
    } catch (error) {
        console.log(error)
    }
}


// update profile
const updateProfile = async (req, res) => {
    const { id } = req.params
    const {
        userEmail,
        role,
        gender,
        department,
        designation,
        phoneNumber } = req.body



    try {
        const up = await User.findByIdAndUpdate(id, {
            ...(req.file && {
                profileImage: {
                    data: req.file.buffer,
                    contentType: req.file.mimetype,
                },
            }),
            email: userEmail,
            role,
            gender,
            department,
            designation,
            phoneNumber,
        }, { new: true }); // Optional: Returns the updated document


        if (up) {
            console.log(up)
            res.json({ message: 'Profile Updated Successfull' })
        }
    } catch (error) {
        console.log(error)
    }

    // console.log(
    //     id, userEmail,
    //     role,
    //     gender,
    //     department,
    //     designation,
    // phoneNumber)

    const file = req.file;

    console.log(file)


}

const displayAdmins = async (req, res) => {

    try {
        const getAdmins = await User.find({ role: 'admin' })

        if (getAdmins.length > 0) {
            res.json(getAdmins)
            console.log(getAdmins)
        }
    } catch (error) {
        console.log(error)
    }




}

const loginAdmin = async (req, res) => {
    const { email, password } = req.body
    console.log(email, password)
    try {
        const findEmail = await User.findOne({ email })

        // console.log(findEmail)





        if (!findEmail) {
            res.status(404).json({ success: false, message: "Incorrect Email or Password" })
            return
        }

        if (findEmail.role !== 'admin' && findEmail.role !== 'dean' && findEmail.role !== 'president') {
            res.status(404).json({ success: false, message: "You are unable to Login" });
            return;
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
            text: `Hello, 

We received a request to reset your password. Please use the One-Time Password (OTP) below to proceed with your password change:

OTP: ${otp}

This OTP is valid for 5 minutes. If you did not request this change, please ignore this email or contact support immediately.`,
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
            return res.status(404).json({ success: false, message: 'Incorrect Email or Password' })
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

// get users data
const getUsers = async (req, res) => {
    try {
        const getUsers = await User.find({ role: { $in: ['requester'] } }).lean()

        if (getUsers.length === 0) {
            res.json({ message: "No Users Found" })
        }
        const users = getUsers.map(user => {
            return {
                ...user,
                dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : ''
            }
        })
        console.log(users)
        res.json({ message: "Users Retrieve Success", users })
    } catch (error) {
        console.log(error)
    }
}

// update user's role
const updateUserRole = async (req, res) => {
    const { id } = req.params
    const { role } = req.body
    console.log(id, role)
    try {
        await User.findByIdAndUpdate(id, { role }, { new: true })
        res.json({ message: 'Role Updated Successfull' })
    } catch (error) {
        console.log(error)
    }
}

// delete user
const delUser = async (req, res) => {
    const { id } = req.params
    console.log(id)
    try {
        await User.findByIdAndDelete(id)
        res.json({ message: 'User Deleted Successfull' })
    } catch (error) {
        console.log(error)
    }
}

// requester register
const requesterRegister = async (req, res) => {
    const { email, password, gender, department, phoneNumber, designation, dateOfBirth } = req.body

    console.log(email, password, gender, department, phoneNumber, designation, dateOfBirth)
    try {
        const reqRegister = new User({ email, password, gender, department, phoneNumber, designation, dateOfBirth, role: 'requester' })
        await reqRegister.save()

        res.json({ message: 'Account Created Successfull' })
    } catch (error) {
        console.log(error)
    }
}

// requester login
const requesterLogin = async (req, res) => {
    const { email, password } = req.body
    // console.log(email, password)
    try {
        const findEmail = await User.findOne({ email })

        if (!findEmail) {
            res.status(404).json({ success: false, message: "Incorrect Email or Password" })
            return
        }


        if (findEmail.password !== password) {
            // console.log(findEmail.password === password)
            res.status(404).json({ success: false, message: "Incorrect Email or Password" })
            return
        }

        if (findEmail.role !== 'requester') {
            res.status(404).json({ success: false, message: "You are unable to login" })
            return
        }

        const payload = { id: findEmail._id, email: findEmail.email, role: findEmail.role }
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

module.exports = {
    createAdmin, loginAdmin, forgotPassword, logout,
    sendOtp, verifyOtp, changePassword, getUsers, updateUserRole, delUser, createDean, displayDean,
    editDean, deleteDean, requesterRegister, requesterLogin, updateProfile,displayAdmins
}