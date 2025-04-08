const Request = require('../model/request.js');
// const Notification = require('../models/Notification');
const User = require('../model/user.js');

const submitRequest = async (req, res) => {
    const { requesterId, title, description } = req.body;

    const newRequest = await Request.create({
        requester: requesterId,
        title,
        description,
        status: 'pending'
    });

    // Notify the Dean
    const dean = await User.findOne({ role: 'dean' });
    if (dean) {
        await Notification.create({
            user: dean._id,
            message: `New request pending your approval: "${title}"`
        });
    }

    res.status(201).json(newRequest);
};

module.exports = { submitRequest }
