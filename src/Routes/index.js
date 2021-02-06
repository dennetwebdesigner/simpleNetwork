import { Router } from 'express'
import group from './api/index'


const routes = new Router()


routes.get('/', (req, res) => res.json({ api: 'online' }))
    // routes.post('/test', (req, res) => {
    //     req.
    // })

// routes.use('/auth', group.authRouter.routes)
// routes.use('/users', group.userRouter.routes)

Object.keys(group).forEach((response, index) => {
    const element = Object.values(group)[index]
    routes.use(`/${element.path}`, element.routes)
})



export { routes }