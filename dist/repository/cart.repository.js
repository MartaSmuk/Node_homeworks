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
exports.saveCart = exports.findCartByUserId = exports.findOrCreateCart = exports.findProductById = exports.clearCart = exports.getCartByUserId = void 0;
const storage_1 = require("../storage");
const storage_2 = require("../storage");
const crypto_1 = __importDefault(require("crypto"));
// Function to get cart by user ID
const getCartByUserId = (userId) => {
    return storage_1.carts.find(cart => cart.userId === userId);
};
exports.getCartByUserId = getCartByUserId;
// Function to clear cart for a specific user
const clearCart = (userId) => {
    const cart = (0, exports.getCartByUserId)(userId);
    if (cart) {
        cart.products = [];
    }
};
exports.clearCart = clearCart;
// Function to find a product by its ID
const findProductById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return storage_2.products.find(product => product.id === productId);
});
exports.findProductById = findProductById;
// Function to find or create a cart for a user
const findOrCreateCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Find the cart for the given user
    let cart = storage_1.carts.find(cart => cart.userId === userId);
    // If no cart exists, create a new one
    if (!cart) {
        cart = {
            id: crypto_1.default.randomUUID(),
            userId,
            products: [],
        };
        storage_1.carts.push(cart);
    }
    return cart;
});
exports.findOrCreateCart = findOrCreateCart;
// Function to find a cart by user ID
const findCartByUserId = (userId) => {
    return storage_1.carts.find(cart => cart.userId === userId);
};
exports.findCartByUserId = findCartByUserId;
// Function to save or update a cart
const saveCart = (cart) => {
    const index = storage_1.carts.findIndex(c => c.id === cart.id);
    if (index !== -1) {
        storage_1.carts[index] = cart; // Update existing cart
    }
    else {
        storage_1.carts.push(cart); // Add new cart
    }
};
exports.saveCart = saveCart;
// import { carts } from '../storage.js';
// import { products } from '../storage.js';
// export const getCartByUserId = (userId) => {
//     return carts.find(cart => cart.userId === userId);
// };
// export const clearCart = (userId) => {
//     const cart = getCartByUserId(userId);
//     if (cart) {
//         cart.products = [];
//     }
// };
// export const findProductById = async (productId) => {
//     return products.find(product => product.id === productId);
// };
// export const findOrCreateCart = async (userId) => {
//     // Find the cart for the given user
//     let cart = carts.find(cart => cart.userId === userId);
//     // If no cart exists, create a new one
//     if (!cart) {
//         cart = {
//             id: crypto.randomUUID(),
//             userId,
//             products: [],
//         };
//         carts.push(cart);
//     }
//     return cart;
// };
// export const findCartByUserId = (userId) => {
//     return carts.find(cart => cart.userId === userId);
// };
// export const saveCart = (cart) => {
//     const index = carts.findIndex(c => c.id === cart.id);
//     if (index !== -1) {
//         carts[index] = cart; // Update existing cart
//     } else {
//         carts.push(cart); // Add new cart
//     }
// };
