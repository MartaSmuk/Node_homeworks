"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./src/routes/user.routes"));
const product_routes_1 = __importDefault(require("./src/routes/product.routes"));
const cart_routes_1 = __importDefault(require("./src/routes/cart.routes"));
const logger_1 = require("./src/utils/logger");
const events_1 = __importDefault(require("events"));
// Instantiate Express application
const app = (0, express_1.default)();
// Instantiate Event Emitter
const fileEventEmitter = new events_1.default();
// Define PORT
const PORT = parseInt(process.env.PORT || '3000', 10);
// Middleware
app.use(express_1.default.json());
// Register routes
app.use('/api/users', user_routes_1.default);
app.use('/api', user_routes_1.default); // Duplicate routes should be reviewed
app.use('/api/products', product_routes_1.default);
app.use('/api/product', product_routes_1.default); // Duplicate routes should be reviewed
app.use('/api/cart', cart_routes_1.default);
// app.use('/api/orders', orderRoutes); // Uncomment when orderRoutes is available
// Event Listeners
fileEventEmitter.on('fileUploadStart', () => (0, logger_1.logEvent)('File upload has started.'));
fileEventEmitter.on('fileUploadEnd', () => (0, logger_1.logEvent)('File upload has completed.'));
fileEventEmitter.on('fileUploadFailed', (error) => (0, logger_1.logEvent)(`File upload error: ${error.message}`));
// Start the server
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
// import express from 'express';
// import userRoutes from './routes/user.routes.js';
// import productRoutes from './routes/product.routes.js';
// import cartRoutes from './routes/cart.routes.js';
// import { logEvent } from './utils/logger.js';
// import EventEmitter from 'events';
// const app = express();
// //instantiate event Emitter
// const fileEventEmitter = new EventEmitter();
// const PORT = process.env.PORT || 3000;
// // Middleware
// app.use(express.json());
// // Register routes
// app.use('/api/users', userRoutes);
// app.use('/api', userRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/product', productRoutes);
// app.use('/api/cart', cartRoutes);
// //app.use('/api/orders', orderRoutes);
// // Event Listeners
// fileEventEmitter.on('fileUploadStart', () => logEvent('File upload has started.'));
// fileEventEmitter.on('fileUploadEnd', () => logEvent('File upload has completed.'));
// fileEventEmitter.on('fileUploadFailed', (error) => logEvent(`File upload error: ${error}`));
// // Start the server
// app.listen(PORT, () => {
//     console.log(`App is running on port ${PORT}`);
// });
