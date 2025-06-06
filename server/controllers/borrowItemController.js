const itemTransfer = require('../model/item_movement.js')
const borrowItem = require('../model/borrowItem')
const Item = require('../model/inventory.js')
const stockIn_Out = require('../model/stockIn_out')
const DepartmentUsage = require('../model/departmentUsageReport.js')


const addBorrowItem = async (req, res) => {
    const { PMSNumber, borrower, mobileNumber, purpose, department, borrowerDesignation, toLocation } = req.body
    console.log(PMSNumber, borrower, mobileNumber, purpose, department, borrowerDesignation, toLocation)
    // return
    // // return
    const checkSerial = await Item.find({ PMSNumber: PMSNumber.map(sn => sn.item) }).lean()

    //     console.log("checkSerial:", checkSerial)
    // return
    try {
        if (!checkSerial) {
            return res.status(404).json({ message: 'Item not found' })
        }

        const comparePMS = PMSNumber.map((item) => {
            const b = checkSerial.find(i => item.item === i.PMSNumber)
            if (!b) {
                return false
            }

            return true
        })

        if (comparePMS.includes(false)) {
            console.log('Some items were not found!');
            return res.status(404).json({ success: true, message: "Some items were not found!" })
        }

        // console.log(checkSerial.quantity)

        const updatedSerials = checkSerial.map(async (item) => {
            const findItem = PMSNumber.find(sn => sn.item === item.PMSNumber);
            if (!findItem) return null;

            console.log(`Updating serial ${item.PMSNumber}:`, findItem.quantity);

            await new stockIn_Out({
                date: new Date(),
                itemName: item.itemDescription,
                action: 'Stock Out',
                quantity: findItem.quantity
            }).save();

            await new DepartmentUsage({
                department: department,
                PMSNumber: findItem.item,
                totalIssued: findItem.quantity
            }).save();

            await new itemTransfer({ date: new Date(), item: item.itemDescription, fromLocation: item.location, toLocation: toLocation }).save()

            return Item.findOneAndUpdate(
                { PMSNumber: item.PMSNumber },  // Match serialNumber
                { quantity: item.quantity - findItem.quantity }, // Subtract quantity
                { new: true, upsert: false }  // Ensure it returns the updated document
            );
        })

        console.log('Updated serials:', updatedSerials);

        const newBorrow = new borrowItem({
            item: checkSerial,
            PMSNumber: PMSNumber.map((item) => {
                const b = checkSerial.find(i => item.item === i.PMSNumber)

                console.log('b', b)
                return {
                    item: b.PMSNumber,
                    quantity: item.quantity,
                    itemDescription: b.itemDescription,
                    brand: b.brand
                }
            }),
            borrower, mobileNumber, purpose,
            department, borrower_designation: borrowerDesignation,
            status_before: 'Working',
            // quantity
        })
        await newBorrow.save()

        // await new stockIn_Out({
        //     date: new Date(),
        //     itemName: findItem.unit,
        //     action: 'Stock Out',
        //     quantity: item.quantity
        // }).save();
        res.status(200).json({ success: true, message: "Borrow Transaction Successfull" })
    } catch (error) {
        // res.status(400).json({ message: error.message });
        console.log(error)
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
    const { condition } = req.body

    // console.log("status:", condition, id)

    // return

    try {
        const updateTransaction = await borrowItem.findById(id)

        const updateItem = await Item.find({ PMSNumber: updateTransaction.PMSNumber.map(sn => sn.item) }).lean()

        // console.log('u',updateItem)
        // return
        if (!updateTransaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        // update borrow
        updateTransaction.dateReturned = new Date()
        updateTransaction.action = 'Returned'
        updateTransaction.status_after = condition

        // update item
        // updateItem.condition = condition
        // updateItem.save()

        updateItem.map(async (i) => {
            return Item.updateOne(
                { _id: i._id }, // Assuming you're using _id to find the document
                { condition: condition }
            );
        })

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
        // console.log('sdsd', history)
        const historyData = history.map((item) => {

            // Check if item is successfully processed
            console.log('Processed item:', item);
            return {
                ...item,
                dateBorrowed: new Date(item.dateBorrowed).toLocaleDateString('en-US', { timeZone: 'Asia/Manila', day: 'numeric', month: 'long', year: 'numeric' }),
                dateReturned: new Date(item.dateReturned).toLocaleDateString('en-US', { timeZone: 'Asia/Manila', day: 'numeric', month: 'long', year: 'numeric' })
            };
        })


        // console.log("data history: ", historyData.map(h => h))
        res.status(200).json(historyData)
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    addBorrowItem, fetchBorrowedItems, totalBorrowedItems, returnItem, fetchHistory,

}