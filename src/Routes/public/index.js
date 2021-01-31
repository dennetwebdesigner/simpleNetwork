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
    { path: '/entrar', file: 'sign' },
]

pathFiles.map(({ path, file }) => {
    app.use(path, (req, res) => res.render(`${file}.html`))
})

app.use(function(req, res, next) {
    let err = new Error('Not Found');
    if (err) {
        err.status = 404
        next(err)
    }
});

app.use('/', (req, res) => {
    res.render('index.html')
})





export default app