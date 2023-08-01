const signIn = document.getElementById('signIn')
signIn.addEventListener('click', loginPage)

function loginPage(){
    //changing heading
    const heading = document.getElementById('heading')
    heading.innerText = 'Sign In'

    //removing name field
    const name = document.getElementById('name')
    const parent = name.parentElement
    parent.removeChild(name)

    //changing button text
    const signInButton = document.getElementById('signUp')
    signInButton.innerHTML = 'Sign In'

    //changing Image
    const image = document.getElementById('image')
    image.src = '../views/signin-image.jpg'

    //changing new user text
    const login = document.querySelector('h3')
    login.innerText = 'New User?'

    //changing button
    const signUp = document.getElementById('signIn')
    signUp.innerHTML = 'Create New Account'
    signUp.href = '../views/signUp.html'

}