const sequelize = require('../database/database');
const User = require('../models/user');

exports.addUser = (req, res, next) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(result => {
        res.status(200).json(result)
    }).catch(err => {
        res.status(400).json({message : 'User Already Registered'})
    })
}