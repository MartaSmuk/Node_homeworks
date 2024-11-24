"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.ApiError = void 0;
/**
 * Custom API Error class that extends the native Error class.
 * Used for handling application-specific errors.
 */
class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        // Maintain proper stack trace for where the error was thrown
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }
    }
}
exports.ApiError = ApiError;
/**
 * Middleware for handling errors in the application.
 * Differentiates between known ApiError instances and other unexpected errors.
 */
const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        res.status(err.status).json({ error: err.message });
    }
    else {
        res.status(500).json({ error: 'Internal Server Error' });
        console.error('Unexpected Error:', err); // Optional: log unexpected errors for debugging
    }
};
exports.errorHandler = errorHandler;
// export class ApiError extends Error {
//     constructor(status, message) {
//         super(message);
//         this.status = status;
//     }
// }
// export const errorHandler = (err, req, res, next) => {
//     if (err instanceof ApiError) {
//         res.status(err.status).json({ error: err.message });
//     } else {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };
