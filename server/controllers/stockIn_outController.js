const stockIn_Out = require('../model/stockIn_out')

const stockIn = async (req, res) => {


    try {
        const getStockInOut = await stockIn_Out.find().lean()
        if (getStockInOut.length > 0) {
            // console.log('sdsdsd',getStockInOut)

            const result = getStockInOut.map(s => {
                return {
                    ...s,
                    date: new Date(s.date).toLocaleDateString('en-US', { timeZone: 'Asia/Manila', day: 'numeric', month: 'long', year: 'numeric' })
                }
            })
            res.json(result)
        }
    } catch (error) {
        console.log(error)
    }
}


module.exports = { stockIn }