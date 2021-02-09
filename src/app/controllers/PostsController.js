import Post from '../models/Post'
import User from '../models/User'

class PostsController {

    async index(req, res) {

        const user_id = req.userId

        try {

            // const user = await User.findOne({ where: { id: user_id }, attributes: ['id'] })

            // if (!user) return res.status(404).json({})

            const posts = await Post.findAll({
                order: [
                    ['updated_at', 'DESC']
                ],
                attributes: ['text', 'created_at', 'updated_at'],
                include: {
                    association: 'user',
                    attributes: ['id', 'firstname', 'lastname']
                }

            })

            if (!posts) res.status(404).json({})

            return res.json(posts)

        } catch (error) {

            res.status(500).json({})

        }

    }

    async show(req, res) {

        const { id } = req.params

        try {

            if (!id) return res.status(400).json({})

            // const user = await User.findOne({ where: { id: user_id }, attributes: ['id'] })

            // if (!user) return res.status(404).json({})

            const post = await Post.findAll({
                where: { id },
                attributes: ['text', 'created_at', 'updated_at'],
                include: {
                    association: 'user',
                    attributes: ['id', 'firstname', 'lastname']
                }
            })

            if (!post) res.status(404).json({})

            return res.json(post)

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

            const newPost = await Post.create({ user_id, text })

            return res.json({ id: newPost.id })

        } catch (error) {
            res.status(500).json({})
        }

    }

}

export default new PostsController()