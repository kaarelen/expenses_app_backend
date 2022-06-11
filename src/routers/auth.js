import express from 'express';

import { UserModel } from '../database/models/user.js';
import { HTTP_RESPS } from '../http_resps.js';

const auth_router = express.Router()

auth_router
    .post('/sign_up', async (req, res, next) => {
        const [email, password] = [req.body.email, req.body.password]
        if (req.body?.password?.length < 5) {
            return next(new HTTP_RESPS.ValidationError(false, ['password']))
        }
        try {
            const user = await new UserModel({
                email: email,
                password_hash: password
            })
            await user.validate()
            const m_doc = await UserModel.create(user)
            return next(new HTTP_RESPS.Created(false, m_doc)) // TODO: sick!
        }
        catch (err) {
            return next(err)
        }
    })
    .post('/login', async (req, res, next) => {
        next(new HTTP_RESPS.NotImplimented())
    })

export { auth_router }