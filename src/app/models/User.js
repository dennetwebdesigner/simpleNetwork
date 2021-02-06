import { Model, DataTypes } from 'sequelize'
import bcrypt from 'bcrypt'

class User extends Model {
    static init(sequelize) {
        super.init({
            firstname: DataTypes.STRING,
            lastname: DataTypes.STRING,
            birthday: DataTypes.STRING,
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            image: DataTypes.STRING,
            password: DataTypes.STRING,
            password_hash: DataTypes.VIRTUAL
        }, { sequelize })

        this.addHook('beforeSave', async user => {
            if (user.password_hash) user.password = await bcrypt.hash(user.password_hash, 8)
            return this
        })
    }

    async password_check(password) {
        return await bcrypt.compare(password, this.password)
    }

    static associate(models) {
        this.hasMany(models.Post, { foreignKey: 'user_id', as: 'posts' })
    }
}

export default User