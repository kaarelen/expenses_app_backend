import express from 'express'
import cookieParser from 'cookie-parser'

import { connect_mongo_db, } from './database/database'
import {
    mongo_error_handler_middleware,
    moongose_error_handler_middleware,
} from './database/errors_handler'
import { auth_router, } from './routers/auth'
import { HTTP_RESPS, } from './http_resps'
import { CONFIG, } from './config'

const app = express()

// miidlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use(async (req, res, next) => {
    console.log('REQUEST::', req.method, req.url, 'q::', req.query, 'b::', req.body)
    await next()
})

// routes
app.get('/', async (req, res) => {
    await new HTTP_RESPS.NotImplimented().send(res)
})
app.use('/auth/', auth_router)

// error handlers
app.use(mongo_error_handler_middleware)
app.use(moongose_error_handler_middleware)

// general error handler
app.use(async (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('!!!UNHANDLED EXCEPTION!!!', 'Path: ', err.name, req.path, '::', JSON.parse(JSON.stringify(err)))
    await new HTTP_RESPS.InternalServerError().send(res)
})

export const App = {
    start: async () => {
        await connect_mongo_db()
        app.listen(
            Number(CONFIG.EXPRESS_PORT),
            CONFIG.EXPRESS_HOST,
            () => { console.log(`express started on ${CONFIG.EXPRESS_HOST}:${CONFIG.EXPRESS_PORT}`) },
        )
    },
}
