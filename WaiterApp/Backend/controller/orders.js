const Order = require('../models/order')

exports.postOrder = (req, res) => {
    Order.create({
        price: req.body.price,
        itemName: req.body.item,
        table: req.body.table
    }).then(result => {
        res.status(200).json(result)
    }).catch(err => console.log(err))
}

exports.getOrder = (req, res) => {
    Order.findAll().then((data) => {
        res.status(200).json(data)
    }).catch(err => console.log(err))
}

exports.deleteOrder = (req,res) => {
    const id = req.params.id
    Order.destroy({
        where : {
            id : id
        }
    }).then(data => {
        res.status(200).json(data)
    }).catch(err => console.log(err))
}