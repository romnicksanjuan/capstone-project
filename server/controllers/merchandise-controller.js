const merchandise = require('../model/merchandise.js')
const Merchandise = require('../model/merchandise.js')
const purchaseHistoryModel = require('../model/purchase_history.js')

const createProduct = async (req, res) => {
    const { name, price, stock, size_and_quantity } = req.body

    const parsedSizesAndQuantity = JSON.parse(size_and_quantity);

    // console.log("size_and_quantity:", parsedSizesAndQuantity)

    // return

    const newProduct = new Merchandise({
        name,
        price,
        stock,
        image: {
            data: req.file.buffer,
            contentType: req.file.mimetype
        },
        size_and_stock: parsedSizesAndQuantity
    })

    const save = await newProduct.save()
    // console.log(save)
    res.json(save)
}

const getMerchandise = async (req, res) => {
    // console.log("decoded:", req.admin)
    try {
        const getItems = await Merchandise.find({})

        const items = getItems.map((item) => {
            const base64Image = item.image.data.toString('base64');
            const image = `data:${item.image.contentType};base64,${base64Image}`
            return {
                _id: item._id,
                name: item.name,
                price: item.price,
                image: {
                    data: image,
                    contentType: item.image.contentType
                },
                stock: item.stock,
                size_and_quantity: item.size_and_stock
            }
        })
        // console.log(items)
        res.json(items)
    } catch (error) {
        console.log(error)
    }
}

const deleteMerchandise = async (req, res) => {
    try {
        const id = req.params.id
        // console.log(req.params.id)
        const deleteitem = await Merchandise.findByIdAndDelete({ _id: id })
        if (!deleteitem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Item deleted successfully', item: deleteitem })
    } catch (error) {
        console.log(error)
    }
}

const editMerchandise = async (req, res) => {
    const { name, price, stock, size_and_quantity } = req.body
    const { id } = req.params

    console.log("size_and_quantity", size_and_quantity)
    console.log(id)
    try {
        const edit = await Merchandise.findByIdAndUpdate({ _id: id }, { name, price, stock, size_and_stock: size_and_quantity })
        // console.log(edit)
        res.json('Merchandise Update Successfully')
    } catch (error) {
        console.log(error)
    }
}

const purchaseHistory = async (req, res) => {
    const { fullname, program, size, quantity } = req.body
    const { id } = req.params

    try {

        const finditem = await Merchandise.findOne({ _id: id })

        if (!finditem) {
            console.log('item not found')
        }

        const newPurchaseHistory = new purchaseHistoryModel({
            merchandise: finditem,
            fullname: fullname,
            program: program,
            size: size,
            quantity: quantity
        })



        const result = finditem.size_and_stock.find(s => s.size === size)
        console.log("res", result)
        if (result.quantity < quantity) {
            return res.status(400).json({ success: false, message: "Insufficient stock" })
        }
        const save = await newPurchaseHistory.save()
        result.quantity -= quantity
        await finditem.save()
        console.log(save)
        res.status(200).json({ message: "success purchase" })
    } catch (error) {
        console.log(error)
    }
}

const getAllPurchaseHistory = async (req, res) => {
    try {
        const getAll = await purchaseHistoryModel.find({}).lean()
        console.log(getAll)

        if (!getAll) {
            console.log('no purchase history')
            return;
        }
        // console.log(getAll)
        const items = getAll.map((item) => {
            const base64Image = item.merchandise.image.data.toString('base64');
            const image = `data:${item.merchandise.image.contentType};base64,${base64Image}`


            return {
                ...item,
                image: {
                    data: image
                },
                purchaseDate: item.createdAt.toLocaleDateString('en-US')
            }
        })

        console.log(items)
        res.status(200).json(items)
    } catch (error) {
        console.log(error)
    }
}

const totalMerchandise = async (req, res) => {
    try {
        const total = await Merchandise.countDocuments()

        if (total >= 0) {
            res.json(total)
        }


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
    console.log("moths:", months)
    return months
}


const barGraphMerchandise = async (req, res) => {
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
            const bar = await purchaseHistoryModel.find({ createdAt: { $gte: month, $lt: end } })

            return {
                month: month.toLocaleDateString("en-US", { month: "long" }),
                count: bar.length || 0,
                data: bar
            }
        }))
        // console.log(monthlyData)

        // const barGraph = await Item.find({ createdAt: { $lt: dtae } })
        console.log("monthlydata merchandise", (await monthlyData).map(m => m))
        res.json({ success: true, message: "Data Retrieve Successful", monthlyData: (await monthlyData).map(m => m) })
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    createProduct, getMerchandise, purchaseHistory,
    getAllPurchaseHistory, deleteMerchandise, editMerchandise,
    totalMerchandise, barGraphMerchandise
}