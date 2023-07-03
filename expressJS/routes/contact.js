const exp = require('express')


const router = exp.Router()
const contactFormController = require('../controllers/contact')


router.get("/", contactFormController.getContactForm)

module.exports = router