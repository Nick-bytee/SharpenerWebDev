const exp = require('express');
const path = require('path')
const dir = require('../utils/path')

const router = exp.Router()

router.post('/',(_req,res) => {
    res.sendFile(path.join(dir,'views','success.html'))
})

module.exports = router