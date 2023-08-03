const User = require('../models/user');
const bcrypt = require('bcrypt')

exports.addUser = (req, res) => {
    bcrypt.hash(req.body.password,10, async(err, hash) => {
        console.log(err)
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash
        }).then(
            res.status(200).json({message : 'Registered Successfully, Redirecting to Login...'})
        ).catch(err => {
            console.log(err)
            res.status(400).json({message : 'Email Already Registered'})
        }) 
    })
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
                    bcrypt.compare(psk, data['password'], (err, result) => {
                        if(err) {
                            throw new Error('Something Went Wrong')
                        }else if(result){
                            res.status(200).json({message : 'Logged In Successfully'})
                        }else{
                            res.status(200).json({message : 'Incorrect Password'})
                        }
                    })
                }
            }else {
                res.status(200).json({message : 'User Not Found'})
            }
    }
    catch(err) {
        res.status(500).json({message : err})
    } 
}