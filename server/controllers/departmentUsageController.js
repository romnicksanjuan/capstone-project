const departmentUsageReport = require('../model/departmentUsageReport.js')
const Inventory = require('../model/inventory.js')

const getDepartmentReport = async (req, res) => {
    try {
        const getUsage = await departmentUsageReport.aggregate([
            {
                $group: {
                    _id: "$PMSNumber", // Fix: group by _id
                    department: { $first: "$department" },
                    totalIssued: { $sum: "$totalIssued" }
                }
            }
        ])

        console.log('getUsage:', getUsage)

        if (getUsage.length > 0) {
            // console.log(getUsage.length)

            const result = await Promise.all(getUsage.map(async (department) => {
                const findByPMSNumber = await Inventory.findOne({ PMSNumber: department._id })
                // console.log('findByPMSNumber',findByPMSNumber)

                return {
                    ...department,
                    itemDescription: findByPMSNumber.itemDescription
                }
            }))

            console.log('result', result)
            res.json(result) // ✅ Send the result to frontend

        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' }) // Optional: send error response
    }
}

module.exports = { getDepartmentReport }
