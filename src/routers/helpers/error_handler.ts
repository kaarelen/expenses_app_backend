import express from 'express'
import { validationResult } from 'express-validator';

import { HTTP_RESPS } from '../../http_resps';

function validationErrorHandler(req: express.Request, res: express.Response, next: express.NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return new HTTP_RESPS.ValidationError(
            { payload: errors.array() }
        ).send(res)
    } else {
        next()
    }
}
export { validationErrorHandler }