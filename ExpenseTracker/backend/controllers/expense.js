const Expense = require('../models/expense')
const jwt = require('jsonwebtoken')

exports.storeData = (req, res) => {
    const user = jwt.verify(req.body.token, 'secretkey')
    Expense.create({
        amount: req.body.amnt,
        description: req.body.desc,
        category: req.body.cate,
        userId: user.userID
    }).then(data =>
        res.status(200).json(data)
    ).catch(err => console.log(err))
}

exports.getData = async (req, res) => {
    const user = req.user
    try {
        const expenses = await Expense.findAll({where : {
            userId : user.id
        }})
        if(user.isPremium){
            res.status(200).json({expenses, isPremium : true})
        }else{
            res.status(200).json({expenses, isPremium : false})
        }
    }catch(err) {
        console.log(err)
    }
}

exports.deleteData = (req, res) => {
    Expense.destroy({
        where: {
            id: req.params.id
        }
    }).then(data =>
        res.status(200).json(data)
    ).catch(err => console.log(err))
}

exports.updateExpense = (req, res) => {
    const id = req.params.uid
    console.log(req.body.amount)
    Expense.update({
            amount: req.body.amount,
            description: req.body.description,
            category: req.body.category
        }, {
            where: {
                id: id
            }
        })
        .then(data =>
            res.status(200).json(data)
        ).catch(err => console.log(err))
}