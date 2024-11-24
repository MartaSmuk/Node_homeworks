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
exports.getUsers = exports.registerUser = void 0;
const user_validation_1 = require("../validation/user.validation");
const user_service_1 = require("../services/user.service");
// Register a new user
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate and create the user
        const value = yield (0, user_validation_1.validateUser)(req.body);
        const user = yield (0, user_service_1.createUser)(value);
        res.status(201).json({ message: 'User registered successfully', user });
    }
    catch (error) {
        // Handle errors, distinguish between validation and other errors
        res.status(error.isJoi ? 400 : 500).json({ error: error.message });
    }
});
exports.registerUser = registerUser;
// Get all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, user_service_1.getAllUsers)();
    res.status(200).json({ users });
});
exports.getUsers = getUsers;
