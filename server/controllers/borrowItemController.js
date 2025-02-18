const { default: mongoose } = require('mongoose')
const borrowItem = require('../model/borrowItem')
const Item = require('../model/Item.js')

const addBorrowItem = async (req, res) => {
    const { serialNumber, borrower, mobileNumber, purpose } = req.body

    const checkSerial = await Item.findOne({ serialNumber })



    try {
        if (!checkSerial) {
            return res.status(404).json({ message: 'Item not found' })
        }

        console.log(checkSerial._id)
        const newBorrow = new borrowItem({ unitId: new mongoose.Types.ObjectId(checkSerial._id), serialNumber, borrower, mobileNumber, purpose })

        const saveBorrowItem = newBorrow.save()
        console.log(newBorrow)
        res.status(200).json(saveBorrowItem)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


const fetchBorrowedItems = async (req, res) => {
    try {
        const fetch = await borrowItem.find({ action: 'Borrowed' }).populate('unitId')

        console.log(fetch)

        if (!fetch) {
            res.json('No Borrowed Item')
            return
        }

        const borrowData = fetch.map((item) => {
            return {
                _id: item._id,
                serialNumber: item.unitId.serialNumber,
                unit: item.unitId.unit,
                brand: item.unitId.brand,
                borrower: item.borrower,
                mobileNumber: item.mobileNumber,
                purpose: item.purpose,
                status: item.unitId.status,
                dateBorrowed: item.dateBorrowed.toLocaleDateString('en-US'),
                dateReturned: item.dateReturned,
                action: item.action
            }
        })

        res.status(200).json(borrowData)
    } catch (error) {
        console.log(error)
    }
}
// total borrowed items
const totalBorrowedItems = async (req, res) => {
    try {
        const totalBorrowed = await borrowItem.countDocuments({ action: 'Borrowed' })

        // console.log(totalBorrowed)
        res.status(200).json(totalBorrowed)
    } catch (error) {
        console.log(error)
    }
}

const returnItem = async (req, res) => {
    const { id } = req.params;

    try {
        const updateTransaction = await borrowItem.findById(id)

        if (!updateTransaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        updateTransaction.dateReturned = new Date()
        updateTransaction.action = 'Returned'

        const saveUpdate = await updateTransaction.save()

        res.status(200).json({ message: 'item return successfully', saveUpdate })
    } catch (error) {
        console.log(error)
    }
}

const fetchHistory = async (req, res) => {
    try {
        const history = await borrowItem.find({ action: 'Returned' }).populate('unitId')

        const historyData = history.map((item) => {
            return {
                _id: item._id,
                serialNumber: item.unitId.serialNumber,
                unit: item.unitId.unit,
                brand: item.unitId.brand,
                borrower: item.borrower,
                mobileNumber: item.mobileNumber,
                purpose: item.purpose,
                status: item.unitId.status,
                dateBorrowed: item.dateBorrowed.toLocaleDateString('en-US'),
                dateReturned: item.dateReturned.toLocaleDateString('en-US'),
                action: item.action
            }
        })

        res.status(200).json(historyData)
    } catch (error) {
        console.log(error)
    }
}
module.exports = { addBorrowItem, fetchBorrowedItems, totalBorrowedItems, returnItem, fetchHistory }