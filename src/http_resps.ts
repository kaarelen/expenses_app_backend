import express from 'express'

interface ABSHTTPRespConstructor {
    message?: string,
    payload?: object,
}

class ABSHTTPResp extends Error {
    statusCode = 0
    payload: object = {}
    success: boolean = false

    constructor(args: ABSHTTPRespConstructor = {}) {
        super()
        this.name = this.constructor.name
        if (args.message) {
            this.message = args.message
        }
        if (args.payload) {
            this.payload = args.payload
        }
    }
    send(res: express.Response) {
        res.status(this.statusCode)
        res.send(this)
    }
}

class Ok extends ABSHTTPResp {
    statusCode = 200
    success = true
}
class Created extends ABSHTTPResp {
    statusCode = 201
    success = true
}
class Accepted extends ABSHTTPResp {
    statusCode = 202
    success = true
}

class BadRequest extends ABSHTTPResp {
    statusCode = 400
}
class ValidationError extends BadRequest { }

class Unauthorized extends ABSHTTPResp {
    statusCode = 401
}
class Forbidden extends ABSHTTPResp {
    statusCode = 403
}
class NotFound extends ABSHTTPResp {
    statusCode = 404
    message = 'API endpoint does not exists'
}

class Conflict extends ABSHTTPResp {
    statusCode = 409
}

class InternalServerError extends ABSHTTPResp {
    statusCode = 500
}
class NotImplimented extends ABSHTTPResp {
    statusCode = 501
}


const HTTP_RESPS = {
    ABSHTTPResp: ABSHTTPResp,
    Ok: Ok,
    Created: Created,
    Accepted: Accepted,
    BadRequest: BadRequest,
    Unauthorized: Unauthorized,
    Forbidden: Forbidden,
    NotFound: NotFound,
    Conflict: Conflict,
    InternalServerError: InternalServerError,
    NotImplimented: NotImplimented,
    // custom
    ValidationError: ValidationError,
}

export {
    HTTP_RESPS,
}