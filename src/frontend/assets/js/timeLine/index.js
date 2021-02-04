import { baseUrl } from '../helpers.js'
import { setPostsHtml, sendNewPost, editPost } from './sendNewPost.js'
import Authorization from '../authentication.js'


Authorization.isLogged()
setPostsHtml()

// search icon
const searchIconElement = document.querySelector('#search-icon')
searchIconElement.src = `${baseUrl}/static/image/loupe.png`
const MenuIconElement = document.querySelector('#menu-icon')
MenuIconElement.src = `${baseUrl}/static/image/menu-icon.png`

const modalMenuElement = document.querySelector('#modal-menu')
const closeModalMenuElement = document.querySelector('#modal-menu h1')
const backModalMenuElement = document.querySelector('#back-modal-menu')

const searchInputElement = document.querySelector('#search')

searchIconElement.addEventListener('click', () => {
    if (document.body.clientWidth < 960)
        searchInputElement.style.display = searchInputElement.style.display == 'none' ? 'block' : 'none'
})

MenuIconElement.addEventListener('click', (element) => {
    modalMenuElement.style.display = 'block'
})

closeModalMenuElement.addEventListener('click', (element) => {
    modalMenuElement.style.display = 'none'
})

backModalMenuElement.addEventListener('click', (element) => {
    modalMenuElement.style.display = 'none'
})


sendNewPost()


const allPostsforModify = document.querySelectorAll('.edit-post')
allPostsforModify.forEach(element => {
    element.addEventListener('click', (e) => {
        console.log(e)
    })
})