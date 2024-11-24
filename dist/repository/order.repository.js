"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
// Assuming 'orders' is an array of order objects from 'storage.ts'
const storage_1 = require("../storage");
// Function to create an order
const createOrder = (order) => {
    storage_1.orders.push(order);
    return order;
};
exports.createOrder = createOrder;
// import { orders } from '../storage.js';
// export const createOrder = (order) => {
//     orders.push(order);
//     return order;
// };
