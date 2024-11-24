"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logEvent = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Define the logEvent function with type annotations
const logEvent = (message) => {
    const timestamp = new Date().toISOString();
    // Log file path
    const logFilePath = path_1.default.join(__dirname, 'filesUpload.log');
    // Append the log message to the file
    fs_1.default.appendFileSync(logFilePath, `${timestamp} - ${message}\n`, { encoding: 'utf8' });
};
exports.logEvent = logEvent;
// import fs from 'fs';
// import path from 'path';
// export const logEvent = (message) => {
//     const timestamp = new Date().toISOString();
//     fs.appendFileSync(path.join(__dirname, 'filesUpload.log'), `${timestamp} - ${message}\n`);
// };
