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
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_service_1 = require("../services/product.service");
const errorHndler_1 = require("../utils/errorHndler"); // Assuming you have an ApiError class for custom error handling
exports.productController = {
    // Register a new product
    registerProductController: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Call the service to register the product
            const newProduct = yield product_service_1.productService.registerProduct(req.body);
            res.status(200).json({
                message: 'Product created successfully',
                product: newProduct
            });
        }
        catch (err) {
            if (err.isJoi) {
                res.status(400).json({ error: err.details[0].message });
            }
            else {
                // other errors
                console.error('Error creating product:', err);
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }),
    // Method to handle CSV file import
    importProducts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.file) {
            return res.status(400).json({ error: 'There is no file to upload' });
        }
        try {
            const { file } = req;
            if (!file) {
                return res.status(400).json({ error: 'No file uploaded.' });
            }
            // Path to the uploaded CSV file
            const result = yield product_service_1.productService.importCsvFile(file.path);
            res.status(200).json({ message: result });
        }
        catch (error) {
            console.error('Error importing products:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }),
    // Fetch all products
    getAllProductsController: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const products = yield product_service_1.productService.fetchAllProducts();
            res.status(200).json(products);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch products' });
        }
    }),
    // Get product by ID
    getProductsById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const productId = parseInt(req.params.productId, 10);
            // Call the service method to get all products
            const allProducts = yield product_service_1.productService.fetchAllProducts();
            // Find the product by ID
            const product = allProducts.find(prod => prod.id === productId);
            if (!product) {
                // Throw error if product is not found
                throw new errorHndler_1.ApiError(404, 'Product not found');
            }
            // Send the product as the response
            res.status(200).json(product);
        }
        catch (error) {
            // Handle errors
            res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
        }
    })
};
// import { productService } from '../services/product.service.js';
// export const productController = {
//     registerProductController: async (req, res) => {
//         try {
//             //Call the service to register the product
//             const newProduct = await productService.registerProduct(req.body);
//             res.status(200).json({
//                 message: 'Product created successfully',
//                 product: newProduct
//             });
//         } catch (err) {
//             if (err.isJoi) {
//                 res.status(400).json({ error: err.details[0].message });
//             } else {
//                 // other errors
//                 console.error('Error creating product:', err);
//                 res.status(500).json({ error: 'Internal server error' });
//             }
//         }
//     },
//     // Method to handle CSV file import
//     importProducts: async (req, res) => {
//         if(!req.file) {
//             return res.status(400).json({ error: 'there is no file to upload'});
//         }
//         try {
//             const { file } = req;
//             if (!file) {
//                 return res.status(400).json({ error: 'No file uploaded.' });
//             }
//             // Path to the uploaded CSV file
//             const result = await productService.importCsvFile(file.path);
//             res.status(200).json({ message: result });
//         } catch (error) {
//             console.error('Error importing products:', error);
//             res.status(500).json({ error: 'Internal server error' });
//         }
//     },
//     getAllProductsController: async (req, res) => {
//         try {
//             const products = productService.fetchAllProducts();
//             res.status(200).json(products);
//         } catch (error) {
//             res.status(500).json({ error: 'Failed to fetch products' });
//         }
//     },
//     getProductsById: async (req, res) => {
//         try {
//             const productId = parseInt(req.params.productId, 10);
//             // Call the service method to get all products
//             const allProducts = await productService.fetchAllProducts();
//             // Find the product by ID
//             const product = allProducts.find(prod => prod.id === productId);
//             if (!product) {
//                 // Throw error if product is not found
//                 throw new ApiError(404, 'Product not found');
//             }
//             // Send the product as the response
//             res.status(200).json(product);
//         } catch (error) {
//             // Handle errors
//             res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
//         }
//     },    
// }
