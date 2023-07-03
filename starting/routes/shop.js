const rootDir = require('../util/path');
const express = require('express');


const productController = require('../controllers/products')
const router = express.Router();

router.get('/', productController.showProducts);

module.exports = router;
