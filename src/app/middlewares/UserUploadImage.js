import { Router } from 'express'
import User from '../models/User'
import diskStorage from '../../config/diskStorage'

const routes = new Router()

const data = new Date().toISOString().replace(/:/g, '-') + '-'
const response = diskStorage('./src/frontend/assets/images/uploads', data)


routes.post('/', response.upload.single('image'), async(req, res) => {

    const id = req.userId

    if (!id)
        res.status(401).send(JSON.stringify({}))

    const user = await User.findOne({ where: { id }, attributes: ['id', 'image'] })

    if (!user)
        res.status(404).send(JSON.stringify({}))

    if (!req.file)
        res.status(400).send(JSON.stringify({}))


    if (user.update({ image: `${data}${req.file.originalname}` }))
        res.send(JSON.stringify({}))

})

export { routes }