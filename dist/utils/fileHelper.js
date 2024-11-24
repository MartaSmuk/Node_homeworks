"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertCsvToJson = void 0;
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
// Helper to get __dirname in ES Modules
const __filename = (0, url_1.fileURLToPath)(import.meta.url);
const __dirname = path_1.default.dirname(__filename);
// Define the path to the products file
const prodFilePath = path_1.default.join(__dirname, '../products.store.json');
/**
 * Converts a CSV file to JSON format.
 *
 * @param isFileEmpty - A boolean indicating if the file is empty.
 * @param size - The size of the file in bytes.
 * @returns A promise resolving to the conversion result or an error message.
 */
const convertCsvToJson = (isFileEmpty, size) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('convertCsvToJson called with:', { isFileEmpty, size });
    try {
        if (isFileEmpty) {
            return 'File is empty, no data to import';
        }
        // Placeholder for actual CSV processing logic
        const data = {}; // Replace with actual CSV-to-JSON conversion logic
        console.log('CSV conversion successful:', data);
        return data;
    }
    catch (error) {
        console.error('Error in convertCsvToJson:', error.message);
        throw new Error('CSV conversion failed');
    }
});
exports.convertCsvToJson = convertCsvToJson;
// import path from 'path';
// import { fileURLToPath } from 'url';
// // Helper to get __dirname in ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const prodFilePath = path.join(__dirname, '../products.store.json');
// export const convertCsvToJson = async (isFileEmpty, size) => {
//     console.log('convertCsvToJson called with:', { isFileEmpty, size });
//     try {
//         if (isFileEmpty) {
//             return 'File is empty, no data to import';
//         }
//         // Assuming it processes and returns data
//         // Add code to handle CSV to JSON conversion here, for example, using csv-parser or other logic
//         const data = {}; // Placeholder for actual CSV processing result
//         console.log('CSV conversion successful:', data);
//         return data;
//     } catch (error) {
//         console.error('Error in convertCsvToJson:', error.message);
//         throw new Error('CSV conversion failed');
//     }
// };
