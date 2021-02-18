import Api from './ajax.js'
import help from './index.js'

class Search {

    constructor() {
        // conexão com a api
        this.connection = new Api()

        // capturar a tag input search do html 
        this.inputELement = document.querySelector('#search')

        // cria elemento html onde serão listados todos os usuarios encontrados
        this.listSearchUserContainer = help.makeElement('ul', document.body, { setClass: 'searchList' })
            // seta display none no elemento html criado anteriormente
        this.listSearchUserContainer.style.display = 'none'

        // captura elemento html com o icone de lupa
        this.searchIcon = document.querySelector('#search-icon')

    }

    // responsavel por mostrar, e executar ações relacionadas a encontrar usuarios atraves do nome ou sobrenome
    async localizeForName() {

        // se a tag html que guarda a listagem de usuarios esteja visivel ao clicar no icone lupa ele some
        this.searchIcon.addEventListener('click', () => {
            this.listSearchUserContainer.style.display = 'none'
        })

        // executa o evento de cada tecla pressionada
        this.inputELement.addEventListener('keydown', async e => {

            // captura o que foi digitado no input com id search
            const name = this.inputELement.value

            // verifica se ob otão de espaço foi apertado
            if (e.key == ' ' || e.key == 'Enter') {

                // torna a listagem de usuarios visivel
                if (this.listSearchUserContainer.style.display == 'none')
                    this.listSearchUserContainer.style.display = 'block'

                // conecta-se ao servidor
                const search = await this.connection.get(`/search?name=${name}`, {
                    key: "Authorization",
                    value: `Bearer ${help.token}`
                })

                // trata o que foi retornado do servidor/api
                search.onreadystatechange = () => {

                    if (search.readyState == 4) {
                        // metodo responsavel por lista usuario por usuario
                        this.setSearchListHtml(JSON.parse(search.response))
                    }

                }

            }

        })

    }

    // responsavel por adicionar ao html a lista de usuarios encontrados
    async setSearchListHtml(users) {

        // zera tag html onde ficará a listagem de usuarios encontrados
        this.listSearchUserContainer.textContent = ''

        users.forEach(user => {

            // cria uma tag de link
            const a = help.makeElement('a', this.listSearchUserContainer)
                // insere uma url na tag <a>
            a.href = `${help.baseUrl}/perfil?id=${user.id}`

            // cria uma tag html de listagem
            const li = help.makeElement('li', a)

            // insere a imagem do usuario ou padrão caso não tenha uma imagem propria
            const img = help.makeElement('img', li)
                // insere onde a imagem se encontra
            img.src = user.image == null ? `${help.baseUrl}/static/image/avatar-user.png` : `${help.baseUrl}/static/image/upload/${user.image}`

            // cria uma tag <p> html para adicionar o nome e o sobrenome do usuario
            help.makeElement('p', li, { setContent: `${user.firstname} ${user.lastname}` })
        });

    }

}

export default new Search()