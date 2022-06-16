import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import { CONFIG, } from '../../config'
import { WalletSchema, } from './wallet'
import { TransactionSchema } from './transaction'
import { TransactionCategorieSchema } from './transaction_type'

function validate_password_hash(password: string) {
    return password !== undefined && password.length == 60
}
function hash_user_passord(password: string) {
    return bcrypt.hashSync(password, CONFIG.DB_SALT)
}

const UserSchema = new mongoose.Schema({
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
        minlength: 5,
    },
    password_hash: {
        type: mongoose.Schema.Types.String,
        required: true,
        minlength: 10,
        set: hash_user_passord,
        validate: {
            validator: validate_password_hash,
            message: 'invalid password',
        },
    },
    wallets: {
        type: [WalletSchema],
        required: true,
    },
    transaction_categories: {
        type: [TransactionCategorieSchema],
        required: true,
    },
    transactions: {
        type: [TransactionSchema],
        required: true,
    }
})

const UserModel = mongoose.model('user', UserSchema)

export {
    UserModel,
    hash_user_passord,
}
