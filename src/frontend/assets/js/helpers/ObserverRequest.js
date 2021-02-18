import Api from './ajax.js'
import help from './index.js'

// classe que lida com as requisições feitas para adicionar, atualizar, rejeitar ou exlcuir observadores
class ObserverRequest {

    constructor() {

        // conecta-se a api
        this.connection = new Api()

        // pega elemento html onde os botões ficarão
        this.containerElement = document.querySelector('#container-btn-observer')

        // gera o botão de adicionar observador
        this.ButtonAdd = help.makeElement('button', null, { setData: 'type', dataValue: 'add', setContent: 'Começar a observar' })

        // gera o botão de aceitar observador
        this.ButtonAcc = help.makeElement('button', null, { setData: 'type', dataValue: 'acc', setContent: 'Aceitar pedido' })

        // gera o botão de deletar observador ou pedido
        this.ButtonDel = help.makeElement('button', null, { setData: 'type', dataValue: 'del', setContent: 'Excluir observador' })

        // reseta o conteudo do container onde os botões irão ficar
        this.containerElement.textContent = ''
    }

    // seta o botao adicionar ao container
    responseAdd() {
        this.containerElement.textContent = ''
        this.containerElement.append(this.ButtonAdd)
    }

    // seta o botao atualizar ao container    
    responseAcc() {
        this.containerElement.textContent = ''
        this.containerElement.append(this.ButtonAcc)
        this.containerElement.append(this.ButtonDel)
    }

    // seta o botao deletar ou excluir ao container    
    responseDel(flag = null) {

        // verifica se esta sendo usado para excluir um pedido ou um observador ja aceito
        const request = flag == null ? 'Excluir observador' : 'Cancelar pedido'
        this.ButtonDel.textContent = request

        this.containerElement.textContent = ''
        this.containerElement.append(this.ButtonDel)

    }

    // executa a ação de pedido ha um outro obervador
    async add(id) {

        // envia a requisição a api com o id de quem quer observar
        const request = await this.connection.post(`/observers/${id}`, {}, {
            key: "Authorization",
            value: `Bearer ${window.localStorage.getItem('token')}`
        })

        // trata o retorno da api
        request.onreadystatechange = async(id, button) => {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    // caso seja adicionado o pedido modifica o html do conteiner
                    this.responseDel({})
                } else {
                    alert('ocorreu um erro no sistema, tente novamente mais tarde!')
                }
            }
        }
    }

    // executa a ação de aceitar um pedido já existente de outro obervador
    async acc(id) {

        // envia a requisição de aceitação do pedido da api com o id de quem quer observar
        const request = await this.connection.commom('put', `/observers/${id}`, {}, {
            key: "Authorization",
            value: `Bearer ${window.localStorage.getItem('token')}`
        })

        // trata o retorno da api 
        request.onreadystatechange = async() => {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    // caso seja aceito o pedido modifica o html do conteiner
                    this.responseDel()
                } else {
                    alert('ocorreu um erro no sistema, tente novamente mais tarde!')
                }
            }
        }
    }

    // executa a ação de excluir um  já obervador adicionado 
    async del(id) {

        // envia a requisição de exclusão do observador para a api com o id de quem deseja excluir
        const request = await this.connection.commom('delete', `/observers/${id}`, {}, {
            key: "Authorization",
            value: `Bearer ${window.localStorage.getItem('token')}`
        })

        // trata o retorno da api 
        request.onreadystatechange = async() => {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    // caso seja excluido o observador modifica o html do conteiner
                    this.responseAdd()
                } else {
                    alert('ocorreu um erro no sistema, tente novamente mais tarde!')
                }
            }
        }

    }

    // executa a ação de rejeitar o pedido ja realizado de um outro obervador  
    async cancel(id) {

        // envia a requisição de exclusão do pedido do observador para a api com o id de quem deseja excluir
        const request = await this.connection.commom('delete', `/observers/${id}`, {}, {
            key: "Authorization",
            value: `Bearer ${window.localStorage.getItem('token')}`
        })

        // trata o retorno da api 
        request.onreadystatechange = async() => {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    // caso seja rejeitado o predido modifica o html do conteiner
                    this.containerElement.innerHTML = '<p>aguardando  aceitação do pedido</p>'
                    this.responseAdd()
                } else {
                    alert('ocorreu um erro no sistema, tente novamente mais tarde!')
                }
            }
        }

    }

}

export default ObserverRequest