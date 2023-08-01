const signUp = document.getElementById('signIn')
document.addEventListener('submit',addUser)


const signIn = document.getElementById('signIn')
signIn.addEventListener('click', loginPage)


async function addUser(e){
    e.preventDefault()
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    const myObj = {
        name : name,
        email : email,
        password : password
    }

    try {
        const data = await axios.post('http://localhost:3000/users/Adduser',myObj)
        console.log(data)
    }catch(err) {if(err.response && err.response.status === 400){
        document.getElementById('errMessage').innerHTML = "Email already in use"
    }}

}



//function to show signIn/SignUp Page
function loginPage(){
    //changing heading
    const heading = document.getElementById('heading')
    heading.innerText = 'Sign In'

    //changing button text
    const signInButton = document.getElementById('signUp')
    signInButton.innerHTML = 'Sign In'

    //changing Image
    const image = document.getElementById('image')
    image.src = '../views/images/signin-image.jpg'

    //changing new user text
    const login = document.querySelector('h3')
    login.innerText = 'New User?'

    //changing button
    const signUp = document.getElementById('signIn')
    signUp.innerHTML = 'Create New Account'
    signUp.addEventListener('click', function () {
      window.location.href = '../views/signUp.html';
    });

    //removing name field
    const name = document.getElementById('name')
    if(name) {
        const parent = name.parentElement
        parent.removeChild(name)
    }
}