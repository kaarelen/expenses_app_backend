import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import { CONFIG } from '../../config'

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text_content: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: false,
        enum: [
            'small',
            'medium',
            'big',
        ]
    }
})
const NoteModel = mongoose.model('note', NoteSchema)

function validate_password_hash(password: string) {
    return password !== undefined && password.length > 10
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
        set: (password: string) => bcrypt.hashSync(password, CONFIG.DB_SALT),
        validate: {
            validator: validate_password_hash,
            message: 'invalid password',
        },
    },
    notes: {
        type: [NoteSchema],
        required: true,
    },
})

const UserModel = mongoose.model('user', UserSchema)

export { UserModel, NoteModel }
