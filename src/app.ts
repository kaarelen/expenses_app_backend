import express from 'express'
import cookieParser from 'cookie-parser'
import 'express-async-errors'
import compression from 'compression'
import helmet from 'helmet'

import { connect_mongo_db, } from './database/database'
import { mongo_errors_middleware, } from './database/error_handler'
import { auth_router, } from './routers/auth'
import { HTTP_RESPS, } from './http_resps'
import { CONFIG, } from './config'

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

// routes
app.use('/auth/', auth_router)
app.use('/', async (req, res) => {
    new HTTP_RESPS.NotFound().send(res)
})

// error handlers
app.use(mongo_errors_middleware)
// general error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('!!!UNHANDLED EXCEPTION!!!', 'Path: ', err.name, req.path, '::', JSON.parse(JSON.stringify(err)))
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