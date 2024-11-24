"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(statusCode, message, details) {
        super(message); // Call the parent class (Error) constructor
        this.statusCode = statusCode;
        this.details = details;
        // Maintain proper stack trace in Node.js
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }
    }
}
exports.ApiError = ApiError;
// export class ApiError extends Error {
//     constructor (statusCode, message, details) {
//         super(message);
//         this.statusCode = statusCode;
//         this.details = details;
//     }
// }
