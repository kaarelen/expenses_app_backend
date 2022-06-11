import express from 'express'
import cookieParser from 'cookie-parser'

import { connect_mongo_db, } from './database/database.js'
import {
    mongo_error_handler_middleware,
    moongose_error_handler_middleware,
} from './database/errors_handler.js'
import { auth_router, } from './routers/auth.js'
import { HTTP_RESPS, ABSHTTPResp, } from './http_resps.js'
import { CONFIG, } from './config.js'

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
app.get('/', (req, res) => res.send('Hello World!'))
app.use('/auth/', auth_router)

// error handlers
app.use(async (err, req, res, next) => {
    console.log('123', err)
    next(err)
})

app.use(mongo_error_handler_middleware)
app.use(moongose_error_handler_middleware)

// http_resps.js
app.use(async (err, req, res, next) => {
    if (err instanceof ABSHTTPResp) {
        res.status(err.statusCode)
        console.log('GENERAL HTTP HANDLER', err)
        return await res.send(err)
    }
})

// general error handler
app.use(async (err, req, res, next) => {
    console.log('!!!UNHANDLED EXCEPTION!!!', 'Path: ', err.name, req.path, '::', JSON.parse(JSON.stringify(err)))
    const general_error = new HTTP_RESPS.InternalServerError()
    res.status(general_error.statusCode)
    await res.send(general_error)
})

export const App = {
    start: async () => {
        await connect_mongo_db()
        app.listen(
            CONFIG.EXPRESS_PORT,
            CONFIG.EXPRESS_HOST,
            () => { console.log(`express started on ${CONFIG.EXPRESS_HOST}:${CONFIG.EXPRESS_PORT}`) },
        )
    },
}
