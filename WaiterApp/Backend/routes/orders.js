const express = require('express')
const router = express.Router()

const mainController = require('../controller/orders')

router.post('/orders/addOrder', mainController.postOrder)

router.get('/orders/getOrders', mainController.getOrder)

router.delete('/orders/delete-order/:id', mainController.deleteOrder)

module.exports = router