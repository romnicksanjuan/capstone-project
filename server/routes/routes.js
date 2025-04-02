const express = require('express');
const multer = require('multer')
const { createItem, fetchItems, editITem, deleteitem, totalItems, searchItem, propertyPage, barGraph, checkToken } = require('../controllers/controller.js')
const { addBorrowItem, fetchBorrowedItems, totalBorrowedItems, returnItem, fetchHistory } = require('../controllers/borrowItemController.js');
const { createProduct, getMerchandise, purchaseHistory, getAllPurchaseHistory, deleteMerchandise, editMerchandise, totalMerchandise, barGraphMerchandise } = require('../controllers/merchandise-controller.js');
const { createAdmin, loginAdmin, forgotPassword, logout, sendOtp, verifyOtp } = require('../controllers/adminController.js');


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
router.post('/send-otp', sendOtp)
router.post('/verify-otp', verifyOtp)

// item
router.post('/create-item', createItem)
router.get('/display-items', middleware, fetchItems) // middleware
router.put('/edit-item/:id', editITem)
router.delete('/delete-item/:id', deleteitem)
router.get('/total-items', totalItems)
router.get('/search', searchItem)
router.get('/item/:sn', propertyPage)
router.get("/bar-charts", barGraph)

// borrow
router.post('/add-borrow-item', addBorrowItem)
router.get('/fetch-borrowed-items', middleware, fetchBorrowedItems)// middleware
router.get('/total-borrowed-items', totalBorrowedItems)
router.put('/return-item/:id', returnItem)
router.get('/fetch-history', middleware, fetchHistory)  // middleware

// mechandise
router.post('/create-product', upload.single('image'), createProduct)
router.get('/get-merchandise', middleware, getMerchandise)// middleware
router.delete('/delete-merchandise/:id', deleteMerchandise)
router.put('/edit-merchandise/:id', editMerchandise)
router.post('/purchase-history/:id', purchaseHistory)
router.get('/get-purchase-history', middleware, getAllPurchaseHistory)// middleware
router.get("/total-merchandise", totalMerchandise)
router.get("/bar-charts/merchandise", barGraphMerchandise)

// check token
router.get('/check-token', middleware, checkToken)

module.exports = router;