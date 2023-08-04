const express = require('express')
const router = express.Router()

const mainController = require('../controllers/expense')
const authController = require('../middleware/auth')


router.post('/addExpense', mainController.storeData)

router.get('/getExpenses', authController.authenticate, mainController.getData)

router.delete('/deleteExpense/:id', mainController.deleteData)

router.put('/updateExpense/:uid', mainController.updateExpense)

module.exports = router