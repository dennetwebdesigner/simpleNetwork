import { Router } from 'express'
import ObserversController from '../../app/controllers/ObserversController'
import authMiddleware from '../../app/middlewares/auth'

const routes = new Router()

routes.use(authMiddleware)

routes.post('/:id', ObserversController.store)
routes.get('/:id', ObserversController.index)
routes.get('/show/:id', ObserversController.show)
routes.put('/:id', ObserversController.update)
routes.delete('/:id', ObserversController.destroy)

const path = 'observers'

export { routes, path }