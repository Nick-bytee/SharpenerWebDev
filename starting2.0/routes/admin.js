const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProduct);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

router.get('/delete-product/:pid', adminController.deleteProduct)

router.get('/edit-product/:productID', adminController.getEditProduct)

router.post('/edit-product', adminController.postEditProduct)

module.exports = router;
