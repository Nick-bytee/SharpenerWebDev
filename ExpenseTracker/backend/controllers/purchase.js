const RazorPay = require('razorpay')
const Order = require('../models/order')

exports.purchaseMembership = async (req, res) => {
    try {
        var rzp = new RazorPay({
            key_id : "rzp_test_DzqDxXl8yQCLCZ",
            key_secret : "sQ6pSRi5zJoZtz00lyStVWsh"
        })
        const amount = 2500

        rzp.orders.create({amount, currency : 'INR'}, (err, order) => {
            if(err){
                throw new Error(JSON.stringify(err))
            }else{
                req.user.createOrder({
                    orderId : order.id,
                    status : 'PENDING'
                }).then(() => {
                    return res.status(201).json({order, key_id : "rzp_test_DzqDxXl8yQCLCZ"})
                }
                ).catch(err => console.log(err))
            }
        })

    } catch(err){
        console.log(err)
    }
}
exports.updateTransactionStatus = async (req, res) => {
    try {
        const {payment_id, order_id} = req.body;
        Order.findOne({where : {
            orderId : order_id
        }}).then((order) => {
            order.update({
                paymentId : payment_id,
                status : 'SUCCESS'
            }).then(() => {
                req.user.update({isPremiumUser : true})
            }).then(() => {
                return res.status(200).json({success : true, message : 'Transaction Successful'})
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => console.log(err))
    }catch(err){
        console.log(err)
    }
}