import { Request, Response, NextFunction } from 'express'
import { HttpError } from 'http-errors'


export function errorHandler(
    error: HttpError,
    req: Request,
    res: Response,
    next: NextFunction) {

    const statusCode = error.status ?? 500
    const message = error.message ?? 'Interval Server Error'
    const stack = error.stack ?? ''

    return res.status(statusCode).json({
        statusCode,
        message,
        stack
    })
}