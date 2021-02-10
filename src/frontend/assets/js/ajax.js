import { baseUrl } from './helpers.js'

class Api {

    constructor() {
        this.connection = new XMLHttpRequest();
    }

    async get(url, auth = null) {
        this.connection.open('GET', `${baseUrl}/api${url}`)
        if (auth)
            this.connection.setRequestHeader(auth.key, auth.value);
        this.connection.send()
        return this.connection
    }

    async post(url, data, auth = null) {
        const xmlhttp = new XMLHttpRequest(); // new HttpRequest instance 
        xmlhttp.open("POST", `${baseUrl}/api${url}`);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        if (auth)
            xmlhttp.setRequestHeader(auth.key, auth.value);
        xmlhttp.send(JSON.stringify(data));
        return xmlhttp
    }

    async commom(flag, url, data = null, auth = null, permission = null) {
        const xmlhttp = new XMLHttpRequest(); // new HttpRequest instance 
        if (permission)
            xmlhttp.open(flag, `${baseUrl}/api${url}`, true)
        else
            xmlhttp.open(flag, `${baseUrl}/api${url}`)


        xmlhttp.setRequestHeader("Content-Type", "application/json");
        if (auth)
            xmlhttp.setRequestHeader(auth.key, auth.value);
        if (data)
            xmlhttp.send(JSON.stringify(data));
        return xmlhttp
    }

}

export default Api