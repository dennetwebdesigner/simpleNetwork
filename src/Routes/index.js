import { Router } from 'express'
import authMiddleware from '../app/middlewares/auth'

const routes = new Router()

import UsersController from '../app/controllers/UsersControllers'
import authController from '../app/controllers/AuthController'


routes.get('/', (req, res) => res.json({ api: 'online' }))

routes.post('/auth', authController.store)
routes.post('/users', UsersController.store)

routes.post('/auth/validate', authController.show)

routes.use(authMiddleware)

routes.get('/users', UsersController.index)
routes.get('/users/:id', UsersController.show)
routes.put('/users/:id', UsersController.update)
routes.delete('/users/:id', UsersController.destroy)

export { routes }