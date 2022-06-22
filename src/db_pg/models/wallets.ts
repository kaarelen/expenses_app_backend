import { DataTypes, Deferrable, Model, Optional } from 'sequelize'
import { pg_client } from '../db'
import { usersModel } from './user'

interface WalletInstance extends Model {
    id?: number
    name: string
    wallet_type: string
    currency: string
    balance: number
    archived: boolean
    fk_users: number
    createdAt?: Date
    updatedAt?: Date
}
const walletsModel = pg_client.define<WalletInstance>(
    'wallets',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        name: {
            type: DataTypes.STRING(24),
            allowNull: false,
        },
        wallet_type: {
            type: DataTypes.ENUM('cash', 'card'),
            allowNull: false,
        },
        currency: {
            type: DataTypes.ENUM('USD', 'EUR', 'UAH'),
            allowNull: false,
        },
        balance: {
            type: DataTypes.DECIMAL(24, 2),
            allowNull: false,
        },
        archived: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        fk_users: {
            // fkey users
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: usersModel,
                key: 'id',
            }
        },
    }
)
export { walletsModel }
