// importa o classe Menu e já seta sem precisão de instanciar
import menu from '../helpers/Menu.js'

//verifica se foi realizado login
import Authorization from '../helpers/authentication.js'

// importa o classe que muda as paginas mobile entre linha do tempo e perfil
import displayMobile from '../helpers/displays-mobile.js'

// importa o classe  de criação modificação e/ exclusão de postagens
import PostsRequest from './PostsRequest.js'

// importa o classe que seta o perfil de cada usuario
import Profile from './profile.js'

// importa a classe para procurar pessoas pelo nome
import search from '../helpers/Search.js'


// verifica se esta logado
Authorization.isLogged()

// instancia os display de linha do tempo e perfil
displayMobile.setDisplay()

// instancia o perfil para todos os usuarios
Profile.setProfile()

// lista todas as postagens de todos os usuarios
PostsRequest.setPostsHtml()
    // cria uma nova postagem
PostsRequest.sendNewPost()