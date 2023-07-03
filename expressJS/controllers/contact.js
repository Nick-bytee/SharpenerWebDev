const path = require('path')
const dir = require('../utils/path')

exports.getContactForm = ((req,res) =>{
    res.sendFile(path.join(dir,'views','contact.html'))
})

exports.postForm = ((_req,res) => {
    res.sendFile(path.join(dir,'views','success.html'))
})