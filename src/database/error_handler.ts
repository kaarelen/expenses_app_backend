import express from 'express'
import { Error as MongooseError } from 'mongoose'
import { MongoServerError } from 'mongodb'

import { HTTP_RESPS } from '../http_resps'

interface ExpressErrorMiddleware {
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
}

function mongo_error_handler_middleware(err: MongoServerError, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (err?.code == 11000) { // already exists
        return new HTTP_RESPS.Conflict({ additional_info: err.keyPattern }).send(res)
    } else if (err?.code === 121) {
        return new HTTP_RESPS.ValidationError({ message: err.message }).send(res)
    }
    else {
        next(err)
    }
}
function moongose_error_handler_middleware(err: MongooseError, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (err instanceof MongooseError.ValidationError) {
        return new HTTP_RESPS.ValidationError(
            {
                message: err.message,
                additional_info: err.errors,
            }
        ).send(res)
    } else {
        next(err)
    }
}

function mongo_errors_middleware(err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (err instanceof MongooseError) {
        moongose_error_handler_middleware(err, req, res, next)
    }
    else if (err instanceof MongoServerError) {
        mongo_error_handler_middleware(err, req, res, next)
    } else {
        next(err)
    }
}
export { mongo_errors_middleware }