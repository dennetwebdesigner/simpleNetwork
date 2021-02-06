import { Router } from 'express'
import PostsController from '../../app/controllers/PostsController'
import authMiddleware from '../../app/middlewares/auth'

const routes = new Router()

routes.use(authMiddleware)

routes.post('/', PostsController.store)
routes.get('/', PostsController.index)

const path = 'posts'

export { routes, path }