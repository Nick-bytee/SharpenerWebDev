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
        if(result.data.success){
            const message = document.getElementById('Message')
            message.innerHTML = result.data.message
            message.style.color = 'green'
            setTimeout(() => {
                window.location.href = "C:/Users/nikhi/Desktop/SharpenerWebDev/ExpenseTracker/backend/views/index.html"
            }, 1000)
        }
    }
    
    catch(err){
        console.log(err)
    }

}