const exp = require('express');
const path = require('path')
const dir = require('../utils/path')

const router = exp.Router()

router.get('/',(_req,res) => {
    res.sendFile(path.join(dir,'views','shop.html'))
})

module.exports = router