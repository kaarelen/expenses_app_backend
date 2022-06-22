import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { HTTP_RESPS } from '../http_resps'
import { CONFIG } from '../config'
import { usersModel } from '../db_pg/models/user'

const auth_router = express.Router()
auth_router
    .post('/sign_up', async (req, res, next) => {
        if (req.body?.password?.length < 5) {
            // because of hashing
            return new HTTP_RESPS.ValidationError(
                { payload: { 'fields': ['password'] } }
            ).send(res)
        }
        usersModel.create({
            email: String(req.body.email).toLocaleLowerCase(),
            password_hash: await bcrypt.hash(req.body.password, CONFIG.DB_SALT),
        })
        return new HTTP_RESPS.Created().send(res)
    })
    .post('/login', async (req, res, next) => {
        const email: string = req.body.email.toLocaleLowerCase()

        const user = await usersModel.findOne({
            where: {
                email: email
            }
        })
        if (user) {
            if (await bcrypt.hash(req.body.password, CONFIG.DB_SALT) == user.password_hash) {
                const accessToken = jwt.sign(
                    { username: user.email, user_id: user.id, },
                    CONFIG.JWT_SECRET_TOKEN,
                    { expiresIn: '24h', jwtid: `${user.id}` },
                )
                return new HTTP_RESPS.Ok({ payload: { accessToken: accessToken } }).send(res)
            }
        } else {
            return new HTTP_RESPS.BadRequest().send(res)
        }
    })

export { auth_router }