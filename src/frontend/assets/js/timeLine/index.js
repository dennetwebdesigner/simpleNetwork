import { baseUrl } from '../helpers.js'
import { setPostsHtml, sendNewPost, editPost } from './sendNewPost.js'
import Authorization from '../authentication.js'


Authorization.isLogged()

setPostsHtml()

sendNewPost()


const allPostsforModify = document.querySelectorAll('.edit-post')
allPostsforModify.forEach(element => {
    element.addEventListener('click', (e) => {
        console.log(e)
    })
})