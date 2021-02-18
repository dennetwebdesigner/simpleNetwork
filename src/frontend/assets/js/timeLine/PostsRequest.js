import help from '../helpers/index.js'
import Api from '../helpers/ajax.js'


// classe responsavel por listar, adicionar, editar e excluir postagens feitas pelos usuarios 
class PostsRequest {

    constructor() {

        // instancia classe que se conecta a api
        this.connection = new Api()

        // captura o element cujo o id é allPosts
        // onde ficrão todas as postagens 
        this.postsContainerElement = document.querySelector('#allPosts')

        // formulario de criação de uma nova postagem
        this.form = document.querySelector('#create-post')
    }

    // reseta a tag html responsavel pela listagem das postagens
    resetContainerForZero() {
        this.postsContainerElement.innerHTML = ''
    }

    // responsavel por formatar data e hora
    dateFormat(date) {

        // captura valores do timestemp vindo de cada postage e o insere na classe Date 
        const dateTime = new Date(date)

        // array com todos os meses do ano
        const moths = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

        // insere um zero antes de um numero caso esse seja menor que dez 
        const addZero = (item) => {
            if (item < 10)
                return '0' + item
            else
                return item
        }

        // formata dataHora para padrão  dia de mês de ano às hora:minutos:segundos 
        const day = addZero(dateTime.getDate())
        const moth = moths[dateTime.getMonth()]
        const year = dateTime.getFullYear()
        const hours = addZero(dateTime.getHours())
        const minutes = addZero(dateTime.getMinutes())
        const seconds = addZero(dateTime.getSeconds())

        // returna um texto no formato padrão ja mencionado anteriormente
        return `${day} de ${moth} de ${year} às ${hours}:${minutes}:${seconds}`;
    }

    // adiciona uma nova postagem a lista de postagens já existente
    async sendNewPost(flag = null) {

        // adiciona e executa o event de enviar ao formulario
        this.form.addEventListener('submit', async e => {

            // cancela o auto carregamento da pagina 
            e.preventDefault()

            // captura a tag <textArea> do formulario
            const text = e.target.elements.createNewPost


            // verifica se estar vazio o conteudo da tag 
            if (!text.value) {
                // caso esteja vazio modifica o placeholder
                text.placeholder = 'não pode postar uma nova ideia vazia!'
                return
            }

            // conecta-se a api
            const api = await this.connection.post('/posts', { text: text.value }, {
                key: "Authorization",
                value: `Bearer ${window.localStorage.getItem('token')}`
            })

            // trata o retorno da api
            api.onreadystatechange = async() => {

                // caso haja algo errado como usuario não indentificado ou não existente
                if (api.status == 400)
                    text.placeholder = 'Você não pode postar uma ideia vazia!'

                // se ocorrer erro desconhecido ao tentar inserir ou verificar postagem ou usuario
                if (api.status == 500)
                    alert('erro com o servidor tente mais tarde')

                // se ação for executada com sucesso
                if (api.status == 200) {
                    if (api.readyState == 4) {
                        // verifica em qual pagina html será inserido a nova postagem
                        if (!flag && flag != 'profile')
                            this.setPostsHtml()
                        else
                            this.setPostsHtml('profile')

                    }
                }
            }

            // reseta o conteudo da tag <textArea> e o placeholder do mesmo
            text.value = ''
            text.plaholder = 'Crie uma nova ideia e a adicione a sua lista!'
        })
    }

    // responsavel por criar um corpo html para um post especifico
    async createPost(item) {

        // formata o timestemp para data e hora local
        const dateFormat = this.dateFormat(item.created_at)


        const liElement = help.makeElement('li', this.postsContainerElement, { setData: 'id', dataValue: `${item.id}` })

        // cria tag html onde ficará nome, sobrenome, data que foi realizada a postagem
        const firstSectionElement = help.makeElement('section', liElement)

        // cria um link para a pagina de perfil do id especifico e seta os valores
        const infoUserElement = help.makeElement('a', firstSectionElement, {
            setContent: `${item.user.firstname} ${item.user.lastname} - ${dateFormat}`
        })

        // seta a url na tag <a> 
        infoUserElement.href = `${help.baseUrl}/perfil?id=${item.user.id}`

        // verifica se o perfil que o usuario esta vendo é o dele
        if (window.localStorage.getItem('id') == item.user.id) {

            // tag html onde ficarão os botões de ação, editar e excluir
            const containerActionsPost = help.makeElement('div', firstSectionElement, {
                setClass: 'drop-actions-post',
            })

            // icone que servirá para mostrar botões quando mouse estiver em cima 
            help.makeElement('p', containerActionsPost, { setContent: '...' })

            // modal displays para os botões de ação
            const actionsPost = help.makeElement('div', containerActionsPost, {
                setClass: 'actions-post'
            })

            // botão de edição de uma postagem especifica
            const btnEditElement = help.makeElement('button', actionsPost, {
                setClass: 'edit-post',
                setContent: 'Editar'

            })

            // botão de exclusão de uma postagem especifica        
            const btnRemoveElement = help.makeElement('button', actionsPost, {
                setClass: 'remove-post',
                setContent: 'Remover'
            })

            // adiciona e executa evento de clique ao botão editar
            btnEditElement.addEventListener('click', e => {
                this.actionPost(e, liElement, textElement, 'edit')
            })

            // adiciona e executa evento de clique ao botão excluir            
            btnRemoveElement.addEventListener('click', e => {
                this.actionPost(e, liElement, textElement, 'remove')
            })
        }

        const secondSectionElement = help.makeElement('section', liElement)

        const textElement = help.makeElement('h3', secondSectionElement, {
            setContent: `${item.text}`,
        })
    }

    // responsavel por setar as postagens na tag html 
    async setPostsHtml(flag = null) {

        // zera as postagens antes da função ser executada
        this.resetContainerForZero()

        // captura o id passado pela url
        const querys = await help.getQuerys()

        //seta a url correto dependendo da flag
        // verifica a pagina html que esta instanciada na index ou profile
        const url = !flag || flag != 'profile' ? `/posts` : `/posts/${querys.id}`

        // variavel responsavel conectar-se com a api
        const getPosts = await this.connection.get(url, {
            key: "Authorization",
            value: `Bearer ${window.localStorage.getItem('token')}`
        })

        // trata resposta vinda da api 
        getPosts.onreadystatechange = async() => {
            if (getPosts.readyState == 4) {
                if (getPosts.status == 200) {
                    const posts = await JSON.parse(getPosts.response)

                    // cria um corpo html para cada postagem retornada da api
                    posts.forEach(post => this.createPost(post))
                }
            }
        }
    }

    //responsavel por executar ações de editar ou remover postagem
    async actionPost(btn, setItem, content, flag) {

        // guarda localmente o conteudo da postagem antes do pedido de edição
        const backup = content.textContent

        // limpa o container do conteudo da postagem  
        content.textContent = ''

        const p = help.makeElement('p', null)

        // botão de confirmação é criado
        const btnOkey = help.makeElement('button', null, { setClass: 'edit-post-okey', setContent: 'sim' })

        // botão para cancelamento é criado
        const btnCancel = help.makeElement('button', null, { setClass: 'edit-post-cancel', setContent: 'não' })


        // verifica se a ação é de editar
        if (flag == 'edit') {

            // cria um novo formulario para edição do conteudo da postagem especifica
            const formElement = help.makeElement('form', content, { setClass: 'create-post' })

            // cria a tag <textArea> e adiciona o conteudo anteriormente salvo localmente
            const textareaElement = help.makeElement('textarea', formElement, { setContent: backup })

            // cria botão para envio do formulario
            const inputElement = help.makeElement('input', formElement, { setContent: 'Editar' })
            inputElement.type = 'submit'

            // caso o usuario não queira editar e queira retornar a postagem para forma anterior
            const btnCancelbefore = help.makeElement('button', formElement, { setClass: 'edit-post-cancel', setContent: 'cancelar' })

            // executa a ação de cancelamento de criar uma nova postagem
            btnCancelbefore.addEventListener('click', () => {
                content.textContent = backup
            })

            // executa a ação clique para que o conteudo seja enviado
            formElement.addEventListener('submit', e => {

                // cancela ação de auto carregamento da página
                e.preventDefault()

                // verifica se o conteudo da tag <textArea> esta vazio
                if (textareaElement.value == '') {
                    textareaElement.placeholder = 'não pode estar vazio!'
                    return
                }

                // conteudo da postagem novamente é zerado
                content.textContent = ''

                // pergunta  se tal ação realmente deve ser executada
                p.textContent = 'Deseja realmente editar esse poste?'
                content.append(p)

                // botão de confirmação é criado
                content.append(btnOkey)

                // botão para cancelamento é criado
                content.append(btnCancel)

                // criar e executa evento de clique no botão de confirmação
                btnOkey.addEventListener('click', async() => {

                    // conecta-se a api
                    const setUpdate = await this.connection.commom('PUT', `/posts/${setItem.dataset.id}`, { text: textareaElement.value }, {
                        key: "Authorization",
                        value: `Bearer ${window.localStorage.getItem('token')}`
                    })

                    // trata as repsostas da api
                    setUpdate.onreadystatechange = async() => {
                        if (setUpdate.readyState == 4) {
                            // caso não haja nenhum erro ao editar postagem
                            if (setUpdate.status == 200) {
                                // adiciona o novo conteudo ao conteudo da postagem
                                content.textContent = textareaElement.value
                            }
                        }
                    }
                })

                // caso o botão de canelamento seja clicado
                btnCancel.addEventListener('click', () => {
                    content.textContent = backup
                })
            })
        }

        // verifica se a ação é de remover
        if (flag == 'remove') {
            // pergunta  se tal ação realmente deve ser executada
            p.textContent = 'Deseja realmente editar esse poste?'
            content.append(p)

            // botão de confirmação é criado
            content.append(btnOkey)

            // botão para cancelamento é criado
            content.append(btnCancel)

            // criar e executa o evento clique caso a ação de remover postagem confirmada
            btnOkey.addEventListener('click', async() => {

                // coneca-se a api
                const setDelete = await this.connection.commom('DELETE', `/posts/${setItem.dataset.id}`, {}, {
                    key: "Authorization",
                    value: `Bearer ${window.localStorage.getItem('token')}`
                }, true)

                // trata O retorno da api
                setDelete.onreadystatechange = async() => {
                    if (setDelete.readyState == 4) {

                        // caso seja efetuado a ação de exclusão da postagem feita pela api
                        if (setDelete.status == 200) {
                            // remove da listagem html
                            setItem.remove()
                        }
                    }
                }

            })

            // caso o botão de canelamento seja clicado
            btnCancel.addEventListener('click', () => {
                content.textContent = backup
            })
        }
    }

}

export default new PostsRequest()