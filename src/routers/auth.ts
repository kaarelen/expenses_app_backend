import express from 'express';
import jwt from 'jsonwebtoken';

import { UserModel, hash_user_passord } from '../database/models/user';
import { HTTP_RESPS } from '../http_resps';
import { CONFIG } from '../config';

const auth_router = express.Router()

auth_router
    .post('/sign_up', async (req, res, next) => {
        const email: string = req.body.email.toLocaleLowerCase()
        const password: string = req.body.password

        if (req.body?.password?.length < 5) {
            return new HTTP_RESPS.ValidationError(
                { payload: { 'fields': ['password'] } }
            ).send(res)
        }
        const user = new UserModel({
            email: email,
            password_hash: password,
            wallets: [],
            transaction_categories: [],
            transactions: [],
        })
        await user.validate()
        await UserModel.create(user)
        return new HTTP_RESPS.Created().send(res)
    })
    .post('/login', async (req, res, next) => {
        const email: string = req.body.email.toLocaleLowerCase()
        const password: string = req.body.password

        const user = await UserModel.findOne({ email: email })
        if (user) {
            if (hash_user_passord(password) == user.password_hash) {
                const accessToken = jwt.sign(
                    { username: user.email, _id: user._id, },
                    CONFIG.JWT_SECRET_TOKEN,
                    { expiresIn: '24h', jwtid: user._id.toString() },
                );
                return new HTTP_RESPS.Ok({ payload: { accessToken: accessToken } }).send(res)
            }
        }
        return new HTTP_RESPS.BadRequest().send(res)
    })

export { auth_router }