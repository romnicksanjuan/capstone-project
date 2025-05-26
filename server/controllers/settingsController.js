const User = require('../model/user.js')
const Approval = require('../model/approval.js')
const BorrowItem = require('../model/borrowItem.js')
const Category = require('../model/category.js')
const DamageLost = require('../model/damage_lost.js')
const Department = require('../model/department.js')
const DepartmentUsageReport = require('../model/departmentUsageReport.js')
const Inventory = require('../model/inventory.js')
const ItemMovement = require('../model/item_movement.js')
const ItemTypeModel = require('../model/item_type_model.js')
const Merchandise = require('../model/merchandise.js')
const PurchaseHistory = require('../model/purchase_history.js')
const Request = require('../model/request.js')
// const StatusList = require('../model/status_list.js')
const StockInOut = require('../model/stockIn_out.js')


const settings = async (req, res) => {
    const user = req.user

    // console.log("testttttttt",user)
    try {
        const findUser = await User.findById(user.id).lean()

        // console.log('finddddddddddddddddd', findUser)

        if ((!findUser)) {
            res.status(404).json({ success: false, message: 'error' })
            return
        }

        // const formattedDateOfBirth = findUser.dateOfBirth.toLocaleDateString("en-US", { timeZone: 'Asia/Manila', day: 'numeric', month: 'long', year: 'numeric' })

        const result = {
            ...findUser,
            // dateOfBirth: formattedDateOfBirth
        }

        res.status(200).json({ success: true, message: 'success', user: result })
    } catch (error) {
        console.log(error)
    }
}

const exportData = async (req, res) => {
    // console.log('testtt')
    try {
        const user = await User.find();
        const approval = await Approval.find()
        const borrowItem = await BorrowItem.find()
        const category = await Category.find()
        const damageLost = await DamageLost.find()
        const department = await Department.find()
        const departmentUsageReport = await DepartmentUsageReport.find()
        const inventory = await Inventory.find()
        const itemMovement = await ItemMovement.find()
        const itemTypeModel = await ItemTypeModel.find()
        const manuallyerchandise = await Merchandise.find()
        // const notification = await Notification.find()
        const purchaseHistory = await PurchaseHistory.find()
        const request = await Request.find()
        // const status_list = await StatusList.find()
        const stockInOut = await StockInOut.find()



        // const BorrowItem = require('../model/borrowItem.js')
        // const Category = require('../model/category.js')
        // const DamageLost = require('../model/damage_lost.js')
        // const Department = require('../model/department.js')
        // const DepartmentUsageReport = require('../model/departmentUsageReport.js')
        // const Inventory = require('../model/inventory.js')
        // const ItemMovement = require('../model/item_movement.js')
        // const itemTypeModel = require('../model/item_type_model.js')
        // const Merchandise = require('../model/merchandise.js')
        // const Notification = require('../model/notification.js')
        // const PurchaseHistory = require('../model/purchase_history.js')
        // const Request = require('../model/request.js')
        // const StatusList = require('../model/status_list.js')
        // const StockInOut = require('../model/stockIn_out.js')

        const data = {
            user,
            approval, borrowItem,
            category,
            damageLost, department
            , departmentUsageReport,
            inventory,
            itemMovement,
            itemTypeModel,
            manuallyerchandise,
            purchaseHistory,
            request,
            // status_list,
            stockInOut
        };

        const json = JSON.stringify(data, null, 2);

        res.setHeader('Content-Disposition', 'attachment; filename=backup-data.json');
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(json);
    } catch (error) {
        console.error('Backup error:', error);
        res.status(500).json({ message: 'Failed to export data' });
    }
}

module.exports = { settings, exportData }