import { baseUrl } from '../helpers.js'
import { setPostsHtml, sendNewPost, editPost } from './sendNewPost.js'
import Authorization from '../authentication.js'
import { setProfile } from './profile.js'


const iconProfile = document.querySelector('#profile-icon')
iconProfile.src = `${baseUrl}/static/image/icon-profile.png`
const iconTimeline = document.querySelector('#timeline-icon')
iconTimeline.src = `${baseUrl}/static/image/icon-timeline.png`


Authorization.isLogged()
setProfile()


setPostsHtml()

sendNewPost()


const allPostsforModify = document.querySelectorAll('.edit-post')
allPostsforModify.forEach(element => {
    element.addEventListener('click', (e) => {
        console.log(e)
    })
})