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
exports.productService = void 0;
// services/product.service.ts
const crypto_1 = __importDefault(require("crypto"));
const product_schema_1 = require("../validation/product.schema");
const product_repository_1 = require("../../repository/product.repository");
const fileHelper_1 = require("../utils/fileHelper");
const promises_1 = __importDefault(require("fs/promises"));
exports.productService = {
    /**
     * Registers a new product by validating input, assigning an ID, and saving it to a file.
     * @param productData - Partial product data to be validated and saved.
     * @returns The newly registered product with an ID.
     */
    registerProduct: (productData) => __awaiter(void 0, void 0, void 0, function* () {
        // Validate the incoming product data
        const validatedProduct = yield product_schema_1.productSchema.validateAsync(productData);
        // Read the existing products from the file
        const products = yield (0, product_repository_1.readProductsFromFile)();
        // Add ID to the new product
        const newProduct = Object.assign({ id: crypto_1.default.randomUUID() }, validatedProduct);
        // Add the new product to the list and save to file
        products.push(newProduct);
        yield (0, product_repository_1.writeProductsToFile)(products);
        return newProduct;
    }),
    /**
     * Imports a CSV file, checks if the file is empty, and converts it to JSON.
     * @param filePath - Path to the CSV file.
     * @returns A JSON representation of the CSV data or a message if the file is empty.
     */
    importCsvFile: (filePath) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(`Attempting to read file at: ${filePath}`);
            const stats = yield promises_1.default.stat(filePath);
            const isFileEmpty = stats.size === 0;
            console.log(`File size is ${stats.size} bytes`);
            console.log(`Is file empty: ${isFileEmpty}`);
            // Proceed with CSV conversion
            const result = isFileEmpty
                ? yield (0, fileHelper_1.convertCsvToJson)(true, 0)
                : yield (0, fileHelper_1.convertCsvToJson)(false, stats.size - 1);
            console.log(`CSV Conversion Result: ${result}`);
            return result;
        }
        catch (error) {
            console.error('Error in importCsvFile:', error.message); // Log only the error message for brevity
            throw new Error('Failed to import CSV file');
        }
    }),
    /**
     * Fetches all products from the repository.
     * @returns An array of all products.
     */
    fetchAllProducts: () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, product_repository_1.getProducts)();
    }),
};
// // services/product.service.js
// import crypto from 'crypto';
// import { productSchema } from '../validation/product.schema.js';
// import { readProductsFromFile, writeProductsToFile } from '../repository/product.repository.js';
// import { convertCsvToJson } from '../utils/fileHelper.js';
// import { getProducts } from '../repository/product.repository.js';
// import fs from 'fs/promises';
// export const productService = {
//     registerProduct: async (productData) => {
//         // Validate the incoming product data
//         const validatedProduct = await productSchema.validateAsync(productData);
//         // Read the existing products from the file
//         const products = await readProductsFromFile();
//         // Add ID to the new product
//         const newProduct = {
//             id: crypto.randomUUID(),
//             ...validatedProduct
//         };
//         // Add the new product to the list and save to file
//         products.push(newProduct);
//         await writeProductsToFile(products);
//         return newProduct;
//     },
//     importCsvFile: async (filePath) => {
//         try {
//             // Check if file exists and log file path
//             console.log(`Attempting to read file at: ${filePath}`);
//             const stats = await fs.stat(filePath);
//             const isFileEmpty = stats.size === 0;
//             console.log(`File size is ${stats.size} bytes`);
//             console.log(`Is file empty: ${isFileEmpty}`);
//             // Proceed with CSV conversion
//             const result = isFileEmpty 
//                 ? await convertCsvToJson(true)
//                 : await convertCsvToJson(false, stats.size - 1);
//             console.log(`CSV Conversion Result: ${result}`);
//             return result;
//         } catch (error) {
//             console.error('Error in importCsvFile:', error.message);  // Log only the error message for brevity
//             throw new Error('Failed to import CSV file');
//         }
//     },
//     fetchAllProducts: async() => {
//         return getProducts();
//     },
// }
