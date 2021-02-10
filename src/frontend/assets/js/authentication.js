import { baseUrl } from './helpers.js'

class Authentication {

    // verify if has logged
    async isLogged() {

        const token = window.localStorage.getItem('token')

        if (!token) {
            window.location.href = '/entrar'
            return false
        }

        const api = new XMLHttpRequest();
        api.open('GET', `${baseUrl}/api/auth/validate`)
        api.setRequestHeader("Authorization", `bearer ${token}`);

        api.onreadystatechange = () => {

            if (api.status != 200) {
                window.location.reload(true)
                return false
            }

        }

        api.send()

    }

}

export default new Authentication()