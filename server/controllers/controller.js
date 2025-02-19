const Item = require('../model/Item.js')
const QRCode = require("qrcode");

const createItem = async (req, res) => {
    const { serialNumber, unit, brand, category, status, quantity } = req.body;

    const link = `http://localhost:3000/item/${serialNumber}`
    // console.log(unit)
    const qrImage = await QRCode.toDataURL(link);

    // Convert base64 to buffer
    const base64Data = qrImage.replace(/^data:image\/png;base64,/, ""); // Remove base64 header
    const qrBuffer = Buffer.from(base64Data, "base64");
    console.log(qrBuffer)

    const newItem = new Item({
        serialNumber, unit, brand, category, status, quantity, link: link, qr_code_image: {
            data: qrBuffer,
            contentType: 'image/png'
        }
    })

    try {
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const fetchItems = async (req, res) => {
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

        console.log("i", i)
        res.status(200).json({ items: i, totalCounts: totalCounts });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const editITem = async (req, res) => {
    const { id } = req.params;
    const { unit, brand, category, status, quantity } = req.body;
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            id,
            { unit, brand, category, status, quantity },
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

module.exports = { createItem, fetchItems, editITem, deleteitem, totalItems, searchItem, propertyPage }