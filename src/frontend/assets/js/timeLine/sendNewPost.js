import { makeElement } from '../helpers.js'

let data = []

export const sendNewPost = () => {
    const form = document.querySelector('#create-post')
    form.addEventListener('submit', e => {
        e.preventDefault()
        console.log('click')
        const text = e.target.elements.createNewPost

        if (!text.value) {
            text.placeholder = 'não pode postar uma nova ideia vazia!'
            return
        }

        const newData = {
            id: data.length + 1,
            id_user: 10,
            username: 'joatandennet',
            text: text.value,
            date: '10-12-1991 às 19:30:25'
        }

        data.push(newData)
        setPostsHtml()

        text.value = ''
        text.plaholder = ''
    })

}

const createPost = (allPosts, setItem, item) => {

    const firstSectionElement = makeElement('section', setItem)
    const infoUserElement = makeElement('p', firstSectionElement, {
        setContent: `${item.username}- ${item.date}`
    })
    const containerActionsPost = makeElement('div', firstSectionElement, {
        setClass: 'drop-actions-post'
    })
    const iconDropActionElement = makeElement('p', containerActionsPost, { setContent: '...' })
    const actionsPost = makeElement('div', containerActionsPost, {
        setClass: 'actions-post'
    })
    const btnEditElement = makeElement('button', actionsPost, {
        setClass: 'edit-post',
        setContent: 'Editar'

    })
    const btnRemoveElement = makeElement('button', actionsPost, {
        setClass: 'remove-post',
        setContent: 'Remover'
    })
    const secondSectionElement = makeElement('section', setItem)
    const textElement = makeElement('h3', secondSectionElement, {
        setContent: `${item.text}`,
    })

    btnEditElement.addEventListener('click', e => {
        editPost(e, setItem, textElement)
    })
}

export const setPostsHtml = () => {
    const allPosts = document.querySelector('#allPosts')
    allPosts.innerHTML = ''

    data.forEach(item => {
        const liElement = makeElement('li', allPosts, { setData: 'id', dataValue: `${item.id}` })
        createPost(allPosts, liElement, item)
    })

}

export const editPost = (btn, setItem, content) => {

    const backup = content.textContent
    content.textContent = ''

    const formElement = makeElement('form', content, { setClass: 'create-post' })
    const textareaElement = makeElement('textarea', formElement, { setContent: data[setItem.dataset.id - 1].text })
    const inputElement = makeElement('input', formElement, { setContent: 'Editar' })
    inputElement.type = 'submit'


    let thisItem

    formElement.addEventListener('submit', e => {
        e.preventDefault()

        if (textareaElement.value == '') {
            textareaElement.placeholder = 'não pode estar vazio!'
            return
        }

        content.textContent = ''

        const btnOkey = makeElement('button', content, { setClass: 'edit-post-okey', setContent: 'concluir' })
        const btnCancel = makeElement('button', content, { setClass: 'edit-post-cancel', setContent: 'cancelar' })

        btnOkey.addEventListener('click', () => {
            thisItem = data.find(item => item.id == setItem.dataset.id)
            thisItem.text = textareaElement.value
            setItem.textContent = ''
            createPost(allPosts, setItem, thisItem)
        })

        btnCancel.addEventListener('click', () => {
            formElement.remove()
            btnOkey.remove()
            btnCancel.remove()
            console.log(backup)
            content.textContent = backup
        })
    })
}