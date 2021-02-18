import Api from '../helpers/ajax.js'
import MessageLog from './MessageLog.js'

class Sign {

    constructor() {

    }

    // create new user
    register(form) {
        document.querySelector(form).addEventListener('submit', this.setRegister)
    }

    login(form) {
        document.querySelector(form).addEventListener('submit', this.setLogin)
    }

    async setRegister(e) {

        e.preventDefault()


        // validate fields
        const firstname = e.target.elements.firstname
        const lastname = e.target.elements.lastname
        const birthday = e.target.elements.birthday
        const username = e.target.elements.username
        const email = e.target.elements.email
        const password = e.target.elements.password

        // if inputs return false set validate in element message error
        if (!firstname.value ||
            !lastname.value ||
            !birthday.value ||
            !username.value ||
            !email.value ||
            !password.value
        ) {
            MessageLog.error('Não pode haver campos vazios!')
            return false
        }

        // set connection with api
        const xhr = new Api()
        const api = await xhr.post('/users', {
            firstname: firstname.value,
            lastname: lastname.value,
            birthday: birthday.value,
            username: username.value,
            email: email.value,
            password: password.value
        })

        // case conecction success return status and set message in element  
        api.onreadystatechange = async() => {

            // case server not response
            if (api.status == 500) {

                MessageLog.error('O servidor não esta respondendo, por favor tente novamente mais tarde!')
                return false

            }

            // if email or username already register 
            if (api.status == 404) {
                password.value = ''
                MessageLog.error('O email ou usuario já esta cadastrado!')
                return false

            }

            // succesful new user create
            if (api.status == 200) {
                MessageLog.success('Seu cadastro foi realizado com sucesso!! Agora faça seu login...')
                firstname.value = ''
                lastname.value = ''
                birthday.value = ''
                username.value = ''
                email.value = ''
                password.value = ''
                return true
            }

        }
    }

    async setLogin(e) {
        e.preventDefault()

        // return element message error
        const log = document.querySelector('#notification')


        const username = e.target.elements.username
        const password = e.target.elements.password


        log.innerHTML = ''

        // if inputs return false set validate in element message error
        if (!username.value || !password.value) {
            MessageLog.error('Não pode haver campos vazios!')
            return false
        }

        // set connection with api
        const xhr = new Api()
        const api = await xhr.post('/auth', {
            username: username.value,
            password: password.value
        })

        // case conecction success return status and set message in element  
        api.onreadystatechange = async() => {

            // case server not response
            if (api.status == 500) {
                MessageLog.error('O servidor não esta respondendo, por favor tente novamente mais tarde!')
                return false
            }

            // if email or username already register 
            if (api.status == 404) {
                MessageLog.error('O nome de usuário ou senha não esta cadastrado!')
                password.value = ''
                return false
            }

            // succesful new user create
            if (api.status == 200) {

                const result = JSON.parse(api.response)

                window.localStorage.setItem('token', result.token)
                window.localStorage.setItem('id', result.user)
                window.location.href = '/'


                return true
            }

        }
    }

}

export default new Sign()