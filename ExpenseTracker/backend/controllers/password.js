const sib = require('sib-api-v3-sdk')
const UUID = require('uuid')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const ForgotPasswordRequest = require('../models/forgotPasswordRequests')
require('dotenv').config()

var globalUUId = ''

exports.sendMail = async (req, res, next) => {
    const email = req.body.email
    const client = sib.ApiClient.instance
    const apiKey = client.authentications['api-key']
    apiKey.apiKey = process.env.EMAIL_API
    console.log(process.env.EMAIL_API)

    const tranMailApi = new sib.TransactionalEmailsApi()

    const sender = {
        email: 'noreply@nick.com',
        name: 'Nick'
    }
    try {
        //finding user which created request
        const user = await User.findOne({
            where: {
                email: email
            }
        })

        //creating request
        const uuid = UUID.v4()
        await user.createForgotPasswordRequest({
            uuid: uuid,
            userId: user.id,
            isActive: true
        })

        const reciever = {
            email: email
        }

        await tranMailApi.sendTransacEmail({
            sender,
            to: [reciever],
            subject: 'Reset Your Password',
            htmlContent: `<h1>Hello</h1>
                <p>Click On the Below Link To Reset Your Password</p>
                <p><a href="http://localhost:3000/password/resetPassword/${uuid}">Reset Password</a></p>
                <p>Thank You</p>`
        })
        res.status(200).json({
            message: 'Link has been sent.'
        })

    } catch (err) {
        console.log(err)
    }
}

exports.resetPassword = async (req, res) => {
    const uuid = req.params.uuid
    try {
        const data = await ForgotPasswordRequest.findOne({
            where: {
                uuid: uuid
            }
        })
        console.log(data)
        // data.isActive = false
        const options = {
            headers: {
                uuid: uuid
            }
        }
        res.status(200).send(`<html>
        <head>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
            <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
            <title>Forgot Passowrd</title>
        </head>

        <body style="height: fit-content;">
            <div class="containers" id="container" style="display: grid; justify-content: center;">
                <h3 class="heading">Reset Your Passowrd</h3>
                <form method="post" id = 'email-form' action="/password/updatePassword/${uuid}" method='post'>
                        <div class="mb-3">
                        <label class="form-label">Enter Your New Password</label>
                        <input type="password" class="form-control" id="password" aria-describedby="emailHelp">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Confirm Your Password</label>
                            <input type="password" class="form-control" id="password2" aria-describedby="emailHelp"">
                        </div>
                        <p id="message"></p>
                        <button type="submit" class="btn btn-primary" id="submit">Submit</button>
                        <button class="btn btn-primary" id="forgot-psk" style="position: absolute; margin-left: 10px; display: none;">Forgot Password?</button>
                </form>
                <img id="image" src="./images/forgot_password.png" alt="">
            </div>
            <script>
            const password = document.getElementById('password')
            const password2 = document.getElementById('password2')
            const message = document.getElementById('message')
            const button = document.getElementById('submit')
            function checkPasswordMatch(){
                    if(password.value !== password2.value){
                            console.log('working')
                            password.style.borderColor = "red"
                            password2.style.borderColor = "red"
                            message.innerHTML = 'Passwords Does Not Match'
                            message.style.color = 'red'
                            button.setAttribute("disabled", "")
                    }else {
                            password.style.borderColor = "black"
                            password2.style.borderColor = "black"
                            message.innerHTML = ""
                            button.removeAttribute("disabled")
                    }
            }
            function formsubmitted(e){
                e.preventDefault();
        </script>
</body>
    </html>`)
        res.end()
    } catch (err) {
        console.log(err)
    }
}

exports.updatePassword = async (req, res) => {
    const uuid = req.params.id
    console.log(uuid)
    try {
        const data = await ForgotPasswordRequest.findOne({
            where: {
                uuid: uuid
            }
        })
        console.log(data)
    } catch (err) {
        console.log(err)
    }
}