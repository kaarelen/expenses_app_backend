import express from 'express'
import 'express-async-errors'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'

import { CONFIG, } from './config'
import { HTTP_RESPS, } from './http_resps'
import { auth_router, } from './routers/auth'
import { wallets_router } from './routers/wallets'
import { transaction_categories_router } from './routers/transaction_categories'
import { transactions_router } from './routers/transactions'
import { auth_middleware } from './middlewares/auth_middleware'
import { pgErrorHandler } from './db_pg/helpers/error_handler'

const app = express()
// miidlewares
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use((req, res, next) => {
    console.log('REQUEST::', req.method, req.url, 'q::', req.query, 'b::', req.body)
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
    next()
})
// auth
app.use('/auth/', auth_router)
app.use(auth_middleware)
// routes
app.use('/wallets/', wallets_router)
app.use('/transaction_categories/', transaction_categories_router)
app.use('/transactions/', transactions_router)
app.use('/', async (req, res) => {
    new HTTP_RESPS.NotFound().send(res)
})

// error handlers
app.use(pgErrorHandler)
// general error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('!!!UNHANDLED EXCEPTION!!!', 'Path: ', req.path, req.headers, req.body, '::', err.name, err,)
    // TODO: add notifying mechanism for unhandled exceptions
    new HTTP_RESPS.InternalServerError().send(res)
})

const App = {
    start: async () => {
        app.listen(
            Number(CONFIG.EXPRESS_PORT),
            CONFIG.EXPRESS_HOST,
            () => { console.log(`express started on ${CONFIG.EXPRESS_HOST}:${CONFIG.EXPRESS_PORT}`) },
        )
    },
}
export { App }