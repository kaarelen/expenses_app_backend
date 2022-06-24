import { DataTypes, Model } from 'sequelize'
import { pg_client } from '../db'
import { transactionCategoriesModel } from './transactionCategories'
import { usersModel } from './user'
import { walletsModel } from './wallets'

interface TransactionsInstance extends Model {
    id?: number
    amount: number
    transaction_comment: string
    fk_users: number
    fk_wallets: number
    fk_transactionCategories: number
    createdAt?: Date
    updatedAt?: Date
}
const transactionsModel = pg_client.define<TransactionsInstance>(
    'transactions',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        amount: {
            type: DataTypes.DECIMAL(24, 2),
            allowNull: false,
        },
        transaction_comment: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        fk_users: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            references: {
                model: usersModel,
                key: 'id',
            }
        },
        fk_wallets: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: walletsModel,
                key: 'id',
            }
        },
        fk_transactionCategories: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: transactionCategoriesModel,
                key: 'id',
            }
        },
    }
)
export { transactionsModel }
