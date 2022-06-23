import { DataTypes, Model } from 'sequelize'
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
const wallet_type_enum = ['cash', 'card']
const currency_enum = ['USD', 'EUR', 'UAH']
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
            type: DataTypes.ENUM,
            values: wallet_type_enum,
            allowNull: false,
        },
        currency: {
            type: DataTypes.ENUM,
            values: currency_enum,
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
export {
    walletsModel,
    wallet_type_enum,
    currency_enum,
}
