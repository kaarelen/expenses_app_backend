class ABSHTTPResp extends Error {
    constructor(message, additional_info) {
        super()
        this.name = this.constructor.name
        if (message) {
            this.message = message
        }
        // this.message = message ? message : this.constructor.default_message
        this.additional_info = additional_info ? additional_info : this.constructor.additional_info
    }
    statusCode = 0
    additional_info = {}
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
class ValidationError extends BadRequest {
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
    ABSHTTPResp,
}