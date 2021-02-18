import { Model, DataTypes } from 'sequelize'
import bcrypt from 'bcrypt'

class Observer extends Model {
    static init(sequelize) {
        super.init({
            from: DataTypes.INTEGER,
            for: DataTypes.INTEGER,
            status: DataTypes.INTEGER,
        }, { sequelize })


    }

    static associate(models) {

        this.belongsTo(models.User, { foreignKey: 'from', as: 'user-from' })
        this.belongsTo(models.User, { foreignKey: 'for', as: 'user-for' })

    }
}

export default Observer