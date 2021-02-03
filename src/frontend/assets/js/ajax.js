import { baseUrl } from './helpers.js'

class Api {

    constructor() {
        this.connection = new XMLHttpRequest();
    }

    async conne(url) {
        this.connection.open('GET', `${baseUrl}/api${url}`)
        this.connection.send()
        return this.connection
    }

    async post(url, data) {
        const xmlhttp = new XMLHttpRequest(); // new HttpRequest instance 
        xmlhttp.open("POST", `${baseUrl}/api${url}`);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(data));
        return xmlhttp
    }

}

export default Api