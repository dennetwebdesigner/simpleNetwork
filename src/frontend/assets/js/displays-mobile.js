const timeLineDisplay = document.querySelector('#timeline-display')
const profileDisplay = document.querySelector('#profile-display')

const home = document.querySelector('#home')
const profile = document.querySelector('#profile')


timeLineDisplay.addEventListener('click', () => {
    home.style.display = 'block'
    profile.style.display = 'none'
    timeLineDisplay.classList.add('active')
    profileDisplay.classList.remove('active')
})

profileDisplay.addEventListener('click', () => {
    profile.style.display = 'flex'
    home.style.display = 'none'
    profileDisplay.classList.add('active')
    timeLineDisplay.classList.remove('active')
})