import help from './index.js'

// classe para verificar eutentificação
class Authentication {

    constructor() {
        // conecta-se com a api
        this.api = new XMLHttpRequest();
    }

    // verifica se esta logado
    async isLogged() {

        // pega o token salvo no localStorage
        const token = window.localStorage.getItem('token')

        // verifica se o item token esta vazio
        if (!token) {
            window.location.href = '/entrar'
            return false
        }

        // retorna a verificação da api se o token é valido
        this.api.open('GET', `${help.baseUrl}/this.api/auth/validate`)

        // seta o token no header
        this.api.setRequestHeader("Authorization", `bearer ${token}`);

        // trata o que foi retornado da api
        this.api.onreadystatechange = () => {

            // redireciona caso o status não seja 200
            if (this.api.status != 200) {
                window.location.href = '/entrar'
                return false
            }

        }

        // executa a conexao e o retorno
        this.api.send()

    }

}

export default new Authentication()