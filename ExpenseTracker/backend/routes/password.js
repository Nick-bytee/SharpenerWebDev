const express = require('express')
const router = express.Router()

const passwordController = require('../controllers/password')

router.post('/forgotPassword', passwordController.resetPassword)

module.exports = router