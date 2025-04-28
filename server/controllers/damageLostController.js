// const Item = require('../model/Item.js')
const damage_lost = require('../model/damage_lost')
const borrowedItems = require('../model/borrowItem.js')

const damagLost = async (req, res) => {
    // console.log('test')
    const { id } = req.params
    const { issue, remarks, dateReported, quantity, actionTaken } = req.body

    console.log(issue, remarks, dateReported, quantity, actionTaken, id)

    try {
        const findBorrow = await borrowedItems.findById(id)


        console.log(findBorrow)
        // return
        if (findBorrow) {

            console.log(findBorrow)

            const damage_llost = new damage_lost({ itemDescription: findBorrow.item[0].itemDescription, issue, remarks, dateReported, quantity, actionTaken })
            await damage_llost.save()
            findBorrow.action = issue
            findBorrow.save()
            res.json({ message: 'Report Submmited Successfull' })
        }


    } catch (error) {
        console.log(error)
    }
}


// get damage lost
const getDamageLost = async (req, res) => {


    try {
        const get = await damage_lost.find().lean()
        console.log(get)


        if (get.length > 0) {
            const result = get.map(i => {
                return {
                    ...i,
                    dateReported: new Date(i.dateReported).toLocaleDateString('en-US', { timeZone: 'Asia/Manila', day: 'numeric', month: 'long', year: 'numeric' })
                }
            })
            res.json(result)
        }

    } catch (error) {
        console.log(error)
    }
}




module.exports = { damagLost, getDamageLost }