const timeLineDisplay = document.querySelector('#timeline-display')
const profileDisplay = document.querySelector('#profile-display')

const home = document.querySelector('#home')
const profile = document.querySelector('#profile')

const conteiner = document.querySelector('.content-container')


timeLineDisplay.addEventListener('click', () => {
    home.style.display = 'block'
    profile.style.display = 'none'
    timeLineDisplay.classList.add('active')
    profileDisplay.classList.remove('active')
    conteiner.style.marginBottom = '10px'
})

profileDisplay.addEventListener('click', () => {
    profile.style.display = 'flex'
    home.style.display = 'none'
    profileDisplay.classList.add('active')
    timeLineDisplay.classList.remove('active')
    conteiner.style.marginBottom = '177px'

})