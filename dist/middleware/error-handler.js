"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorHandler = (err, req, res, next) => {
    const message = err.message || 'Something went wrong';
    res.status(err.statusCode).json({
        success: err.isSuccess,
        status: err.statusCode,
        message: message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
};
exports.default = ErrorHandler;
//# sourceMappingURL=error-handler.js.map