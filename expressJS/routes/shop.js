const exp = require('express');

const router = exp.Router()

router.get('/',(req,res,next) => {
    res.send('<h1>This is the shop page</h1>')
})

module.exports = router