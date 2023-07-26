const express = require('express')
const router = express.Router()

const mainController = require('../controller/main')

router.post('/addOrder', mainController.postOrder)

router.get('/getOrders', mainController.getOrder)

router.delete('/delete-order/:id', mainController.deleteOrder)

module.exports = router