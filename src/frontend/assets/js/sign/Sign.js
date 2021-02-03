import Api from '../ajax.js'

class Sign {

    constructor() {

    }

    // create new user
    register(form) {
        document.querySelector(form).addEventListener('submit', this.setRegister)
    }

    async setRegister(e) {
        e.preventDefault()

        // return element message error
        const log = document.querySelector('#msg-log')

        // validate fields
        const firstname = e.target.elements.firstname
        const lastanem = e.target.elements.lastanem
        const birthday = e.target.elements.birthday
        const username = e.target.elements.username
        const email = e.target.elements.email
        const password = e.target.elements.password

        log.innerHTML = ''

        // if inputs return false set validate in element message error
        if (!firstname || !lastanem || !birthday || !username || !email || !password) {
            log.style.display = 'block'
            log.innerHTML = 'Não pode haver campos vazios!'
            return false
        }

        // set connection with api
        const xhr = new Api()
        const api = await xhr.post('/users', data)

        // case conecction success return status and set message in element  
        api.onreadystatechange = async() => {

            // case server not response
            if (api.status == 500) {
                log.style.display = 'block'
                log.innerHTML = 'O servidor não esta respondendo, por favor tente novamente mais tarde!'
                return false
            }

            // if email or username already register 
            if (api.status == 404) {
                log.style.display = 'block'
                log.innerHTML = 'O email ou usuario já esta cadastrado!'
                return false
            }

            // succesful new user create
            if (api.status == 200) {
                log.style.display = 'block'
                log.style.background = 'rgba(30,150,0,0.6)'
                log.innerHTML = 'Cadastrado com sucesso!'
                return true
            }

        }
    }



}

export default new Sign()