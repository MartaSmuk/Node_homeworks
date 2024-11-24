import express, { Application } from 'express';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';
import cartRoutes from './routes/cart.routes';
import { logEvent } from './utils/logger';
import EventEmitter from 'events';

// Instantiate Express application
const app: Application = express();

// Instantiate Event Emitter
const fileEventEmitter: EventEmitter = new EventEmitter();

// Define PORT
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Middleware
app.use(express.json());

// Register routes
app.use('/api/users', userRoutes);
app.use('/api', userRoutes); // Duplicate routes should be reviewed
app.use('/api/products', productRoutes);
app.use('/api/product', productRoutes); // Duplicate routes should be reviewed
app.use('/api/cart', cartRoutes);
// app.use('/api/orders', orderRoutes); // Uncomment when orderRoutes is available

// Event Listeners
fileEventEmitter.on('fileUploadStart', () => logEvent('File upload has started.'));
fileEventEmitter.on('fileUploadEnd', () => logEvent('File upload has completed.'));
fileEventEmitter.on('fileUploadFailed', (error: Error) =>
    logEvent(`File upload error: ${error.message}`)
);

// Start the server
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});


