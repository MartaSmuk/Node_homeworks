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
// routes/cart.routes.ts
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("../controllers/cart.controller");
const checkUserId_1 = require("../middleware/checkUserId");
const router = express_1.default.Router();
// Checkout order route
router.post('/checkout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cart_controller_1.cartController.checkoutOrder(req, res);
    }
    catch (error) {
        res.status(500).send({ error: error.message });
    }
}));
// Add product to cart route
router.put('/:productId', checkUserId_1.checkUserId, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cart_controller_1.cartController.addProdToCart(req, res);
    }
    catch (error) {
        next(error); // Passing error to the next middleware
    }
}));
// Delete product from cart route
router.delete('/:productId', checkUserId_1.checkUserId, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cart_controller_1.cartController.deleteProductFromCart(req, res);
    }
    catch (error) {
        next(error); // Passing error to the next middleware
    }
}));
exports.default = router;
// import express from 'express';
// import { cartController } from '../controllers/cart.controller.js';
// import { checkUserId } from '../middleware/checkUserId.js';
// const router = express.Router();
// router.post('/checkout', cartController.checkoutOrder);
// router.put('/:productId', checkUserId, cartController.addProdToCart);
// router.delete('/:productId', checkUserId, cartController.deleteProductFromCart);
// export default router;
