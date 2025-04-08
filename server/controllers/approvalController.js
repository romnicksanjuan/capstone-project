const Request = require('../model/request.js')

const approveByDean = async (req, res) => {
    const { requestId, deanId } = req.body;

    const request = await Request.findByIdAndUpdate(requestId, {
        status: 'approved_by_dean'
    });

    // Create approval entry
    await Approval.create({
        request: requestId,
        approver: deanId,
        role: 'dean',
        status: 'approved',
        approvedAt: new Date()
    });

    // Notify the President
    const president = await User.findOne({ role: 'president' });
    if (president) {
        await Notification.create({
            user: president._id,
            message: `Dean approved request "${request.title}". Your approval is needed.`
        });
    }

    res.status(200).json({ message: 'Approved by Dean' });
};

const approveByPresident = async (req, res) => {
    const { requestId, presidentId } = req.body;

    const request = await Request.findByIdAndUpdate(requestId, {
        status: 'approved_by_president'
    });

    // Create approval entry
    await Approval.create({
        request: requestId,
        approver: presidentId,
        role: 'president',
        status: 'approved',
        approvedAt: new Date()
    });

    // Notify the Admin
    const admin = await User.findOne({ role: 'admin' });
    if (admin) {
        await Notification.create({
            user: admin._id,
            message: `President approved request "${request.title}". Please proceed with processing.`
        });
    }

    res.status(200).json({ message: 'Approved by President' });
};

module.exports = { approveByDean, approveByPresident }