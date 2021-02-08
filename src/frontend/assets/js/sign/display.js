// element id resgiter-display sign.html
const registerDisplay = document.querySelector('#register-display')
    // element id switch-resgiter sign.html
const registerSwitch = document.querySelector('#switch-register')

// element id login-display sign.html
const loginDisplay = document.querySelector('#login-display')
    // element id switch-login sign.html
const loginSwitch = document.querySelector('#switch-login')

// get element form id register sign.html 
const registerForm = document.querySelector('#register')
    // get element form id login sign.html 
const loginForm = document.querySelector('#login')

// display view login and register form, set class active in constroller-items
const switchLogin = () => {
    loginForm.style.display = 'block'
    registerForm.style.display = 'none'
    loginSwitch.classList.add('active')
    registerSwitch.classList.remove('active')
}

// display view register and register form, set class active in constroller-items
const switchRegister = () => {
    loginForm.style.display = 'none'
    registerForm.style.display = 'block'
    loginSwitch.classList.remove('active')
    registerSwitch.classList.add('active')
}

// set event click on display and switch to register

registerDisplay.addEventListener('click', switchRegister)
registerSwitch.addEventListener('click', switchRegister)

// set event click on display and switch to login
loginDisplay.addEventListener('click', switchLogin)
loginSwitch.addEventListener('click', switchLogin)