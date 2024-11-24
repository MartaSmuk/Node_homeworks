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
exports.cartServices = void 0;
// services/cart.service.ts
const cart_repository_1 = require("../../repository/cart.repository");
const order_repository_1 = require("../../repository/order.repository");
const crypto_1 = __importDefault(require("crypto"));
const errorHndler_1 = require("../utils/errorHndler");
exports.cartServices = {
    /**
     * Checkout the user's cart and create an order.
     * @param userId - The ID of the user performing the checkout.
     * @returns The created order.
     * @throws ApiError if the cart is empty or not found.
     */
    checkoutCart: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const cart = yield (0, cart_repository_1.getCartByUserId)(userId);
        // Check if the cart is empty or doesn't exist
        if (!cart || cart.products.length === 0) {
            throw new errorHndler_1.ApiError(400, 'Cart is empty or not found');
        }
        // Calculate the total price of the cart's products
        const totalPrice = cart.products.reduce((total, product) => total + product.price, 0);
        // Create a new order object
        const order = {
            id: crypto_1.default.randomUUID(),
            userId: userId,
            products: cart.products,
            totalPrice: totalPrice,
        };
        // Add the order to the repository and clear the cart
        (0, order_repository_1.createOrder)(order);
        (0, cart_repository_1.clearCart)(userId);
        return order;
    }),
    /**
     * Adds a product to the user's cart.
     * @param productId - The ID of the product to add to the cart.
     * @param userId - The ID of the user adding the product.
     * @returns The updated cart.
     * @throws ApiError if the product is not found.
     */
    addProductToCartService: (productId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        // Check if the product exists
        const product = yield (0, cart_repository_1.findProductById)(productId);
        if (!product) {
            throw new errorHndler_1.ApiError(404, 'Product not found');
        }
        // Get or create a cart for the user
        const cart = yield (0, cart_repository_1.findOrCreateCart)(userId);
        // Add the product to the cart
        cart.products.push(product);
        return cart;
    }),
    /**
     * Removes a product from the user's cart.
     * @param productId - The ID of the product to remove.
     * @param userId - The ID of the user whose cart is being modified.
     * @returns The updated cart.
     * @throws ApiError if the cart or product is not found.
     */
    removeProductFromCart: (productId, userId) => {
        // Find the user's cart
        const cart = (0, cart_repository_1.findCartByUserId)(userId);
        if (!cart) {
            throw new errorHndler_1.ApiError(404, 'Cart not found for the user');
        }
        // Find the product in the cart
        const productIndex = cart.products.findIndex(prod => prod.id === productId);
        if (productIndex === -1) {
            throw new errorHndler_1.ApiError(404, 'Product not found in the cart');
        }
        // Remove the product from the cart
        cart.products.splice(productIndex, 1);
        // Save the updated cart
        (0, cart_repository_1.saveCart)(cart);
        return cart;
    }
};
// import { getCartByUserId, clearCart, findProductById, findOrCreateCart, findCartByUserId, saveCart } from '../repository/cart.repository.js';
// import { createOrder } from '../repository/order.repository.js';
// import crypto from 'crypto';
// import { ApiError } from '../utils/errorHndler.js';
// //import { findProductById, findOrCreateCart } from '../repository/cart.repository.js';
// export const cartServices = {
//     checkoutCart: async (userId) => {
//         const cart = getCartByUserId(userId);
//         // Check if the cart is empty or doesn't exist
//         if (!cart || cart.products.length === 0) {
//             throw new ApiError(400, 'Cart is empty or not found');
//         }
//          // Calculate the total price of the cart's products
//          const totalPrice = cart.products.reduce((total, product) => total + product.price, 0);
//          // Create a new order object
//         const order = {
//             id: crypto.randomUUID(),
//             userId: userId,
//             products: cart.products,
//             totalPrice: totalPrice,
//         };
//         // Add the order to the repository and clear the cart
//         createOrder(order);
//         clearCart(userId);
//         return order;
//     },
//     addProductToCartService: async (productId, userId) => {
//         // Check if the product exists
//         const product = await findProductById(productId);
//         if (!product) {
//             throw new ApiError(404, 'Product not found');
//         }
//         // Get or create a cart for the user
//         const cart = await findOrCreateCart(userId);
//         // Add the product to the cart
//         cart.products.push(product);
//         return cart;
//     },
//     removeProductFromCart: (productId, userId) => {
//         // Find the user's cart
//         const cart = findCartByUserId(userId);
//         if (!cart) {
//             throw new ApiError(404, 'Cart not found for the user');
//         }
//         // Find the product in the cart
//         const productIndex = cart.products.findIndex(prod => prod.id === productId);
//         if (productIndex === -1) {
//             throw new ApiError(404, 'Product not found in the cart');
//         }
//         // Remove the product from the cart
//         cart.products.splice(productIndex, 1);
//         // Save the updated cart
//         saveCart(cart);
//         return cart;
//     }
// }
