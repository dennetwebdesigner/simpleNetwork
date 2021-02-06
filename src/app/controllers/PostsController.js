import Post from '../models/Post'
import User from '../models/User'

class PostsController {

    async index(req, res) {

        const user_id = req.userId

        try {

            // const user = await User.findOne({ where: { id: user_id }, attributes: ['id'] })

            // if (!user) return res.status(404).json({})

            const posts = await Post.findAll({
                where: { user_id },
                attributes: ['text', 'created_at', 'updated_at'],
                include: {
                    association: 'user',
                    attributes: ['firstname', 'lastname']
                }

            })

            if (!posts) res.status(404).json({})

            return res.json(posts)

        } catch (error) {

            res.status(500).json({})

        }

    }

    async store(req, res) {
        const user_id = req.userId
        const { text } = req.body

        try {

            if (!text) return res.status(400).json({})

            const user = await User.findOne({ where: { id: user_id }, attributes: ['id'] })

            if (!user) return res.status(404).json({})

            await Post.create({ user_id, text })

            return res.json({})

        } catch (error) {
            res.status(500).json({})
        }

    }

}

export default new PostsController()