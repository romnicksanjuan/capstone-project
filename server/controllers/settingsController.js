const User = require('../model/user.js')

const settings = async (req, res) => {
    const user = req.user

    // console.log("testttttttt",user)
    try {
        const find = await User.findById(user.id)

        console.log('finddddddddddddddddd', find)

        if ((!find)) {
            res.status(404).json({ success: false, message: 'error' })
            return
        }

        res.status(200).json({ success: true, message: 'success', user: find })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { settings }