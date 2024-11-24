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
exports.getProducts = exports.writeProductsToFile = exports.readProductsFromFile = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const storage_1 = require("../storage"); // Assuming 'products' is exported from storage.ts
const url_1 = require("url");
// Helper to get __dirname in ES Modules
const __filename = (0, url_1.fileURLToPath)(import.meta.url);
const __dirname = path_1.default.dirname(__filename);
const filePath = path_1.default.join(__dirname, 'products.json');
// Function to read products from file
const readProductsFromFile = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield promises_1.default.readFile(filePath, 'utf8');
        return JSON.parse(data) || [];
    }
    catch (err) {
        // Return an empty array if the file doesn’t exist or any other error occurs
        console.error('Error reading products from file:', err);
        return [];
    }
});
exports.readProductsFromFile = readProductsFromFile;
// Function to write products to file
const writeProductsToFile = (products) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield promises_1.default.writeFile(filePath, JSON.stringify(products, null, 2), 'utf8');
    }
    catch (err) {
        console.error('Error writing products to file:', err);
    }
});
exports.writeProductsToFile = writeProductsToFile;
// Function to get products from the in-memory list
const getProducts = () => {
    return storage_1.products;
};
exports.getProducts = getProducts;
// // repository/product.repository.js
// import fs from 'fs/promises';
// import path from 'path';
// import { products } from '../storage.js';
// import { fileURLToPath } from 'url';
// // Helper to get __dirname in ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const filePath = path.join(__dirname, 'products.json');
// export const readProductsFromFile = async () => {
//     try {
//         const data = await fs.readFile(filePath, 'utf8');
//         return JSON.parse(data) || [];
//     } catch (err) {
//         // Return an empty array if the file doesn’t exist
//         return [];
//     }
// };
// export const writeProductsToFile = async (products) => {
//     try {
//         await fs.writeFile(filePath, JSON.stringify(products, null, 2), 'utf8');
//     } catch (err) {
//         console.error('Error writing products to file:', err);
//     }
// };
// export const getProducts = () => {
//     return products;
// };
