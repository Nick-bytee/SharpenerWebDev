const Users = require('../Models/users')

exports.getUsers = (req, res, next)=>{
    Users.findAll().then((users) => {
        res.status(200).json(users)
    }).catch(err => console.log(err))
}


exports.addUser = (req, res, next) => {
    Users.create({
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone
    }).then((createdUser) => {
        res.status(200).json(createdUser)
    }
    ).catch(err => console.log(err))
}

exports.deleteUser = (req, res, next) => {
    Users.destroy({where : {id : req.params.userID}})
    .then((users) => {
        res.status(200).json(users)
    }).catch(err => console.log(err))
}

exports.updateUser = (req, res, next) => {
    const id = req.params.userID
    Users.update({
        name : req.body.name,
        phone : req.body.phone,
        email : req.body.email
    },{where : {id : id}})
    .then((users) => {
        res.status(200).json(users)
    }).catch(err => console.log(err)) 

}