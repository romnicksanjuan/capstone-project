const express = require('express');
const multer = require('multer')
const { createItem, fetchItems, editITem, deleteitem, totalItems, searchItem, propertyPage } = require('../controllers/controller.js')
const { addBorrowItem, fetchBorrowedItems, totalBorrowedItems, returnItem, fetchHistory } = require('../controllers/borrowItemController.js');
const { createProduct, getMerchandise, purchaseHistory, getAllPurchaseHistory, deleteMerchandise, editMerchandise } = require('../controllers/merchandise-controller.js');
const { createAdmin, loginAdmin, forgotPassword, logout } = require('../controllers/adminController.js');


// authehntication
const { middleware } = require("../middleware/auth.js")


const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage });

// admin
router.post("/admin/create", createAdmin)
router.post("/admin/login", loginAdmin)
router.post('/admin/forgot-password', forgotPassword)
router.post("/logout", logout)

// item
router.post('/create-item', createItem)
router.get('/display-items', middleware, fetchItems)
router.put('/edit-item/:id', middleware, editITem)
router.delete('/delete-item/:id', deleteitem)
router.get('/total-items', totalItems)
router.get('/search', searchItem)
router.get('/item/:sn', propertyPage)

// borrow
router.post('/add-borrow-item', addBorrowItem)
router.get('/fetch-borrowed-items', middleware, fetchBorrowedItems)
router.get('/total-borrowed-items', totalBorrowedItems)
router.put('/return-item/:id', returnItem)
router.get('/fetch-history', fetchHistory)

// mechandise
router.post('/create-product', upload.single('image'), createProduct)
router.get('/get-merchandise',middleware, getMerchandise)
router.delete('/delete-merchandise/:id', deleteMerchandise)
router.put('/edit-merchandise/:id', editMerchandise)
router.post('/purchase-history/:id', purchaseHistory)
router.get('/get-purchase-history',middleware, getAllPurchaseHistory)


module.exports = router;