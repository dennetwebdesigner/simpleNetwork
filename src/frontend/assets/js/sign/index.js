import sign from './Sign.js'

const items = document.querySelector('#items')

const next = document.querySelector('#register-display')
const previos = document.querySelector('#login-display')

items.addEventListener('mouseenter', (e) => {
    next.addEventListener('click', event => {
        console.log('test')
        e.target.scrollBy(300, 0)
    })

    previos.addEventListener('click', event => {
        e.target.scrollBy(-300, 0)
        console.log('test')
    })
})

sign.register('#register')
sign.login('#login')