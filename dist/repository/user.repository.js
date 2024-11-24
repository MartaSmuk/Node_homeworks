"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUsers = exports.addUser = exports.users = void 0;
// storage.ts (or any appropriate name)
exports.users = [];
// Function to add a user to the users array
const addUser = (user) => {
    exports.users.push(user);
};
exports.addUser = addUser;
// Function to fetch all users
const fetchUsers = () => {
    return exports.users;
};
exports.fetchUsers = fetchUsers;
// import { users } from '../storage.js';
// export const addUser = (user) => users.push(user);
// export const fetchUsers = () => users;
