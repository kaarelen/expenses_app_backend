import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import { CONFIG } from '../../config'

function validate_password_hash(password: string) {
    return password !== undefined && password.length == 60
}
function hash_user_passord(password: string) {
    return bcrypt.hashSync(password, CONFIG.DB_SALT)
}

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
    },
    password_hash: {
        type: String,
        required: true,
        minlength: 10,
        set: hash_user_passord,
        validate: {
            validator: validate_password_hash,
            message: 'invalid password',
        },
    },
})

const UserModel = mongoose.model('user', UserSchema)

export {
    UserModel,
    hash_user_passord,
}
