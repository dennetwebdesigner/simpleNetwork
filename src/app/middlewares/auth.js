import jwt from 'jsonwebtoken'
import authConfig from '../../config/authConfig'
import { promisify } from 'util'

export default async(req, res, next) => {

    const authHeader = req.headers.authorization


    if (!authHeader) return res.status(400).json({ error: 'token not Provided!' })


    const [, token] = authHeader.split(' ')

    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret)


        req.userId = decoded.id

        return next()

    } catch (error) {

        console.log()

        return res.status(401).json({ error: 'token invalid' })

    }

}