const Expense = require('../models/expense')


exports.storeData = (req, res) => {
    console.log('working')
    Expense.create({
        amount : req.body.amnt,
        description : req.body.desc,
        category : req.body.cate
    }).then(data =>
        res.status(200).json(data)
    ).catch(err => console.log(err))
}

exports.getData = (req, res) => {
    Expense.findAll().then((data) =>
        res.status(200).json(data)
    ).catch(err => console.log(err))
}

exports.deleteData = (req, res) => {
    Expense.destroy({where : {
        id : req.params.id
    }}).then(data =>
        res.status(200).json(data)
    ).catch(err => console.log(err))
}

exports.updateExpense = (req, res) => {
    const id = req.params.uid
    console.log(req.body.amount)
    Expense.update({
        amount : req.body.amount,
        description : req.body.description,
        category : req.body.category
    }, {where : {id : id}})
    .then(data =>
        res.status(200).json(data)
    ).catch(err => console.log(err))
}