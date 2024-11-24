import fs from 'fs';
import path from 'path';

// Define the logEvent function with type annotations
export const logEvent = (message: string): void => {
    const timestamp: string = new Date().toISOString();

    // Log file path
    const logFilePath: string = path.join(__dirname, 'filesUpload.log');

    // Append the log message to the file
    fs.appendFileSync(logFilePath, `${timestamp} - ${message}\n`, { encoding: 'utf8' });
};
