// importa o classe com metodes de auxilio
import help from '../helpers/index.js'

// importa o classe Menu e já seta sem precisão de instanciar
import menu from '../helpers/Menu.js'

//verifica se foi realizado login
import Authorization from '../helpers/authentication.js'

// importa o classe que muda as paginas mobile entre linha do tempo e perfil
import displayMobile from '../helpers/displays-mobile.js'

// importa o classe  de criação modificação e/ exclusão de postagens
import PostsRequest from '../timeLine/PostsRequest.js'

// importa o classe que seta o perfil de cada usuario
import Profile from '../timeLine/profile.js'

// importa a classe para procurar pessoas pelo nome
import search from '../helpers/Search.js'


window.onload = async() => {

    // captura a tag html com id create-post
    const formElement = document.querySelector('#create-post')

    // captura a query id caso exista 
    const query = await help.getQuerys()

    // caso seia meu perfil, faz os botões de addEventListener, acc e del observador sumir
    if (query.id != window.localStorage.getItem('id'))
        formElement.style.display = 'none'

    // verifica se esta logado
    Authorization.isLogged()

    // instancia os display de linha do tempo e perfil
    displayMobile.setDisplay()

    // instancia o perfil para todos os usuarios
    Profile.setProfile()

    // localizar uma pessoa pelo nome
    search.localizeForName()



    // lista todas as postagens de todos os usuarios
    PostsRequest.setPostsHtml('profile')

    // cria uma nova postagem
    PostsRequest.sendNewPost('profile')

}