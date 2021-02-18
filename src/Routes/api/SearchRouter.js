import { Router } from 'express'
import SearchController from '../../app/controllers/SearchController'
import authMiddleware from '../../app/middlewares/auth'

const routes = new Router()

routes.use(authMiddleware)

routes.get('/', SearchController.index)

const path = 'search'

export { routes, path }