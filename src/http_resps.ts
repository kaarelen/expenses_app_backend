import express from 'express'

interface ABSHTTPRespConstructor {
    message?: string,
    additional_info?: object,
}

class ABSHTTPResp extends Error {
    statusCode = 0
    additional_info: object = {}

    constructor(args: ABSHTTPRespConstructor = {}) {
        super()
        this.name = this.constructor.name
        if (args.message) {
            this.message = args.message
        }
        if (args.additional_info) {
            this.additional_info = args.additional_info
        }
    }
    async send(res: express.Response) {
        res.status(this.statusCode)
        await res.send(this)
    }
}

class Ok extends ABSHTTPResp {
    statusCode = 200
}
class Created extends ABSHTTPResp {
    statusCode = 201
}
class Accepted extends ABSHTTPResp {
    statusCode = 202
}

class BadRequest extends ABSHTTPResp {
    statusCode = 400
}
class ValidationError extends BadRequest { }
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
    Conflict: Conflict,
    InternalServerError: InternalServerError,
    NotImplimented: NotImplimented,
    // custom
    ValidationError: ValidationError,
}

export {
    HTTP_RESPS,
}