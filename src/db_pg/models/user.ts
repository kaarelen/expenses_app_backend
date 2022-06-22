import { DataTypes, Optional, Model } from 'sequelize'
import { pg_client } from '../db'

interface UserInstance extends Model {
    id?: number
    email: string
    password_hash: string
    createdAt?: Date
    updatedAt?: Date
}

const usersModel = pg_client.define<UserInstance>(
    'users',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        email: {
            type: DataTypes.STRING(60),
            allowNull: false,
            unique: true,
            validate: {
                isLowercase: true,
                isEmail: true,
                len: [3, 60],
            }
        },
        password_hash: {
            type: DataTypes.CHAR(60),
            allowNull: false,
            validate: {
                len: [60, 60],
            },
        },
    }
)

export { usersModel }