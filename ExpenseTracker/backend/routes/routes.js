const express = require('express')
const router = express.Router()

const mainController = require('../controllers/main')


router.post('/addExpense', mainController.storeData)

router.get('/getExpenses', mainController.getData)

router.delete('/deleteExpense/:id', mainController.deleteData)

router.put('/updateExpense/:uid', mainController.updateExpense)

module.exports = router