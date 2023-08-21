const Expense = require('../models/expense')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const sequelize = require('../database/database')
const AWS = require('aws-sdk')
const DownloadHistory = require('../models/downloadHistory')
const { resolve } = require('path')
const { fileURLToPath } = require('url')
require('dotenv').config()

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
    const ITEMS_PER_PAGE = 10
    const page = req.query.page || 1;
    try {
        const totalItems = await Expense.count({
            where : {
                userId : req.user.id
            }
        })
        const expenses = await Expense.findAll({
            where: {
                userId: user.id,
            },
            offset : (page-1) * ITEMS_PER_PAGE,
            limit : ITEMS_PER_PAGE
            
        })
        if (user.isPremium) {
            res.status(200).json({
                expenses,
                isPremium: true,
                hasNextPage : ITEMS_PER_PAGE * page < totalItems,
                nextPage : 1 + +page,
                hasPreviousPage : page > 1,
                previousPage : page - 1,
                lastPage : Math.ceil(totalItems / ITEMS_PER_PAGE),
                currentPage : page
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

exports.generateReport = async (req, res) => {
    try{
        const expenses = await req.user.getExpenses({
            raw: true
        })
        const userId = req.user.id
        const data = JSON.stringify(expenses)
        const date = new Date()
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const name  = `Expense ${year.toString()}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`;
        const fileName = `Expenses ${userId}/${name}.txt`
        const fileURL = await downloadReport(data, fileName)
        req.user.createDownloadHistory({
            fileURL : fileURL,
            fileName : name
        })
        if(!fileURL){
            throw new Error()
        }else {
            res.status(200).json({URL : fileURL})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({message : 'An Error Occured'})
    }
}

async function downloadReport(data, filename,){
    let s3Bucket = new AWS.S3({
        accessKeyId : process.env.AWS_ACCESS_KEY,
        secretAccessKey : process.env.AWS_SECRET_KEY
    })

    return new Promise((resolve, reject) => {

        s3Bucket.createBucket(() => {
            var params = {
                Bucket : process.env.AWS_BUCKET_NAME,
                Key : filename,
                Body : data,
                ACL : 'public-read',
                ContentType: 'text/csv'
            }
            s3Bucket.upload(params, (err, response) => {
                if(err){
                    console.log(err)
                    reject()
                }else{
                    resolve(response.Location)
                    console.log(response)
                }
            })
        })
    })
}

exports.getDownloadHistory = async(req, res) => {
    try{
        const response = await DownloadHistory.findAll({
            where : {userId : req.user.id}
        })
        res.status(200).json({data : response, isPremium : req.user.isPremium})
    }catch(err){
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
