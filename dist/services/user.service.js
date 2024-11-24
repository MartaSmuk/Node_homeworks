"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.createUser = void 0;
const crypto_1 = __importDefault(require("crypto"));
const user_repository_1 = require("../../repository/user.repository");
/**
 * Creates a new user, assigns a unique ID, and stores it in the repository.
 * @param userData - Partial user data without the ID.
 * @returns The complete user object with an ID.
 */
const createUser = (userData) => {
    const user = Object.assign({ id: crypto_1.default.randomUUID() }, userData);
    (0, user_repository_1.addUser)(user);
    return user;
};
exports.createUser = createUser;
/**
 * Fetches all users from the repository.
 * @returns An array of user objects.
 */
const getAllUsers = () => (0, user_repository_1.fetchUsers)();
exports.getAllUsers = getAllUsers;
//  import crypto from 'crypto';
//  import { addUser, fetchUsers } from '../repository/user.repository.js';
//  export const createUser = (userData) => {
//     const user = { id: crypto.randomUUID(), ...userData };
//     addUser(user);
//     return user;
// };
// export const getAllUsers = () => fetchUsers();
