import mongoose from 'mongoose'
import mongodb from 'mongodb'

import { HTTP_RESPS } from '../http_resps.js'


async function mongo_error_handler_middleware(err, req, res, next) {
    if (err instanceof mongodb.MongoServerError) {
        if (err?.code == 11000) { //already exists
            next(new HTTP_RESPS.Conflict(false, err.keyPattern,))
        } else if (err?.code === 121) { // validation
            next(new HTTP_RESPS.ValidationError(err.message))
        }
        else {
            console.log('!!!UNHANDLED MONGO SERVER EXCEPTION!!!', 'Path: ', err.name, req.path)
            console.log(err)
            next(new HTTP_RESPS.BadRequest('UNKNOWN ERROR'))
        }
    } else {
        next(err)
    }
}

async function moongose_error_handler_middleware(err, req, res, next) {
    if (err instanceof mongoose.Error) {
        if (err instanceof mongoose.Error.ValidationError) {
            next(new HTTP_RESPS.ValidationError(
                err.message,
                err.errors
            ))
        } else {
            console.log('UNHANDLED MONGOOSE ERROR!!!!')
            next(new HTTP_RESPS.BadRequest('UNKNOWN ERROR'))
        }
    } else {
        next(err)
    }
}

export { mongo_error_handler_middleware, moongose_error_handler_middleware }