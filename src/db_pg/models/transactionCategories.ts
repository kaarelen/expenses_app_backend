import { DataTypes, Model } from 'sequelize'
import { pg_client } from '../db'
import { usersModel } from './user'

interface TransactionCategoriesInstance extends Model {
    id?: number
    name: string
    categorie_type: string
    archived: boolean
    fk_users: number
    createdAt?: Date
    updatedAt?: Date
}
const categorie_type_enum = ['expence', 'income']
const transactionCategoriesModel = pg_client.define<TransactionCategoriesInstance>(
    'transactionCategories',
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
        categorie_type: {
            type: DataTypes.ENUM,
            values: categorie_type_enum,
            allowNull: false,
        },
        archived: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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
    }
)
export {
    transactionCategoriesModel,
    categorie_type_enum,
}
