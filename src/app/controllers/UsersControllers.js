import User from '../models/User'

class UsersController {

    // Return all users 
    async index(req, res) {
        try {

            const user = await User.findAll({ attributes: { exclude: ['password'] } })

            if (!user) return res.status(400).json({})

            return res.json(user)

        } catch (error) {

            console.log(error)

            return res.status(500).json({})

        }
    }

    // Return all users 
    async show(req, res) {

        const { id } = req.params

        try {
            const user = await User.findOne({
                where: { id },
                attributes: { exclude: ['password'] }
            })

            if (!user) return res.status(400).json({})

            return res.json(user)

        } catch (error) {

            console.log(error)

            return res.status(500).json({})

        }
    }

    // created new user in db
    async store(req, res, next) {

        // return res.json(req.body.firstname)
        const { firstname, lastname, birthday, username, email, password } = req.body

        if (!firstname || !lastname || !birthday || !username || !email || !password) {
            return res.status(400).json({})
        }

        try {

            const userName = await User.findOne({ where: { username }, attributes: ['id'] })
            const userEmail = await User.findOne({ where: { email }, attributes: ['id'] })

            if (userEmail || userName) return res.status(404).json({})

            if (await User.create({
                    firstname,
                    lastname,
                    birthday,
                    username,
                    email,
                    password_hash: password
                })) {
                return res.json({})
            }

        } catch (error) {
            return res.status(500).json({})
        }

    }

    // update user in db with id 
    async update(req, res) {

        const { id } = req.params

        if (!req.body.text) return res.status(400).json({})

        try {

            const user = await User.findOne({ where: { id } })

            if (!user) return res.status(404).json({})

            if (await user.update({ text: req.body.text })) return res.json({})

        } catch (error) {

            return res.status(500).json({ error })

        }

    }

    // delete user in db with id 
    async destroy(req, res) {

        const { id } = req.params

        try {

            const user = await User.findOne({ where: { id } })

            if (!user) return res.status(404).json({})

            if (await user.destroy()) return res.json({})

        } catch (error) {

            return res.status(500).json({ error })

        }

    }

}

export default new UsersController()