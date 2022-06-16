import express from 'express'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import helmet from 'helmet'
import jwt from 'jsonwebtoken';
import 'express-async-errors'

import { CONFIG, } from './config'
import { HTTP_RESPS, } from './http_resps'
import { connect_mongo_db, } from './database/database'
import { mongo_errors_middleware, } from './database/error_handler'
import { auth_router, } from './routers/auth'
import { expenses_router, } from './routers/expenses'
import { wallet_router } from './routers/wallet'
import { transaction_categories_router } from './routers/transaction_categories';

const app = express()

// miidlewares
app.use(helmet())
app.use(compression())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use((req, res, next) => {
    console.log('REQUEST::', req.method, req.url, 'q::', req.query, 'b::', req.body)
    next()
})

// auth
app.use('/auth/', auth_router)
app.use(async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) { return new HTTP_RESPS.BadRequest().send(res) }
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
})
// routes
app.use('/wallet/', wallet_router)
app.use('/transaction_categories/', transaction_categories_router)
app.use('/expenses/', expenses_router)
app.use('/', async (req, res) => {
    new HTTP_RESPS.NotFound().send(res)
})

// error handlers
app.use(mongo_errors_middleware)
// general error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('!!!UNHANDLED EXCEPTION!!!', 'Path: ', req.path, req.headers, req.body, '::', err.name, err,)
    // TODO: add notifying mechanism for unhandled exceptions
    new HTTP_RESPS.InternalServerError().send(res)
})

const App = {
    start: async () => {
        await connect_mongo_db()
        app.listen(
            Number(CONFIG.EXPRESS_PORT),
            CONFIG.EXPRESS_HOST,
            () => { console.log(`express started on ${CONFIG.EXPRESS_HOST}:${CONFIG.EXPRESS_PORT}`) },
        )
    },
}

export { App }