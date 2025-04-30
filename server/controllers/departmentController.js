const Department = require('../model/department')


const createDepartment = async (req, res) => {
    const { department } = req.body
    console.log(department)
    try {
        const newDep = new Department({ department })
        await newDep.save()
        console.log(newDep)

        if (!newDep) {
            return res.status(400).json({ message: '' })
        }

        res.json({ message: 'Department Created Successfull' })
    } catch (error) {
        console.log(error)
    }
}

const getDepartment = async (req, res) => {
    const { department } = req.body
    console.log(department)
    try {
        const getDep = await Department.find()

        if (getDep.length > 0) {
            res.json(getDep)
        }
    } catch (error) {
        console.log(error)
    }
}

const delDep = async (req, res) => {
    const { id } = req.params
    console.log(id)
    try {
        const del = await Department.findByIdAndDelete(id)

        if (del) {
            res.json({ message: 'Department Deleted Successfull' })
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports = { createDepartment, getDepartment,delDep }