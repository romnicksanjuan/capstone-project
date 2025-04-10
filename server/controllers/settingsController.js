const User = require('../model/user.js')

const settings = async (req, res) => {
    const user = req.user

    // console.log("testttttttt",user)
    try {
        const findUser = await User.findById(user.id).lean()

        console.log('finddddddddddddddddd', findUser)

        if ((!findUser)) {
            res.status(404).json({ success: false, message: 'error' })
            return
        }

        const formattedDateOfBirth = findUser.dateOfBirth.toLocaleDateString("en-US", { timeZone: 'Asia/Manila', day: 'numeric', month: 'long', year: 'numeric' })

        const result = {
            ...findUser,
            dateOfBirth: formattedDateOfBirth
        }

        res.status(200).json({ success: true, message: 'success', user: result })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { settings }