import Api from '../ajax.js'
import { baseUrl } from '../helpers.js'
const nameElement = document.querySelector('#profile-name')
const birthdayElement = document.querySelector('#profile-birthday')
const avatarUserElement = document.querySelector('#avatar-user')


const connection = new Api()

export const setProfile = async() => {

    const idUser = window.localStorage.getItem('id')
    const getUser = await connection.get(`/users/${idUser}`, {
        key: "Authorization",
        value: `Bearer ${window.localStorage.getItem('token')}`
    })


    getUser.onreadystatechange = async() => {
        if (getUser.status == 200) {
            if (getUser.readyState == 4) {
                const infoUser = JSON.parse(getUser.response)

                nameElement.textContent = `${infoUser.firstname} ${infoUser.lastname}`
                birthdayElement.innerHTML += ` ${infoUser.birthday}`
                avatarUserElement.src = infoUser.image == null ? `${baseUrl}/static/image/avatar-user.png` : `${baseUrl}/static/image/upload/${infoUser.image}`
                avatarUserElement.style.filter = infoUser.image == null ? 'invert(100%)' : 'none'
                avatarUserElement.style.borderColor = infoUser.image == null ? 'black' : 'white'
                avatarUserElement.style.backgroundColor = 'white'
            }
        }
    }
}