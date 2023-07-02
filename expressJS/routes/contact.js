const exp = require('express')

const path = require('path')
const router = exp.Router()
const dir = require('../utils/path')

router.get("/",(req,res) =>{
    res.sendFile(path.join(dir,'views','contact.html'))
})

module.exports = router