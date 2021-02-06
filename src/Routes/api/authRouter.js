import { Router } from 'express'
import authController from '../../app/controllers/AuthController'

const routes = new Router()


routes.post('/', authController.store)
routes.get('/validate', authController.show)

const path = 'auth'

export { routes, path }