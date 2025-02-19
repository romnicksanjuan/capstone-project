const Merchandise = require('../model/merchandise.js')
const purchaseHistoryModel = require('../model/purchase_history.js')

const createProduct = async(req, res) => {
    const { name, price, stock } = req.body

    const newProduct = new Merchandise({
        name,
        price,
        stock,
        image: {
            data: req.file.buffer,
            contentType: req.file.mimetype
        }
    })

    const save = await newProduct.save()
    // console.log(save)
    res.json(save)
}

const getMerchandise = async (req, res) => {
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
                stock: item.stock
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
    const { name, price, stock } = req.body
    const { id } = req.params
    console.log(id)
    try {
        const edit = await Merchandise.findByIdAndUpdate({ _id: id }, { name, price, stock })
        console.log(edit)
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
            itemId: finditem._id,
            fullname: fullname,
            program: program,
            size: size,
            quantity: quantity

        })

        const save = await newPurchaseHistory.save()
        finditem.stock -= 1
        await finditem.save()
        console.log(save)
        res.status(200).json({ message: "success purchase" })
    } catch (error) {
        console.log(error)
    }
}

const getAllPurchaseHistory = async (req, res) => {
    try {
        const getAll = await purchaseHistoryModel.find({}).populate('itemId')
        console.log(getAll)

        if (!getAll) {
            console.log('no purchase history')
            return;
        }
        // console.log(getAll)
        const items = getAll.map((item) => {
            const base64Image = item.itemId.image.data.toString('base64');
            const image = `data:${item.itemId.image.contentType};base64,${base64Image}`

            return {
                item,
                itemId: {
                    image: image
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


module.exports = { createProduct, getMerchandise, purchaseHistory, getAllPurchaseHistory, deleteMerchandise, editMerchandise }