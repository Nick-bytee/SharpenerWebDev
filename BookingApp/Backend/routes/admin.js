const express = require('express')

const router = express.Router()

const adminController = require('../controllers/admin')

router.get('/getUsers',adminController.getUsers)
router.post('/addUser', adminController.addUser)
router.use('/deleteUser/:userID', adminController.deleteUser)
router.put('/updateUser/:userID', adminController.updateUser)

module.exports = router