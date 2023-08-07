const sib = require('sib-api-v3-sdk')
require('dotenv').config()

exports.resetPassword = (req, res)=>{
    const email = req.body.email
    const client = sib.ApiClient.instance
    const apiKey = client.authentications['api-key']
    apiKey.apiKey = process.env.EMAIL_API
    
    const tranMailApi = new sib.TransactionalEmailsApi()
    
    const sender = {
        email : 'noreply@nick.com',
        name : 'Nick'
    }
    
    const receivers = [
        {email : email}
    ]
    
    tranMailApi.sendTransacEmail({
        sender,
        to : receivers,
        subject : 'Reset Your Password',
        htmlContent : '<h1>Hello Boi</h1>',
    }).then(
        res.status(200).json({message : 'Link has been sent.'})
    ).catch(err => console.log(err))
        

}
