const Expense = require('../models/expense')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const sequelize = require('../database/database')

exports.leaderboardData = async (req, res) => {
    const result = await User.findAll({
        attributes: ['name', 'totalAmount'],
        order: [
            ['totalAmount', "DESC"]
        ],
        raw: true,
    })
    res.status(200).json(result)
}

exports.storeData = async (req, res) => {
    const t = await sequelize.transaction()
    try {
        const user = jwt.verify(req.body.token, 'secretkey')
        const amount = req.body.amnt
        const userID = user.userID
        const data = Expense.create({
            amount: amount,
            description: req.body.desc,
            category: req.body.cate,
            userId: userID
        }, {
            transaction: t
        })
        const result = await User.findByPk(userID)
        const oldExpense = result.dataValues.totalAmount
        const totalExpense = (oldExpense + +amount)

        User.update({
            totalAmount: totalExpense
        }, {
            where: {
                id: userID
            }
        }, {
            transaction: t
        })
        await t.commit()
        res.status(200).json(data)
    } catch (err) {
        await t.rollback()
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

exports.deleteData = async (req, res) => {
    const t = await sequelize.transaction()
    const uid = req.user.id
    const id = req.params.id
    try {
        const user = await User.findAll({
            attributes : ['id', 'name', 'totalAmount'],
            where : {
                id : uid
            }
            ,raw : true
        })
        const previosAmount = user[0].totalAmount
        const expenseData = await Expense.findByPk(id, {
            attributes: ['amount'],
            transaction: t,
            raw: true
        });
        const data = await Expense.destroy({
            where: {
                id: id
            }
        }, {transaction : t})
        const totalAmount = previosAmount - expenseData.amount
        // console.log(totalAmount, previosAmount)
        await User.update({
            totalAmount : totalAmount
        }, {
            where : {
                id : uid
            }
        },
        {transaction : t})
        res.status(200).json(data)
        await t.commit()
    } catch (err) {
        await t.rollback()
        console.log(err)
    }
}

// exports.updateExpense = async (req, res) => {
//     const id = req.params.uid
//     const t = await sequelize.transaction()
//     try {
//         Expense.update({
//             amount: req.body.amount,
//             description: req.body.description,
//             category: req.body.category
//         }, {
//             where: {
//                 id: id
//             }
//         }, {
//             transaction: t
//         })
//         res.status(200).json(data)
//         await t.commit()
//     } catch (err) {
//         await t.rollback()
//         console.log(err)
//     }
// }