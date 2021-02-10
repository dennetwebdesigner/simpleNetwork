import { baseUrl, makeElement, siteTitleLogo } from './helpers.js'
window.onload = async() => {

    // rotas de endereços
    const routes = [
        { href: `${baseUrl}/`, text: 'Linha do tempo' },
        { href: `${baseUrl}/perfil`, text: 'perfil' },
    ]


    // make and set menu in pages html
    const menu = () => {

        const header = document.querySelector('header')

        const logoConteiner = makeElement('div', header, { setClass: 'logo-container' })

        makeElement('h1', logoConteiner, { setContent: siteTitleLogo })

        const section = makeElement('section', header, { setClass: 'search' })

        const searchIcon = makeElement('img', section, { setId: 'search-icon' })
        searchIcon.alt = 'pesquisar pessoas'
        searchIcon.title = 'pesquisar pessoas'
        searchIcon.src = `${baseUrl}/static/image/loupe.png`

        const inputSearch = makeElement('input', section, { setId: 'search' })
        inputSearch.placeholder = 'pesquisar pessoas'

        searchIcon.addEventListener('click', () => {
            if (document.body.clientWidth < 960)
                inputSearch.style.display = inputSearch.style.display == 'none' ? 'block' : 'none'
        })

        const nav = makeElement('nav', header, { setClass: 'main-menu' })

        const menuIcon = makeElement('img', nav, { setId: 'menu-icon' })
        menuIcon.src = `${baseUrl}/static/image/menu-icon.png`

        const ul = makeElement('ul', nav)

        routes.forEach(route => {
            const li = makeElement('li', ul)
            const link = makeElement('a', li, { setContent: route.text })
            link.href = route.href
        })

        const liLogout = makeElement('li', ul, { setId: 'logout', setContent: 'sair' })
        liLogout.style.cursor = 'pointer'

        const modal = document.querySelector('#modal-menu')
        const close = document.querySelector('#close-modal-menu')

        menuIcon.addEventListener('click', (element) => modal.style.display = 'block')
        close.addEventListener('click', (element) => modal.style.display = 'none')
    }

    const modalMenu = () => {
        const modal = makeElement('ul', document.body, { setId: 'modal-menu' })
        const close = makeElement('h1', modal, { setId: 'close-modal-menu', setContent: 'x' })

        close.style.cursor = 'pointer'

        routes.forEach(route => {
            const li = makeElement('li', modal)
            const link = makeElement('a', li, { setContent: route.text })
            link.href = route.href
        })

        const logout = makeElement('li', modal, { setContent: 'sair da conta' })

    }

    const logout = () => {
        document.querySelector('header').addEventListener('click', (e) => {
            if (e.target.id == 'logout') {
                window.localStorage.removeItem('token')
                window.localStorage.removeItem('id')
                window.location.reload(true)
            }

        })
    }


    logout()
    modalMenu()
    menu()
}