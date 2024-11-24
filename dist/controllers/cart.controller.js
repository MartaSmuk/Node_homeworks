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
exports.cartController = void 0;
const cart_service_1 = require("../services/cart.service");
const errorHndler_1 = require("../utils/errorHndler"); // Assuming you have an ApiError class for custom error handling
exports.cartController = {
    // Checkout Order
    checkoutOrder: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.headers['x-user-id']; // Assuming userId is set by checkUserId middleware
            const order = yield cart_service_1.cartServices.checkoutCart(userId);
            if (!order) {
                throw new errorHndler_1.ApiError(404, 'Order not found');
            }
            res.status(201).json({
                message: 'Order created successfully',
                order: order
            });
        }
        catch (error) {
            next(error); // Pass errors to the global error handler
        }
    }),
    // Add Product to Cart
    addProdToCart: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { productId } = req.params;
            const userId = req.headers['x-user-id']; // Set by the `checkUserId` middleware
            // Call the service to handle the logic
            const cart = yield cart_service_1.cartServices.addProductToCartService(parseInt(productId, 10), userId);
            res.status(200).json({ message: 'Product is added to the cart', cart });
        }
        catch (error) {
            next(error); // Pass errors to the global error handler
        }
    }),
    // Delete Product from Cart
    deleteProductFromCart: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const productId = parseInt(req.params.productId, 10);
            const userId = req.headers['x-user-id'];
            const updatedCart = yield cart_service_1.cartServices.removeProductFromCart(productId, userId);
            res.status(200).json({ message: 'Product removed from the cart', cart: updatedCart });
        }
        catch (error) {
            next(error); // Pass errors to the global error handler
        }
    })
};
// import { cartServices } from '../services/cart.service.js';
// export const cartController = {
//     checkoutOrder: async (req, res) => {
//         try {
//             const userId = req.userId;
//             const order = cartServices.checkoutCart(userId);
//             res.status(201).json({
//                 message: 'Order created successfully',
//                 order: order
//             });
//         } catch (error) {
//             if(!order) {
//                 throw new ApiError(404, 'Product not found');
//             }
//         }
//     },
//     addProdToCart: async (req, res, next) => {
//         try {
//             const { productId } = req.params;
//             const userId = req.userId; // Set by the `checkUserId` middleware
//             // Call the service to handle the logic
//             const cart = await cartServices.addProductToCartService(parseInt(productId, 10), userId);
//             res.status(200).json({ message: 'Product is added to the cart', cart });
//         } catch (error) {
//             next(error); // Pass errors to the global error handler
//         }
//     },
//     deleteProductFromCart: async (req, res, next) => {
//         try{
//             const productId = parseInt(req.params.productId);
//             const userId = req.userId;
//             const updatedCart = cartServices.removeProductFromCart(productId, userId);
//             res.status(200).json({ message: 'Product removed from the cart', cart: updatedCart });
//         } catch (error) {
//             next(error); 
//         }
//     }
// }
