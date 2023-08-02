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
        console.log(err)
        res.status(400).json({message : 'User Already Registered'})
    })
}

exports.signInUser = (req, res ,next) => {
    const email = req.body.email;
    const psk = req.body.password

    User.findAll({
        where : {
            email : email,
        }
    }).then(user => {
        if(user.length > 0) {
            {   
                const data = user[0]
                if(data['password'] === psk){
                    res.status(200).json({message : 'Logged In Successfully'})
                }else {
                    res.status(200).json({message : 'Incorrect Password'})
                }
            }

        }else {
            res.status(200).json({message : 'Incorrect Email'})
        }
    }).catch(err => console.log(err))
}