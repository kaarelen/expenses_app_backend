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
async function mongo_error_handler_middleware(err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (err instanceof MongoServerError) {
        if (err?.code == 11000) { // already exists
            return new HTTP_RESPS.Conflict({ additional_info: err.keyPattern }).send(res)
        } else if (err?.code === 121) {
            return new HTTP_RESPS.ValidationError({ message: err.message }).send(res)
        }
        else {
            console.log('!!!UNHANDLED MONGO SERVER EXCEPTION!!!', 'Path: ', err.name, req.path)
            console.log(err)
            return new HTTP_RESPS.InternalServerError().send(res)
        }
    } else {
        next(err)
    }
}
async function moongose_error_handler_middleware(err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (err instanceof MongooseError) {
        if (err instanceof MongooseError.ValidationError) {
            return new HTTP_RESPS.ValidationError(
                {
                    message: err.message,
                    additional_info: err.errors,
                }
            ).send(res)
        } else {
            console.log('UNHANDLED MONGOOSE ERROR!!!!')
            return new HTTP_RESPS.InternalServerError().send(res)
        }
    } else {
        next(err)
    }
}

export { mongo_error_handler_middleware, moongose_error_handler_middleware }