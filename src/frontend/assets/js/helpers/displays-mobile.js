import help from './index.js'

class DisplayMobile {

    constructor() {

        // pega elementos html anteriormente criados ======================
        // botoes e icones dos displays
        this.timeLineDisplay = document.querySelector('#timeline-display')

        this.profileDisplay = document.querySelector('#profile-display')

        this.iconProfile = document.querySelector('#profile-icon')

        this.iconTimeline = document.querySelector('#timeline-icon')


        // containers que serão ativados ou desativados
        this.conteiner = document.querySelector('.content-container')

        this.home = document.querySelector('#home')

        this.profile = document.querySelector('#profile')

        // ============================================================
    }

    // seta ou retira a visibilidade dos containers com id home e profile 
    setDisplay() {
        //seta ou retira classe dos displays com id timeline-display e profile.display
        this.timeLineDisplay.addEventListener('click', () => {
            this.home.style.display = 'block'
            this.profile.style.display = 'none'
            this.timeLineDisplay.classList.add('active')
            this.profileDisplay.classList.remove('active')
            this.conteiner.style.marginBottom = '10px'
        })

        //seta ou retira classe dos displays com id timeline-display e profile.display

        this.profileDisplay.addEventListener('click', () => {
            this.profile.style.display = 'flex'
            this.home.style.display = 'none'
            this.profileDisplay.classList.add('active')
            this.timeLineDisplay.classList.remove('active')
            this.conteiner.style.marginBottom = '177px'
        })

        // seta as imagens atraves da conexao url com o backend
        this.iconProfile.src = `${help.baseUrl}/static/image/icon-profile.png`
        this.iconTimeline.src = `${help.baseUrl}/static/image/icon-timeline.png`
    }

}

export default new DisplayMobile()