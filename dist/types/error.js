"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpStatusCodes = exports.Err = void 0;
class Err extends Error {
    constructor(message, statusCode) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.statusCode = exports.httpStatusCodes[statusCode];
        this.isSuccess = statusCode == 'OK';
        Error.captureStackTrace(this);
    }
}
exports.Err = Err;
exports.httpStatusCodes = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
    UNAUTHORIZED: 401
};
//# sourceMappingURL=error.js.map