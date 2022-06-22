import express from 'express'
import jwt from 'jsonwebtoken'

import { CONFIG } from '../config'
import { HTTP_RESPS } from '../http_resps'

const auth_middleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization
    if (!authHeader) { return new HTTP_RESPS.BadRequest({ message: 'no auth token' }).send(res) }
    const token = authHeader.replace('Bearer ', '')
    jwt.verify(
        token,
        CONFIG.JWT_SECRET_TOKEN,
        (err, decoded) => {
            if (err) {
                if (err instanceof jwt.TokenExpiredError) {
                    return new HTTP_RESPS.Unauthorized({ message: 'token expired' }).send(res)
                } else if (err instanceof jwt.JsonWebTokenError) {
                    return new HTTP_RESPS.Unauthorized({ message: 'bad token' }).send(res)
                } else {
                    throw err
                }
            } else {
                // @ts-ignore. fuck jws types lib.
                if (decoded?.jti === undefined) { return new HTTP_RESPS.Unauthorized().send(res) }
                // @ts-ignore. fuck jws types lib.
                res.locals.user = decoded.jti
                next()
            }
        })
}
export { auth_middleware }