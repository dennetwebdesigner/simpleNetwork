class Help {

    constructor() {

        // link de acesso com o banco a api
        this.baseUrl = 'http://localhost:3000'

        // Titulo ou logo do site
        this.siteTitleLogo = ' Simple NetWork '

        // principal cor de fundo do site
        this.backgroundColor = '#fff'

        // caso exista um token no localstorage
        this.token = window.localStorage.getItem('token') ? window.localStorage.getItem('token') : null
    }

    // gera virutalmente novos elementos html
    //exemplo makeElement('div', document.body, {setId: 'nome',setClass: 'container', setContent: 'texto', setData: 'id', dataValue: '2'})
    makeElement(html, setElement = null, att = null) {

        // cria o novo element html
        const newElement = document.createElement(html)

        // seta atributos como id, class, dataset conteudo
        if (att && att.setClass) newElement.setAttribute('class', att.setClass)
        if (att && att.setId) newElement.setAttribute('id', att.setId)
        if (att && att.setContent) newElement.textContent = att.setContent
        if (att && att.setData && att.dataValue)
            newElement.dataset[att.setData] = att.dataValue
        if (html == 'input' && att && att.setContent || html == 'textarea' && att && att.setContent) newElement.value = att.setContent

        // seta o elemento criado em um elemento ja existente
        if (setElement != null)
            setElement.append(newElement)

        // retorna o elemento e seta atributos
        return newElement

    }

    // pegar as querys passada pela url
    async getQuerys() {

        // pega url passada no navegador e quebra em um array
        const querys = window.location.href.split('?')

        // deleta o primeiro item dop array
        querys.shift()

        // novo array  zerado
        let newObject = []

        // retona novo objeto com chave e valor
        await querys.map(query => {

            const newItem = query.split('=')

            newObject = {
                [newItem[0]]: newItem[1]
            }

        })

        //retorna o novo objeto
        return newObject

    }


}

export default new Help()