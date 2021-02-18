import Observer from '../models/Observer'
import User from '../models/User'
import { Op } from 'sequelize'

class ObserversController {

    async index(req, res) {
        const { id } = req.params

        if (!id)
            return res.satus(401).json({ message: 'observer' })

        try {

            const observers = await Observer.findAll({
                where: {
                    [Op.or]: [{ from: id }, { for: id }]
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [{
                        association: 'user-from',
                        attributes: ['id', 'firstname', 'lastname', 'image']
                    },
                    {
                        association: 'user-for',
                        attributes: ['id', 'firstname', 'lastname', 'image']
                    }
                ]
            })

            let newElement = []

            await observers.map(element => {

                const newObject = {
                    observer_id: element.id,
                    observer_status: element.status
                }

                if (element['user-from'].id != id) {
                    newElement.push({...newObject, user: element['user-from'] })
                } else if (element['user-for'].id != id) {
                    newElement.push({...newObject, user: element['user-for'] })
                }

            })

            return res.json(newElement)

        } catch (error) {
            return res.status(500).json({ message: 'servidor não responde!' })
        }
    }

    async show(req, res) {
        const id_one = req.userId
        const id_two = req.params.id

        if (!id_two)
            return res.satus(401).json({ message: 'observer' })

        try {

            const observers = await Observer.findOne({
                where: {
                    [Op.or]: [{ from: id_one, for: id_two }, { from: id_two, for: id_one }]
                },
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            })

            if (!observers)
                return res.json({})

            return res.json(observers)


        } catch (error) {
            return res.status(500).json({ message: 'servidor não responde!' })
        }
    }


    async store(req, res) {
        const id_one = req.userId
        const id_two = req.params.id

        if (!id_two)
            return res.satus(401).json({ message: 'observer' })

        try {

            const observer = await Observer.findOne({
                where: {
                    [Op.or]: [{ from: id_one, for: id_two }, { from: id_two, for: id_one }]
                },
                attributes: ['id']
            })

            if (observer)
                return res.status(400).json({ message: 'pedido já registro!' })

            if (await Observer.create({
                    from: id_one,
                    for: id_two,
                    status: 0
                })) {
                return res.json({ message: 'pedido de observação enviado!' })
            }
        } catch (error) {
            return res.status(500).json({ message: 'servidor não responde!' })
        }
    }

    async update(req, res) {
        const id_one = req.userId
        const id_two = req.params.id

        if (!id_two)
            return res.satus(401).json({ message: 'não pode haver colunas vazias!' })

        try {

            const observer = await Observer.findOne({
                where: {
                    [Op.or]: [{ from: id_one, for: id_two, status: 0 }, { from: id_two, for: id_one, status: 0 }]
                },
                attributes: ['id', 'status']
            })

            if (!observer)
                return res.status(400).json({ message: 'não há registros!' })

            await observer.update({ status: 1 })

            return res.json({ message: 'pedido de observação aceito!' })


        } catch (error) {
            return res.status(500).json({ message: 'servidor não responde!' })
        }
    }

    async destroy(req, res) {
        const id_one = req.userId
        const id_two = req.params.id

        try {

            const observer = await Observer.findOne({
                where: {
                    [Op.or]: [{ from: id_one, for: id_two }, { from: id_two, for: id_one }]
                },
                attributes: ['id']
            })

            if (!observer)
                return res.status(400).json({ message: 'não há registros!' })

            if (await observer.destroy())
                return res.json({ message: 'pedido de observação deletado!' })

        } catch (error) {
            return res.status(500).json({ message: 'servidor não responde!' })
        }
    }

}

export default new ObserversController()