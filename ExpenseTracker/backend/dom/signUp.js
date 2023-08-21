const signUp = document.getElementById('signUp')
document.addEventListener('submit', addUser)

const signIn = document.getElementById('signIn')
signIn.addEventListener('click', loginPage)


async function addUser(e) {
    e.preventDefault()

    if (signUp.innerHTML === "Sign In") {
        return validateUser()
    }

    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    console.log(name)
     const myObj = {
        name: name,
        email: email,
        password: password
    }

    try {
        const result = await axios.post('http://localhost:3000/users/Adduser', myObj)
        const message = document.getElementById('Message')
        message.innerHTML = result.data.message
        message.style.color = 'green'
        setTimeout(() => {
            loginPage()
        }, 1500);
    } catch (err) {
        if (err.response && err.response.status === 400) {
            document.getElementById('Message').innerHTML = err.data.message
        }
    }

}



//function to show signIn/SignUp Page
function loginPage() {
    document.getElementById('Message').innerHTML = ''
    document.getElementById('email').value = ''
    document.getElementById('password').value = ''
    document.getElementById('emailHelp').innerHTML = ''

    //changing heading
    const heading = document.getElementById('heading')
    heading.innerText = 'Sign In'

    //Forgot Password Button
    const forgotPskButton = document.getElementById('forgot-psk')
    forgotPskButton.style.display = ''
    forgotPskButton.addEventListener('click', forgotPassword)


    //changing button text
    signIn.innerHTML = 'Create New Account';
    signIn.addEventListener('click', function () {
        window.location.href = '../views/signUp.html';
    });

    //changing Image
    const image = document.getElementById('image')
    image.src = '../views/images/signin-image.jpg'

    //changing new user text
    const login = document.querySelector('h3')
    login.innerText = 'New User?'

    //changing button
    signUp.innerHTML = 'Sign In'

    //removing name field
    const name = document.getElementById('name')
    if (name) {
        const parent = name.parentElement
        parent.removeChild(name)
        console.log('working')
    }
}

async function validateUser() {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const validate = {
        email: email,
        password: password
    }
    try {
        const result = await axios.post('http://localhost:3000/users/signIn', validate)
        const message = document.getElementById('Message')
        if (result.data.success) {
            message.innerHTML = result.data.message
            message.style.color = 'green'
            localStorage.setItem('token', result.data.token)
            setTimeout(() => {
                window.location.href = "./index.html"
            }, 1000)
        } else if (
            !result.data.success && !result.data.user
        ) {
            message.innerHTML = result.data.message
        }else{
            message.innerHTML = result.data.message   
        }
    } catch (err) {
        console.log(err)
    }

}

async function forgotPassword(e) {
    window.location.href = './forgotPassword.html'
}