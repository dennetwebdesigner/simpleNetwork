class MessageLog {

    constructor() {
        this.element = document.querySelector('#notification')
    }

    error(text) {
        this.element.innerHTML = text
        this.element.style.display = 'block'
        this.element.style.color = 'red'
        setTimeout(() => {
            this.element.style.display = 'none'
            this.element.style.color = 'black'
        }, 1000 * 4)
    }

    success(text) {
        this.element.innerHTML = text
        this.element.style.display = 'block'
        this.element.style.color = 'green'
    }

}

export default new MessageLog()