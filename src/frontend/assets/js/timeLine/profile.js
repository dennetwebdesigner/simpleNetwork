import Api from '../helpers/ajax.js'
import help from '../helpers/index.js'
import ObserverRequest from '../helpers/ObserverRequest.js'

class Profile {

    constructor() {

        // captura os elementos html
        this.nameElement = document.querySelector('#profile-name')
        this.birthdayElement = document.querySelector('#profile-birthday')
        this.avatarUserElement = document.querySelector('#avatar-user')
        this.containerObs = document.querySelector('#container-btn-observer')

        // instancia conexão com api
        this.connection = new Api()

        // retorna botões e executa evento de relacionamento entre os usuarios
        this.observerRequest = new ObserverRequest()

        // id do usario logado no momento
        this.idLogged = window.localStorage.getItem('id')

    }

    // responsavel por inserir informações do perfil do usuario
    async setProfile() {

        // trata a query cpaturada na url
        this.getQuery = await help.getQuerys()
            // verifica se existe usuario na url e retorna  o id do usuario atual ou da url
        this.id = this.getQuery.length < 1 ? window.localStorage.getItem('id') : this.getQuery.id
            // insere o token de autentificação do usuario na variavel
        this.token = window.localStorage.getItem('token')

        // retorna as informações do usuario atraves do id
        const getUser = await this.connection.get(`/users/${this.id}`, {
            key: "Authorization",
            value: `Bearer ${this.token}`
        })

        // seta as informações do usuário requeridas anteriormente 
        getUser.onreadystatechange = async() => {

            // verifica se não nenhum erro vindo do servidor/api
            if (getUser.status == 200) {
                if (getUser.readyState == 4) {

                    // seta as informações vindas da api
                    const infoUser = JSON.parse(getUser.response)

                    // adiciona o nome e sobrenome do usuario no html
                    this.nameElement.textContent = `${infoUser.firstname} ${infoUser.lastname}`

                    // adiciona data de aniversário no html
                    this.birthdayElement.innerHTML += ` ${infoUser.birthday}`

                    // verifica se existe uma imagem de usuário, caso exista adiciona, caso não exista adiciona uma imagem padrão ao html
                    this.avatarUserElement.src = infoUser.image == null ? `${help.baseUrl}/static/image/avatar-user.png` : `${help.baseUrl}/static/image/upload/${infoUser.image}`

                    // inverte as cores da imagem padrão (temporario)
                    this.avatarUserElement.style.filter = infoUser.image == null ? 'invert(100%)' : 'none'

                    // iadiciona borda preta na imagem padrão (temporario)
                    this.avatarUserElement.style.borderColor = infoUser.image == null ? 'black' : 'white'

                    // iadiciona fundo branco a imagem padrão (temporario)
                    this.avatarUserElement.style.backgroundColor = 'white'

                    // adiciona no html os botões de relacionamento ao html
                    this.setButtonActions()
                }
            }
        }

    }

    // responsavel por adicionar e mostrar os tipos de relacionamento entre usuarios no html
    async setButtonActions() {

        // verifica se o usuario não é o atual 
        if (this.id != this.idLogged) {

            // conecta-se ao servidor/api
            const verifyObserver = await this.connection.get(`/observers/show/${this.id}`, {
                key: "Authorization",
                value: `Bearer ${this.token}`
            })

            // realiza as verificações de relacionamentos de usuarios vindas do servidor/api
            verifyObserver.onreadystatechange = async() => {
                if (verifyObserver.readyState == 4) {

                    // adiciona os valores retornado do requerimento feito anteriormente a uma variavel
                    const observer = JSON.parse(verifyObserver.response)

                    // metodo reponsavel por mostrar o relacionamento atuas quando html é carregado
                    this.verifyRelationObserverUser(observer)

                    // metodo responsavel por executar as ações dos botões 
                    this.handleButtons()
                }
            }
        }

    }

    // metodo reponsavel por mostrar o relacionamento atuas quando html é carregado
    verifyRelationObserverUser(observer) {

        // verifica se não há pedidos ou relacionamento 
        // E adiciona o botão para começar a observar usuario com id especifico
        if (Object.keys(observer).length < 1) {
            this.observerRequest.responseAdd()
        }

        // verifica se há pedidos porém ainda não foi aceito relacionamento no html de quem fez o pedido
        // E adiciona o botão para excluir o pedido de observar usuario com id especifico
        if (observer && observer.from == window.localStorage.getItem('id') && observer.status == 0) {
            this.containerObs.innerHTML = '<p>aguardando  aceitação do pedido</p>'
            this.observerRequest.responseDel({})
        }

        // verifica se há pedidos porém ainda não foi aceito relacionamento de quem recebeu o pedido
        // E adiciona o botão para aceitar ou excluir o pedido para observar usuario com id especifico
        if (observer && observer.for == window.localStorage.getItem('id') && observer.status == 0) {
            this.observerRequest.responseAcc()
        }

        // verifica se hhá relacionamento previamente estabelcido 
        // E adiciona o botão para excluir o relacionamento com usuario de id especifico
        if (observer && observer.status == 1) {
            this.observerRequest.responseDel()
        }
    }

    // metodo responsavel por executar as ações dos botões 
    handleButtons() {
        // captura todo os botões criados na classe ObserverRequest
        const { ButtonAdd, ButtonAcc, ButtonDel } = this.observerRequest
            // executa evento clique para adicionar observador
        ButtonAdd.addEventListener('click', () => this.observerRequest.add(this.id))
            // executa evento clique para aceitar observador
        ButtonAcc.addEventListener('click', () => this.observerRequest.acc(this.id))
            // executa evento clique para excluir observador
        ButtonDel.addEventListener('click', () => this.observerRequest.del(this.id))
    }

}

export default new Profile()