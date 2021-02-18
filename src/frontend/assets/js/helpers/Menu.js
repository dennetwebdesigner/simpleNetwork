import help from './index.js'
import Search from './search.js'

// rotas de endereços
const routes = [
    { href: `${help.baseUrl}/`, text: 'Linha do tempo' },
    { href: `${help.baseUrl}/perfil?id=${window.localStorage.getItem('id')}`, text: 'perfil' },
]


class Menu {


    constructor() {
        // pega elemento html header
        this.header = document.querySelector('header')

        // cria tag modal e seta virtualmente no body
        this.modal = help.makeElement('ul', document.body, { setId: 'modal-menu' })

        // cria botão para fechar modal
        this.close = help.makeElement('h1', this.modal, { setId: 'close-modal-menu', setContent: 'x' })

        // starta modal ao instanciar a classe
        this.modalMenu()

        // starta menu desktop ao instanciar a classe
        this.setMenu()
    }


    // criar e seta o menu nas paginas html
    setMenu() {

        // criar o lugar onde o logo irá ficar
        const logoConteiner = help.makeElement('div', this.header, { setClass: 'logo-container' })

        // seta o logo como titulo
        const logoItem = help.makeElement('h1', logoConteiner)

        // seta um link e o conteudo ao logo
        const logoLink = help.makeElement('a', logoItem, { setContent: help.siteTitleLogo })
        logoLink.href = routes[0].href

        // cria onde o input search irá ficar
        const section = help.makeElement('section', this.header, { setClass: 'search' })

        // seta o icone do logo para monitores pequenos ou celulares
        const searchIcon = help.makeElement('img', section, { setId: 'search-icon' })
        searchIcon.alt = 'pesquisar pessoas'
        searchIcon.title = 'pesquisar pessoas'
        searchIcon.src = `${help.baseUrl}/static/image/loupe.png`

        // cria o input search
        const inputSearch = help.makeElement('input', section, { setId: 'search' })
        inputSearch.placeholder = 'pesquisar pessoas'
        inputSearch.style.display = 'none'

        // executa a ação de mostrar ou sumir do icone dependendo do tamanho da tela
        searchIcon.addEventListener('click', () => {
            inputSearch.style.display = inputSearch.style.display == 'none' ? 'block' : 'none'
            Search.listSearchUserContainer.style.display = 'none'
        })


        // cria a tag html de navegação
        const nav = help.makeElement('nav', this.header, { setClass: 'main-menu' })

        // cria o icone de menu para monitores pequenos ou celulares
        const menuIcon = help.makeElement('img', nav, { setId: 'menu-icon' })
        menuIcon.src = `${help.baseUrl}/static/image/menu-icon.png`

        // seta uma lista não ordenada
        const ul = help.makeElement('ul', nav)

        // e seta o conteudo e os links para cada rota pré existente
        routes.forEach(route => {
            const li = help.makeElement('li', ul)
            const link = help.makeElement('a', li, { setContent: route.text })
            link.href = route.href
        })

        // cria o link para logout/sair da conta
        const liLogout = help.makeElement('li', ul, { setId: 'logout', setContent: 'sair' })
        liLogout.style.cursor = 'pointer'

        // quando o icone menu é clicado o menu de celular aparece
        menuIcon.addEventListener('click', (element) => this.modal.style.display = 'block')

        // executa a ação de sair da conta quando clica no menu sair
        liLogout.addEventListener('click', () => this.logout())


    }

    // cria e seta o menu para celulares
    modalMenu = () => {

        // seta ao botao fechar o cursor point
        this.close.style.cursor = 'pointer'

        // e seta o conteudo e os links para cada rota pré existente
        routes.forEach(route => {
            const li = help.makeElement('li', this.modal)
            const link = help.makeElement('a', li, { setContent: route.text })
            link.href = route.href
        })

        // cria o link para logout/sair da conta
        const logout = help.makeElement('li', this.modal, { setContent: 'sair da conta' })

        // cria o botão de fechar do modal menu 
        this.close.addEventListener('click', (element) => this.modal.style.display = 'none')

        // executa a ação de sair da conta quando clica no menu sair
        logout.addEventListener('click', () => this.logout())

    }

    // sai da conta limpando token e id do local storage e recarregando a pagina 
    logout = () => {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('id')
        window.location.reload(true)
    }

}

export default new Menu()