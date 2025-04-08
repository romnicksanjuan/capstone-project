const borrowItem = require('../model/borrowItem.js');
const Item = require('../model/Item.js')
const QRCode = require("qrcode");
const Category = require('../model/category.js');
const AccessoryType = require('../model/item_type_model.js')


const createItem = async (req, res) => {
    const { serialNumber, serialItem, unit, brand, category, condition, location, status, accessory_type } = req.body;

    const fontend_link = `https://capstone-project-sand-gamma.vercel.app/borrow-form/${serialNumber}`
    const link = `http://localhost:3000/borrow-form/${serialNumber}`
    // console.log(unit)
    const qrImage = await QRCode.toDataURL(fontend_link);

    // Convert base64 to buffer
    const base64Data = qrImage.replace(/^data:image\/png;base64,/, ""); // Remove base64 header
    const qrBuffer = Buffer.from(base64Data, "base64");
    console.log(qrBuffer)

    const newItem = new Item({
        serialNumber, serialItem, unit, brand, category, condition, location, status, accessory_type, link: fontend_link, qr_code_image: {
            data: qrBuffer,
            contentType: 'image/png'
        }
    })


    try {
        const savedItem = await newItem.save();

        const items = await Item.find({});

        if (!items) {
            console.log('error')
            return;
        }

        const i = items.map((item) => {
            const base64Image = item.qr_code_image.data.toString('base64');
            const image = `data:${item.qr_code_image.contentType};base64,${base64Image}`
            return {
                item,
                qr_code_image: {
                    data: image,
                    contentType: item.qr_code_image.contentType
                },
                dateAdded: item.dateAdded.toLocaleDateString('en-US')
            }
        })

        res.status(201).json({ success: true, savedItem, items: i });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const fetchItems = async (req, res) => {
    // console.log("decoded:", req.admin)
    try {
        const items = await Item.find({});
        const totalCounts = await Item.countDocuments()
        // console.log(items)

        if (!items) {
            console.log('error')
            return;
        }

        const i = items.map((item) => {
            const base64Image = item.qr_code_image.data.toString('base64');
            const image = `data:${item.qr_code_image.contentType};base64,${base64Image}`
            return {
                item,
                qr_code_image: {
                    data: image,
                    contentType: item.qr_code_image.contentType
                },
                dateAdded: item.dateAdded.toLocaleDateString('en-US')
            }
        })

        // console.log("i", i)
        res.status(200).json({ items: i, totalCounts: totalCounts });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const editITem = async (req, res) => {
    const { id } = req.params;
    const { serialItem, unit, brand, category, condition, location, status, accessory_type } = req.body;
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            id,
            { serialItem, unit, brand, category, condition, location, status, accessory_type },
            { new: true } // Return the updated item after the change
        );

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json(updatedItem);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

const deleteitem = async (req, res) => {
    const { id } = req.params

    try {
        const deleteById = await Item.findByIdAndDelete(id)

        if (!deleteById) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Item deleted successfully', item: deleteById })
    } catch (error) {
        console.log(error)
    }
}

// total items 
const totalItems = async (req, res) => {
    try {
        const totalQuantity = await Item.countDocuments({});

        const total = totalQuantity > 0 ? totalQuantity : 0;
        res.status(200).json({ total });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

const searchItem = async (req, res) => {
    const { query } = req.query

    const search = await Item.find({ unit: { $regex: query, $options: 'i' } })

    console.log(search)



    const items = search.map((item) => {
        const base64Image = item.qr_code_image.data.toString('base64');
        const image = `data:${item.qr_code_image.contentType};base64,${base64Image}`
        return {
            item,
            qr_code_image: {
                data: image,
                contentType: item.qr_code_image.contentType
            },
            dateAdded: item.dateAdded.toLocaleDateString('en-US')
        }
    })

    if (!search) {
        return res.json({ message: 'Item Not Found' })
    }

    res.json({ items: items })
}

// property page
const propertyPage = async (req, res) => {
    const { sn } = req.params
    console.log(sn)
    try {
        const item = await Item.findOne({ serialNumber: sn })
        if (!item) {
            res.status(404).json("item not found")
            return;
        }
        res.status(200).json(item)
    } catch (error) {
        console.log(error)
    }
}


// get months
const getMonths = () => {
    const year = 2025;
    const currentMonth = new Date().getMonth() + 1; // Current month index (0-11)

    let months = [];

    for (let month = 0; month < currentMonth; month++) {
        months.push(new Date(year, month, 1)); // Push start of each month
    }
    // console.log("moths:", months)
    return months
}


const barGraph = async (req, res) => {
    try {
        const months = getMonths()
        // const monthlyData = []

        // for (let month = 0; month < months.length; month++) {
        //     const start = months[month]
        //     const barGraph = await Item.find({ createdAt: { $gte:  start , }})

        //     monthlyData.push({
        //         month: start.toLocaleDateString("en-US", {month: "long"}),
        //         count: barGraph.length,
        //         data: barGraph
        //     }) 
        // }

        const monthlyData = Promise.all(months.map(async (month, index) => {
            const end = index + 1 < months.length ? months[index + 1] : new Date(2025, new Date().getMonth() + 1, 1);
            const bar = await borrowItem.find({ createdAt: { $gte: month, $lt: end } })

            return {
                month: month.toLocaleDateString("en-US", { month: "long" }),
                count: bar.length,
                data: bar
            }
        }))
        // console.log(monthlyData)

        // const barGraph = await Item.find({ createdAt: { $lt: dtae } })
        // console.log("monthlydata", (await monthly).map(m => m))
        res.json({ success: true, message: "Data Retrieve Successful", monthlyData: (await monthlyData).map(m => m) })
    } catch (error) {
        console.log(error)
    }
}

// check token
const checkToken = (req, res) => {
    const decoded = req.user
    console.log('decoded:', decoded)
    res.json({ success: true, message: 'token is valid', user: decoded })
}


// add new category
const newCategoryFunction = async (req, res) => {
    const { newCategory } = req.body
    // console.log(newCategory)

    try {
        const addCategory = new Category({ category: newCategory })
        await addCategory.save()

        const find = await Category.find({})

        res.status(200).json({ success: true, message: "Category Added Successfull", categories: find })
    } catch (error) {
        console.log(error)
    }
}

const displayCategories = async (req, res) => {
    try {
        const fetchCategories = await Category.find({})
        if (fetchCategories.length !== 0) {
            res.json({ success: true, message: "Categories Fetch Successfull", categories: fetchCategories })
        }

    } catch (error) {
        console.log(error)
    }
}

const deleteCategory = async (req, res) => {
    const { id } = req.params
    try {
        const delCategory = await Category.findByIdAndDelete(id)

        res.status(200).json({ success: true, message: "Category Deleted Successful" })
    } catch (error) {
        console.log(error)
    }
}


// get accessory type
const getAccessoryFunction = async (req, res) => {
    try {
        const type = await AccessoryType.find({})

        if (type.length !== 0) {
            res.status(200).json({ success: true, message: "Accessory Type Fetch Successfull", type: type })
            return
        }
    } catch (error) {
        console.log(error)
    }
}

// create Accessory type
const createAccessoryType = async (req, res) => {
    const { type } = req.body
    try {

        if (!type) {
            res.status(400).json({ success: false, message: "Failed to Create Accessory Type" })
            return
        }

        const newType = new AccessoryType({ type })
        await newType.save()

        const findAccessoryType = await AccessoryType.find({})

        res.status(200).json({ success: true, message: "Accessory Type Created Successfull", type: findAccessoryType })
    } catch (error) {
        console.log(error)
    }
}

const deleteAccessoryType = async (req, res) => {
    const { id } = req.params
    try {
        const accessory = await AccessoryType.findByIdAndDelete(id)

        res.status(200).json({ success: true, message: "Accessory Type Deleted Successful" })
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    createItem, fetchItems, barGraph, editITem, deleteitem, totalItems, searchItem, propertyPage, checkToken,
    newCategoryFunction, displayCategories, deleteCategory, getAccessoryFunction, createAccessoryType, deleteAccessoryType
}