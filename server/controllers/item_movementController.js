const itemTransfer = require('../model/item_movement.js')


const getItemTransfer = async (req, res) => {

    try {
        const getItem = await itemTransfer.find({}).lean()

        if (getItem.length > 0) {
            const result = getItem.map(i => {
                return {
                    ...i,
                    date: new Date(i.date).toLocaleDateString('en-US', { timeZone: 'Asia/Manila', day: 'numeric', month: 'long', year: 'numeric' })
                }
            })
            // console.log(result)
            res.json(result)
        }


    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    getItemTransfer
}