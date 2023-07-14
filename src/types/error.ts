export class Err extends Error {
    statusCode: number
    isSuccess: boolean
    constructor(message: string, statusCode: HTTP_STATUS_CODE) {
        super(message)
        Object.setPrototypeOf(this, new.target.prototype)
        this.statusCode = httpStatusCodes[statusCode]
        this.isSuccess = statusCode == 'OK'
        Error.captureStackTrace(this)
    }
}

export type HTTP_STATUS_CODE = 'OK' | 'BAD_REQUEST' | 'NOT_FOUND' | 'INTERNAL_SERVER' | 'UNAUTHORIZED'
export const httpStatusCodes: Record<HTTP_STATUS_CODE, number> = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
    UNAUTHORIZED: 401
}
