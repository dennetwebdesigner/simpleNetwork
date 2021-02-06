import sign from './Sign.js'


const register = document.querySelector('#switch-register')
const login = document.querySelector('#switch-login')

const formLogin = document.querySelector('#login')
const formRegister = document.querySelector('#register')

login.addEventListener('click', () => {
    login.classList.add('switch-form-active')
    register.classList.remove('switch-form-active')
    formLogin.style.display = 'block'
    formRegister.style.display = 'none'
})

register.addEventListener('click', () => {
    register.classList.add('switch-form-active')
    login.classList.remove('switch-form-active')
    formRegister.style.display = 'block'
    formLogin.style.display = 'none'
})

sign.register('#register')
sign.login('#login')