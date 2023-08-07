const Expense = require('../models/expense')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const sequelize = require('sequelize')

exports.leaderboardData = async (req, res) => {
    const result = await User.findAll({
        attributes : ['name', 'totalAmount'],
        order : [['totalAmount', "DESC"]],
        raw : true,
    })
    res.status(200).json(result)
}

exports.storeData = async (req, res) => {
    try {
        const user = jwt.verify(req.body.token, 'secretkey')
        const amount = req.body.amnt
        const userID = user.userID
        const data = Expense.create({
            amount: amount,
            description: req.body.desc,
            category: req.body.cate,
            userId: userID
        })
            const result = await User.findByPk(userID)
            const oldExpense = result.dataValues.totalAmount
            const totalExpense = (oldExpense + +amount)

            User.update({
                totalAmount : totalExpense
        }, {
            where : {
                id : userID
            }
        })
            res.status(200).json(data)
    } catch (err) {
        console.log(err)
    }
}

exports.getData = async (req, res) => {
    const user = req.user
    try {
        const expenses = await Expense.findAll({
            where: {
                userId: user.id
            }
        })
        if (user.isPremium) {
            res.status(200).json({
                expenses,
                isPremium: true
            })
        } else {
            res.status(200).json({
                expenses,
                isPremium: false
            })
        }
    } catch (err) {
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