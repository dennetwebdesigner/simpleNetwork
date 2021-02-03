import Api from '../ajax.js'

class Sign {

    constructor() {

    }

    register(form) {
        document.querySelector(form).addEventListener('submit', this.setRegister)
    }

    async validateFields(e) {

    }

    async setRegister(e) {
        e.preventDefault()
        const log = document.querySelector('#msg-log')
        const input = e.target.elements

        let data = {}

        Object.keys(input).forEach((element, index) => {
            const newElement = Object.values(input)[index]
            if (
                newElement.type != 'fieldset' &&
                newElement.type != 'label' &&
                newElement.type != 'submit'
            ) {
                if (!newElement.value) {
                    this.validate = false
                } else {
                    this.validate = true
                    data[newElement.name] = newElement.value
                }
            }
        })


        if (!this.validate) {
            log.style.display = 'block'
            log.innerHTML = 'Não pode haver campos vazios!'
            return false
        }

        const xhr = new Api()
        const api = await xhr.post('/users', data)

        api.onreadystatechange = async() => {
            if (xhr.status == 500) {
                log.style.display = 'block'
                log.innerHTML = 'O servidor não esta respondendo, por favor tente novamente mais tarde!'
                return false
            }

            if (xhr.status == 404) {
                log.style.display = 'block'
                log.innerHTML = 'O email ou usuario já esta cadastrado!'
                return false
            }

            if (xhr == 200) {
                alert('conta cadastrada com sucesso!')
                return true
            }

        }
    }



}

export default new Sign()