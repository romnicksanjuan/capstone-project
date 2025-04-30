const express = require('express');
const multer = require('multer')
const { createItem, fetchItems, editITem, deleteitem, totalItems, searchItem, propertyPage, barGraph, checkToken, newCategoryFunction, displayCategories, deleteCategory, getAccessoryFunction, createAccessoryType, deleteAccessoryType, inventoryReport } = require('../controllers/InventoryController.js')
const { addBorrowItem, fetchBorrowedItems, totalBorrowedItems, returnItem, fetchHistory } = require('../controllers/borrowItemController.js');
const { createProduct, getMerchandise, purchaseHistory, getAllPurchaseHistory, deleteMerchandise, editMerchandise, totalMerchandise, barGraphMerchandise } = require('../controllers/merchandise-controller.js');
const { createAdmin, loginAdmin, forgotPassword, logout, sendOtp, verifyOtp, changePassword, getRequester, getUsers, updateUserRole, delUser, createDean, displayDean, editDean, deleteDean, requesterRegister, requesterLogin, updateProfile, displayAdmins } = require('../controllers/userController.js');


// authehntication
const { middleware } = require("../middleware/auth.js");
const { submitRequest, displayRequested, approvalButton, decisionButton, requestCount, editStatus, getRequestSummaray } = require('../controllers/requestController.js');
const { settings } = require('../controllers/settingsController.js');
const { addStock, stockIn } = require('../controllers/stockIn_outController.js');
const damage_lost = require('../model/damage_lost.js');
const { damagLost, getDamageLost } = require('../controllers/damageLostController.js');
const { getItemTransfer } = require('../controllers/item_movementController.js');
const { createDepartment, getDepartment, delDep } = require('../controllers/departmentController.js');
const { getDepartmentReport } = require('../controllers/departmentUsageController.js');


const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage });

// user
router.post("/admin/sign-up", createAdmin)
router.post("/admin/login", loginAdmin)
router.post('/admin/forgot-password', forgotPassword)
router.post("/logout", logout)
router.post('/send-otp', sendOtp)
router.post('/verify-otp', verifyOtp)
router.post('/change-password', changePassword)
router.get('/get-users', getUsers)
router.put('/update-role/:id', updateUserRole)
router.delete('/delete-user/:id', delUser)

// register requester
router.post('/requester-register', requesterRegister)
router.post('/requester-login', requesterLogin)
// dean
router.post('/create-dean', createDean)
router.get('/display-dean', displayDean)
router.put('/edit-dean/:id', editDean)
router.delete('/delete-dean/:id', deleteDean)

// admins
router.get('/display-admins', displayAdmins)

// item
router.post('/create-item', createItem)
router.get('/display-items', middleware, fetchItems) // middleware
router.put('/edit-item/:id', editITem)
router.delete('/delete-item/:id', deleteitem)
router.get('/total-items', totalItems)
router.get('/search', searchItem)
router.get('/item/:sn', propertyPage)
router.get("/bar-charts", barGraph)
router.post('/add-category', newCategoryFunction) //add category
router.get('/display-categories', displayCategories) //display category
router.delete('/delete-category/:id', deleteCategory) //delete category
router.get('/display-accessory-type', getAccessoryFunction)
router.post('/add-accessory-type', createAccessoryType) //add accessory
router.delete('/delete-accessory/:id', deleteAccessoryType) //delete category

// borrow
router.post('/borrow-item', addBorrowItem)
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

// request
router.post('/submit-request', middleware, submitRequest)
router.get('/display-requested', middleware, displayRequested)
router.post('/decision', middleware, decisionButton)
router.get('/display-request-count', middleware, requestCount)
router.put('/update-status/:id', middleware, editStatus)

// settings
router.get('/settings', middleware, settings)

// summary report
router.get('/get-inventory-summary', inventoryReport)


// add stock
router.get('/get-stock-in-out', stockIn)


// damage/lost
router.post('/damage-lost/:id', damagLost)
router.get('/get-damage-lost', getDamageLost)


// request summary
router.get('/get-request-summary', getRequestSummaray)

// get item transfer
router.get('/get-item-transfer', getItemTransfer)



// update profile
router.put('/update-profile/:id', upload.single('file'), updateProfile)

// department
router.post('/create-department', createDepartment)
router.get('/get-department', getDepartment)
router.delete('/delete-department/:id', delDep)

// display department usage report 
router.get('/department-usage', getDepartmentReport)

module.exports = router;