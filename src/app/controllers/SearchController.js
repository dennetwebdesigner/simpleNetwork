import User from '../models/User'
import { DataTypes, Op } from 'sequelize'

class SearchController {
    // Return all users 
    async index(req, res) {
        const { name } = req.query
        const nameArray = name.split(' ')
        let search = null
        let dataArray = []
        let newArray = []



        try {
            if (nameArray && nameArray.length > 0) {

                for (let index = 0; index < nameArray.length; index++) {
                    const item = nameArray[index]
                    const user = await User.findAll({
                        where: {
                            [Op.or]: [{
                                    firstname: {
                                        [Op.like]: `%${item}%`
                                    }
                                },
                                {
                                    lastname: {
                                        [Op.like]: `%${item}%`
                                    }
                                }
                            ]
                        },
                        attributes: { exclude: ['createdAt', 'updatedAt', , 'password'] }
                    })

                    await user.forEach(async element => {
                        await dataArray.push({
                            id: element.id,
                            firstname: element.firstname,
                            lastname: element.lastname,
                            image: element.image,
                        })
                    })

                }

                newArray = [...new Map(dataArray.map(item => [item['id'], item])).values()]



                return res.json(newArray)
            }




            if (!user) return res.status(400).json({})

            return res.json(user)

        } catch (error) {

            console.log(error)

            return res.status(500).json({})

        }
    }

}

export default new SearchController()