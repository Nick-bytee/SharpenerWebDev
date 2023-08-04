const Users = require('../models/user')
const jwt = require('jsonwebtoken')

exports.authenticate = async (req, res, next) => {
    const token = req.header('Auth')
    try {
        const user = jwt.verify(token, 'secretkey')
        console.log(user)
        if (user) {
            const userData = await Users.findByPk(user.userID)
            req.user = userData
            next()
        }
    } catch (err) {
        console.log(err)
    }
}