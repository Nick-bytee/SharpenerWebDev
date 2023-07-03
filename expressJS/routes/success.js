const exp = require('express');

const router = exp.Router()
const contactFormController = require('../controllers/contact')

router.post('/', contactFormController.postForm)

module.exports = router