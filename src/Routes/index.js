import { Router } from 'express'

const routes = new Router()

import UsersController from '../app/controllers/UsersControllers'


routes.get('/', (req, res) => res.json({ api: 'online' }))

routes.get('/users', UsersController.index)
routes.get('/users/:id', UsersController.show)
routes.post('/users', UsersController.store)
routes.put('/users/:id', UsersController.update)
routes.delete('/users/:id', UsersController.destroy)

export { routes }