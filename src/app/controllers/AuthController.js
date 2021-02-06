import jwt from 'jsonwebtoken'
import authConfig from '../../config/authConfig'
import User from '../models/User'
import { promisify } from 'util'
import jwt from 'jsonwebtoken'

class AuthController {

    async show(req, res) {
        const authHeader = req.headers.authorization

        if (!authHeader) return res.status(400).json({ error: 'token not Provided!' })
        const [, token] = authHeader.split(' ')

        try {
            const decoded = await promisify(jwt.verify)(token, authConfig.secret)

            req.userId = decoded.id

            return res.json({})

        } catch (error) {

            console.log()

            return res.status(401).json({ error: 'token invalid' })

        }
    }

    async store(req, res) {

        const { username, password } = req.body

        if (!username || !password) return res.status(400).json({})

        try {

            const user = await User.findOne({ where: { username }, attributes: ['id', 'password'] })
            console.log(username)
            if (!user)
                return res.status(404).json({})

            if (!(await user.password_check(password)))
                return res.status(404).json({})

            return res.json({
                user: user.id,
                token: jwt.sign({ id: user.id }, authConfig.secret, {
                    expiresIn: authConfig.expiresIn
                })
            })

        } catch (error) {
            return res.status(500).json({})
        }

    }

}

export default new AuthController()