import express from 'express'
import { body } from 'express-validator';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { CONFIG } from '../config'
import { HTTP_RESPS } from '../http_resps'
import { validationErrorHandler } from './helpers/error_handler';
import { usersModel } from '../db_pg/models/user'

const auth_router = express.Router()
auth_router
    .post(
        '/sign_up',
        body('email').isEmail().isLength({ max: 60 }),
        body('password').isString().isLength({ min: 5 }),
        validationErrorHandler,
        async (req, res, next) => {
            usersModel.create({
                email: String(req.body.email).toLocaleLowerCase(),
                password_hash: await bcrypt.hash(req.body.password, CONFIG.DB_SALT),
            })
            return new HTTP_RESPS.Created().send(res)
        })
    .post(
        '/login',
        body('email').isEmail().isLength({ max: 60 }),
        validationErrorHandler,
        async (req, res, next) => {
            const user = await usersModel.findOne({
                where: { email: req.body.email.toLocaleLowerCase() }
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