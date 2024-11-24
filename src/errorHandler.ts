export class ApiError extends Error {
    statusCode: number;
    details?: string | Record<string, unknown>; // Optional details property

    constructor(statusCode: number, message: string, details?: string | Record<string, unknown>) {
        super(message); // Call the parent class (Error) constructor
        this.statusCode = statusCode;
        this.details = details;

        // Maintain proper stack trace in Node.js
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }
    }
}