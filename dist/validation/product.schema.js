"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProduct = exports.productSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// Product schema for validation (using Joi library)
exports.productSchema = joi_1.default.object({
    name: joi_1.default.string()
        .min(3)
        .max(40)
        .trim()
        .required(),
    description: joi_1.default.string()
        .min(5)
        .max(250)
        .required(),
    category: joi_1.default.string()
        .min(3)
        .max(40)
        .required(),
    price: joi_1.default.number()
        .positive()
        .precision(2)
        .required(),
});
// Export a function for validation
const validateProduct = (data) => {
    return exports.productSchema.validateAsync(data);
};
exports.validateProduct = validateProduct;
// import Joi from 'joi';
// // Product schema for validation (using Joi library)
// export const productSchema = Joi.object({
//     name: Joi.string()
//             .min(3)
//             .max(40)
//             .trim()
//             .required(),
//     description: Joi.string()
//             .min(5)
//             .max(250)
//             .required(),
//     category: Joi.string()
//             .min(3)
//             .max(40)
//             .required(),
//     price: Joi.number()
//             .positive()
//             .precision(2)
//             .required()
// })
