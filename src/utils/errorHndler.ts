import { Request, Response, NextFunction } from 'express';

/** 
 * Custom API Error class that extends the native Error class. 
 * Used for handling application-specific errors.
 */
export class ApiError extends Error {
    public status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        // Maintain proper stack trace for where the error was thrown
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }
    }
}

/**
 * Middleware for handling errors in the application.
 * Differentiates between known ApiError instances and other unexpected errors.
 */
export const errorHandler = (
    err: Error | ApiError, 
    req: Request, 
    res: Response, 
    next: NextFunction
): void => {
    if (err instanceof ApiError) {
        res.status(err.status).json({ error: err.message });
    } else {
        res.status(500).json({ error: 'Internal Server Error' });
        console.error('Unexpected Error:', err); // Optional: log unexpected errors for debugging
    }
};
