import Sequelize from 'sequelize'
import dbConfig from '../config/database'

import Models from '../app/models'

const models = []
class Database {
    constructor() {
        this.init()
    }

    init() {
        this.connection = new Sequelize(dbConfig)

        if (models) {

            Object.keys(Models).map((object, i) => {
                const model = Object.values(Models)[i].default;
                model.init(this.connection)
            })

            models.forEach(model => {
                if (model.associate)
                    model.associate(this.connection.models)
            })
        }
    }
}

export default new Database()