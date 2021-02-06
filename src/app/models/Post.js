import { Model, DataTypes } from 'sequelize'
import bcrypt from 'bcrypt'

class Post extends Model {
    static init(sequelize) {
        super.init({
            user_id: DataTypes.INTEGER,
            text: DataTypes.STRING,
        }, { sequelize })


    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    }
}

export default Post