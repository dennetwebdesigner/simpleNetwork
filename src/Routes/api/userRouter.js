import { Router } from 'express'
import UsersController from '../../app/controllers/UsersControllers'
import authMiddleware from '../../app/middlewares/auth'
import { routes as UserUploadImage } from '../../app/middlewares/UserUploadImage'

const routes = new Router()

routes.post('/', UsersController.store)


routes.use(authMiddleware)

routes.use('/upload', UserUploadImage)

routes.get('/', UsersController.index)
routes.get('/:id', UsersController.show)
routes.put('/:id', UsersController.update)
routes.delete('/:id', UsersController.destroy)

const path = 'users'


export { routes, path }