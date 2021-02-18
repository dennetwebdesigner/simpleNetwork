import express from 'express'
import { resolve } from 'path'

const app = express()

app.use(express.static(resolve(__dirname, '..', '..', 'frontend')))
app.set('views', resolve(__dirname, '..', '..', 'frontend'))
app.engine('html', require('ejs').renderFile)
app.set('views engine', 'html')

app.use('/static/image', express.static(resolve(__dirname, '..', '..', 'frontend', 'assets', 'images')))
app.use('/static/js', express.static(resolve(__dirname, '..', '..', 'frontend', 'assets', 'js')))
app.use('/static/style', express.static(resolve(__dirname, '..', '..', 'frontend', 'assets', 'css')))

const pathFiles = [
    { path: '/perfil', file: 'profile' },
    { path: '/entrar', file: 'sign' },
    { path: '/', file: 'index' },
]

app.use(async(req, res, next) => {
    let newUrl
    if (req.query) {
        newUrl = req.url.split('?')[0]
    } else {
        newUrl = req.url
    }

    const getRoute = pathFiles.filter(({ path }) => path == newUrl)
    if (getRoute.length < 1)
        next(res.render(`404.html`))
    next()


})

pathFiles.map(({ path, file }) => {
    app.use(path, (req, res) => res.render(`${file}.html`))
})



export default app