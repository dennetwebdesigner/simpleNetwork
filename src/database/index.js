import Sequelize from 'sequelize'
import dbConfig from '../config/database'

import Models from '../app/models'
class Database {
    constructor() {
        this.init()
    }

    init() {
        this.connection = new Sequelize(dbConfig)

        Object.keys(Models).map((object, i) => {
            const model = Object.values(Models)[i].default;
            model.init(this.connection)
        })

        Object.keys(Models).forEach((object, i) => {
            const model = Object.values(Models)[i].default;
            if (model.associate)
                model.associate(this.connection.models)
        })
    }
}

export default new Database()