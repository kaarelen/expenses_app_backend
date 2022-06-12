import express from 'express';

import { UserModel } from '../database/models/user';
import { HTTP_RESPS } from '../http_resps';

const auth_router = express.Router()

auth_router
    .post('/sign_up', async (req, res, next) => {
        const [email, password] = [req.body.email, req.body.password]
        if (req.body?.password?.length < 5) {
            console.warn('warning!!!!', req.path)
            return new HTTP_RESPS.ValidationError(
                { additional_info: { 'fields': ['password'] } } // sick!! sensetive information
            ).send(res)
        }
        const user = await new UserModel({
            email: email,
            password_hash: password
        })
        await user.validate()
        const m_doc = await UserModel.create(user)
        return new HTTP_RESPS.Created().send(res)
    })
    .post('/login', async (req, res, next) => {
        return new HTTP_RESPS.NotImplimented().send(res)
    })

export { auth_router }