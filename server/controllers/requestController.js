const Request = require('../model/request.js');
// const Notification = require('../models/Notification');
const User = require('../model/user.js');
const Approval = require('../model/approval.js')
const nodemailer = require('nodemailer')
const { message } = require('./emailMessage.js')

const submitRequest = async (req, res) => {
    const { department, purpose, date, isFabrication, isRepair, isReplacement, isAdditional,
        quantity_and_materials, others,
        requestedBy, toLocation } = req.body;

    console.log(department, purpose, date, isFabrication, isRepair, isReplacement, isAdditional,
        quantity_and_materials, others,
        requestedBy)
    console.log(req.user)

    const findU = await User.findById(req.user.id)

    const newRequest = new Request({
        requester: new Object(req.user.id),
        requesterData: findU,
        department,
        purpose, date, isFabrication, isRepair, isReplacement, isAdditional,
        quantity_and_materials,
        requestedBy,
        toLocation
        // status: 'pending'
    });

    await newRequest.save()

    // Notify the Dean
    // const dean = await User.findOne({ role: 'dean' });
    // if (dean) {
    //     await Notification.create({
    //         user: dean._id,
    //         message: `New request pending your approval: "${title}"`
    //     });
    // }

    res.status(201).json({ success: true, message: "Request Submitted Successfull" });
};

// display-requested
const displayRequested = async (req, res) => {
    const user = req.user
    // console.log('user:', user)

    // return
    try {
        const findUser = await User.findOne({ _id: user.id, email: user.email, })
        // console.log('find user:', findUser)
        // return
        if (findUser.role === "requester") {
            // const getRequested = await Request.find({ requester: findUser._id, })
            const getRequested = await Request.find({ requester: findUser._id, }).sort({ createdAt: -1, });
            res.status(200).json({ requestData: getRequested })
        } else if (findUser.role === "dean") {
            const getRequested = await Request.find({ deanApproval: 'pending', department: findUser.department }).sort({ createdAt: -1, });
            // console.log('getRequested:', getRequested)
            res.status(200).json({ requestData: getRequested })
        } else if (findUser.role === "president") {
            const getRequested = await Request.find({ deanApproval: 'approved', presidentApproval: 'pending' }).sort({ createdAt: -1, });
            console.log('getRequested:', getRequested)
            res.status(200).json({ requestData: getRequested })
        } else if (findUser.role === "admin") {
            const getRequested = await Request.find({}).sort({ createdAt: -1, });
            res.status(200).json({ requestData: getRequested })
        }
    } catch (error) {
        console.log(error)
    }
}
// approval
const decisionButton = async (req, res) => {
    const user = req.user
    const { decision, requestId } = req.body
    // console.log(decision)
    // console.log(requestId)
    // console.log('user:',user)
    // return
    try {
        const approver = await User.findOne({ _id: user.id, email: user.email })
        // console.log("approver : ", approver)

        if (approver.role === "dean") {
            const update = await Request.findByIdAndUpdate(requestId, { deanApproval: decision, endorsedBy: approver.name })

            if (update) {
                await Approval.create({
                    request: new Object(requestId),
                    approver: new Object(approver._id),
                    role: approver.role,
                    status: decision,
                    approvedAt: new Date()
                })

                return res.status(200).json({ message: 'Your Response has been received successfully' })
            } else {
                return res.status(400).json({ message: 'Request update failed.' })
            }
        } else if (approver.role === "president") {
            const update = await Request.findByIdAndUpdate(requestId, { presidentApproval: decision })

            if (update) {
                return res.status(200).json({ message: 'Your Response has been received successfully' })
            } else {
                return res.status(400).json({ message: 'Request update failed.' })
            }
        } else {
            return res.status(403).json({ message: 'Unauthorized: User is neither a dean nor president.' })
        }

    } catch (error) {
        console.log(error)
    }
}

// request count
const requestCount = async (req, res) => {
    const user = req.user
    // console.log('user:', user)
    try {

        const findUser = await User.findOne({ _id: user.id, email: user.email, role: user.role, })

        // console.log('find user:', findUser)
        if (findUser.role === 'dean') {
            const getRequestedCount = await Request.countDocuments({ deanApproval: 'pending' })
            res.status(200).json({ requestCountDocument: getRequestedCount })
            return
        } else if (findUser.role === 'president') {
            const getRequestedCount = await Request.countDocuments({ deanApproval: 'approved', presidentApproval: 'pending' })
            res.status(200).json({ requestCountDocument: getRequestedCount })
            return
        }

        res.json({ requestCountDocument: 0 })

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

const sendEmail = async (email, message) => {
    try {
        const mailOptions = {
            from: "romnicksanjuan22@gmail.com",
            to: email,
            subject: "Request Update",
            text: message,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error.message)
                return
            };
            res.status(200).json({ message: "email sent!" });
        });

    } catch (error) {
        console.log(error)
    }
}

const editStatus = async (req, res) => {
    const { id } = req.params
    const { status } = req.body
    console.log(id)
    try {
        const updateStatus = await Request.findById(id)
        updateStatus.status = status
        updateStatus.save()

        const findUser = await User.findById(updateStatus.requester)

        // console.log('f', findUser)
        const mes = message(status)

        console.log(mes)
        await sendEmail(findUser.email, mes)

    } catch (error) {
        console.log(error)
    }
}

// request summary
const getRequestSummaray = async (req, res) => {

    try {

        const getReq = await Request.find()

        if (getReq.length > 0) {
            res.json(getReq)
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = { submitRequest, displayRequested, decisionButton, requestCount, editStatus, getRequestSummaray }
