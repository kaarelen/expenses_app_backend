import express from 'express'
import sequelize from 'sequelize'

import { HTTP_RESPS } from '../../http_resps'

function pgErrorHandler(err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    if (err instanceof sequelize.BaseError) {
        if (err instanceof sequelize.ForeignKeyConstraintError) {
            return new HTTP_RESPS.BadRequest({ message: err.name }).send(res)
        } else {
            console.log('!!!UNHANDLED SEQUELIZE EXCEPTION!!!', 'Path: ', req.path, req.headers, req.body, '::', err.name, err,)
            // TODO: add notifying mechanism for unhandled exceptions
            new HTTP_RESPS.InternalServerError().send(res)
        }
    } else {
        next(err)
    }
}

export { pgErrorHandler }