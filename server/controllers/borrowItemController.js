
const borrowItem = require('../model/borrowItem')
const Item = require('../model/Item.js')

const addBorrowItem = async (req, res) => {
    const { serialNumber, borrower, mobileNumber, purpose, department, borrowerDesignation } = req.body

    const checkSerial = await Item.findOne({ serialNumber })

    console.log("checkSerial:", checkSerial.status)

    try {
        if (!checkSerial) {
            return res.status(404).json({ message: 'Item not found' })
        }

        console.log(checkSerial._id)
        const newBorrow = new borrowItem({
            item: checkSerial, serialNumber, borrower, mobileNumber, purpose,
            department, borrower_designation: borrowerDesignation,
            status_before: checkSerial.status
        })

        await newBorrow.save()
        // console.log(newBorrow)
        res.status(200).json({ success: true, message: "Borrow Transaction Successfull" })
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


const fetchBorrowedItems = async (req, res) => {
    try {
        const fetch = await borrowItem.find({ action: 'Borrowed' }).lean()

        // console.log(fetch)

        if (!fetch) {
            res.json('No Borrowed Item')
            return
        }

        const borrowData = fetch.map((item) => {
            return {
                ...item,
                dateBorrowed: item.dateBorrowed.toLocaleDateString('en-US'),
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
    const { status } = req.body

    console.log("status:", status)

    try {
        const updateTransaction = await borrowItem.findById(id)
        const updateItem = await Item.findOne({ serialNumber: updateTransaction.serialNumber })



        if (!updateTransaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        // update borrow
        updateTransaction.dateReturned = new Date()
        updateTransaction.action = 'Returned'
        updateTransaction.status_after = status

        // update item
        updateItem.status = status
        updateItem.save()

        const saveUpdate = await updateTransaction.save()

        res.status(200).json({ message: 'item return successfully', saveUpdate })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
}

const fetchHistory = async (req, res) => {
    try {
        const history = await borrowItem.find({ action: 'Returned' }).lean()

        const historyData = await Promise.all(history.map(async (item) => {

            const findItem = await Item.findById(item.unitId)

            return {
                ...item,
                dateBorrowed: item.dateBorrowed.toLocaleDateString('en-US'),
                dateReturned: item.dateReturned.toLocaleDateString('en-US')
            }
        }))

        // console.log("data history: ", historyData)
        res.status(200).json(historyData)
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    addBorrowItem, fetchBorrowedItems, totalBorrowedItems, returnItem, fetchHistory,

}