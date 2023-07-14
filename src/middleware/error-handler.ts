import { Request, Response, NextFunction } from 'express';
import { Err } from '../types/error';

const ErrorHandler = (err: Err, req: Request, res: Response, next: NextFunction) => {
    const message = err.message || 'Something went wrong';
    res.status(err.statusCode).json({
        success: err.isSuccess,
        status: err.statusCode,
        message: message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
}

export default ErrorHandler