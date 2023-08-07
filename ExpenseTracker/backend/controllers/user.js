const User = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sequelize = require('../database/database')

exports.addUser = async (req, res) => {
    const t = await sequelize.transaction()
    try {
        const hash = await bcrypt.hash(req.body.password,10)
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hash
            }, {transaction : t})
                res.status(200).json({message : 'Registered Successfully, Redirecting to Login...'})
                await t.commit()
        }catch(err) {
            console.log(err)
            res.status(400).json({message : 'Email Already Registered'})
            await t.rollback()
}}

function generateAccessToken(id, name) {
    return jwt.sign({userID : id, name : name},'secretkey')
}

exports.signInUser = async (req, res) => {
    const email = req.body.email;
    const psk = req.body.password
    try {
        const user = await User.findAll({
            where : {
                email : email,
            }
        })
            if(user.length > 0) {
                {   
                    const data = user[0]
                    bcrypt.compare(psk, data.password, (err, result) => {
                        if(err) {
                            throw new Error('Something Went Wrong')
                        }else if(result){
                            const token = generateAccessToken(data.id,data.name,data.isPremium)
                            res.status(200).json({message : 'Logged In Successfully',success : true, token : token})
                        }else{
                            res.status(200).json({message : 'Incorrect Password', success : false})
                        }
                    })
                }
            }else {
                res.status(200).json({message : 'User Not Found', success : false, user : false})
            }
    }
    catch(err) {
        res.status(500).json({message : err, success : false})
    } 
}