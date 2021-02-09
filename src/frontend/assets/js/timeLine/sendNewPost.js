import { makeElement } from '../helpers.js'
import Api from '../ajax.js'

const connection = new Api()
let data = []

export const sendNewPost = () => {
    const form = document.querySelector('#create-post')
    form.addEventListener('submit', async e => {
        e.preventDefault()


        const text = e.target.elements.createNewPost

        if (!text.value) {
            text.placeholder = 'não pode postar uma nova ideia vazia!'
            return
        }

        console.log()

        const api = await connection.post('/posts', { text: text.value }, {
            key: "Authorization",
            value: `Bearer ${window.localStorage.getItem('token')}`
        })

        const newData = {
            id: data.length + 1,
            id_user: 10,
            username: 'joatandennet',
            text: text.value,
            date: '10-12-1991 às 19:30:25'
        }

        api.onreadystatechange = async() => {
            if (api.status == 400)
                text.placeholder = 'Você não pode postar uma ideia vazia!'
            if (api.status == 500)
                alert('erro com o servidor tente mais tarde')
            if (api.status == 200) {

                if (api.readyState == 4) {
                    setPostsHtml()
                }

            }
        }

        text.value = ''
        text.plaholder = ''
    })

}

const createPost = async(allPosts, item) => {

    let date = item.created_at == item.updated_at ? item.created_at : item.updated_at

    const liElement = makeElement('li', allPosts, { setData: 'id', dataValue: `${item.id}` })

    const firstSectionElement = makeElement('section', liElement)
    const infoUserElement = makeElement('p', firstSectionElement, {
        setContent: `${item.user.firstname} ${item.user.lastname}- ${date}`
    })
    const containerActionsPost = makeElement('div', firstSectionElement, {
        setClass: 'drop-actions-post',
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
    const secondSectionElement = makeElement('section', liElement)
    const textElement = makeElement('h3', secondSectionElement, {
        setContent: `${item.text}`,
    })

    btnEditElement.addEventListener('click', e => {
        editPost(e, setItem, textElement, )
    })

    btnRemoveElement.addEventListener('click', e => {
        deletePost(e, setItem, textElement)
    })
}

export const setPostsHtml = async() => {
    const allPosts = document.querySelector('#allPosts')
    allPosts.innerHTML = ''

    const getPosts = await connection.get(`/posts`, {
        key: "Authorization",
        value: `Bearer ${window.localStorage.getItem('token')}`
    })

    getPosts.onreadystatechange = async() => {
        if (getPosts.readyState == 4) {

            if (getPosts.status == 200) {
                const posts = await JSON.parse(getPosts.response)
                const allPosts = document.querySelector('#allPosts')
                posts.forEach(post => createPost(allPosts, post))

            }
        }
    }
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
        const pElement = makeElement('p', content, { setContent: 'deseja editar esse post?' })
        const btnOkey = makeElement('button', content, { setClass: 'edit-post-okey', setContent: 'sim' })
        const btnCancel = makeElement('button', content, { setClass: 'edit-post-cancel', setContent: 'não' })

        btnOkey.addEventListener('click', () => {
            thisItem = data.find(item => item.id == setItem.dataset.id)
            thisItem.text = textareaElement.value
            setItem.textContent = ''
            createPost(allPosts, setItem, thisItem)
        })

        btnCancel.addEventListener('click', () => {
            formElement.remove()
            pElement.remove()
            btnOkey.remove()
            btnCancel.remove()
            console.log(backup)
            content.textContent = backup
        })
    })
}

export const deletePost = (btn, setItem, content) => {

    const backup = content.textContent
    content.textContent = ''

    let thisItem
    const pElement = makeElement('p', content, { setContent: 'deseja excluir esse post?' })


    const btnOkey = makeElement('button', content, { setClass: 'edit-post-okey', setContent: 'sim' })
    const btnCancel = makeElement('button', content, { setClass: 'edit-post-cancel', setContent: 'não' })

    btnOkey.addEventListener('click', () => {
        thisItem = data.find(item => item.id == setItem.dataset.id)
        data[thisItem.id - 1] = null
        setItem.remove()

    })

    btnCancel.addEventListener('click', () => {
        content.textContent = backup
    })

}