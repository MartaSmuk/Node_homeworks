"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const joi_1 = __importDefault(require("joi"));
// Validation schema for the user
const schema = joi_1.default.object({
    name: joi_1.default.string().min(5).max(35).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string()
        .pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$'))
        .required()
});
// Validation function
const validateUser = (data) => {
    return schema.validateAsync(data);
};
exports.validateUser = validateUser;
// import Joi from 'joi';
// //validation of the user
// export const validateUser = (data) => {
//     const schema = Joi.object({
//         name: Joi.string().min(5).max(35).required(),
//         email: Joi.string().email().required(),
//         password: Joi.string().pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$')).required()
//     });
//     return schema.validateAsync(data);
// };
