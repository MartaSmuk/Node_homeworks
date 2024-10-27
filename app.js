import express from 'express';
import crypto from 'crypto';
import Joi from 'joi';
import fs from 'fs';
import path from 'path';
import EventEmitter from 'events';
import multer from 'multer';
import csv from 'csv-parser';
import { products } from './storage.js';
import { carts } from './storage.js';
import { users } from './storage.js';
import { orders } from './storage.js';
import { ApiError } from './errorHandler.js';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

//instantiate event Emitter
const fileEventEmitter = new EventEmitter();

app.use(express.json());

//validation of the user
const userSchema = Joi.object({
    name: Joi.string()
        .min(5)
        .max(35)
        .required(),

    password: Joi.string()
       .pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$'))
       .required(),

    email: Joi.string ()
        .email()
        .required(),
})

// Product schema for validation (using Joi library)
const productSchema = Joi.object({
    name: Joi.string()
            .min(3)
            .max(40)
            .trim()
            .required(),
    description: Joi.string()
            .min(5)
            .max(250)
            .required(),
    category: Joi.string()
            .min(3)
            .max(40)
            .required(),
    price: Joi.number()
            .positive()
            .precision(2)
            .required()
})

// Helper to get __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prodFilePath = path.join(__dirname, 'products.store.json');
const csvFilePath = path.join(__dirname, 'products.csv');
const logFilePath = path.join(__dirname, 'filesUpload.log');

//setup multer to upload files
const upload = multer({ dest: 'uploads/' });

// Helper to log events
const logEvent = (message) => {
    const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
    fs.appendFileSync(logFilePath, `${timestamp} - ${message}\n`);
};

//Event listeners setup
fileEventEmitter.on('fileUploadStart', () => logEvent('File upload has started.'));
fileEventEmitter.on('fileUploadEnd', () => logEvent('File has been uploaded.'));
fileEventEmitter.on('fileUploadFailed', (error) => logEvent(`Error occured, file cannot be uploaded; Details: ${error}`));

// Helper to check if JSON file is empty and convert CSV if needed
function convertCsvToJson(isFileEmpty, start = 0) {
    const readProductsStream = fs.createReadStream(csvFilePath);
    const writeProductsStream = fs.createWriteStream(prodFilePath, { start, flags: 'r+' });
    writeProductsStream.write(isFileEmpty ? '[' : ',');

    readProductsStream
        .pipe(csv())
        .on('data', (data) => {
            const jsonStr = JSON.stringify(data) + ',';
            writeProductsStream.write(jsonStr);
        })
        .on('end', () => {
            writeProductsStream.write(']');
            writeProductsStream.end();
        });
}

// CSV Import Route with conversion check
app.post('/products/import', upload.single('file'), (req, res) => {
    console.log(req.file);
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    // Path to the uploaded CSV file
    const filePath = req.file.path;

    // Check if JSON file is empty
    fs.stat(prodFilePath, (err, stats) => {
        if (err) throw err;

        // If JSON file is empty, start CSV conversion
        if (stats.size === 0) {
            convertCsvToJson(true);
            res.status(200).json({ message: 'CSV file has been converted to JSON successfully.' });
        } else {
            fs.open(prodFilePath, 'r+', (err, fd) => {
                if (err) throw err;
                fs.ftruncate(fd, stats.size - 1, (err) => {
                    if (err) throw err;
                    convertCsvToJson(false, stats.size - 1);
                    res.status(200).json({ message: 'CSV file has been appended to JSON successfully.' });
                });
            });
        }
    });
});

// register/create a product
app.post('/product', async(req, res) => {
    try{
        //validate the incomming product data
        const validatedProduct = await productSchema.validateAsync(req.body);
        // Read the existing products from the file
        const products = readProductsFromFile();

        //Add ID to the added product
        const newProduct = {
            id: crypto.randomUUID(),
            ...validatedProduct
        };

        //Add new product to the list
        products.push(newProduct);

        // Write the updated products list back to the file
        writeProductsToFile(products);

        //return a response of success
        res.status(201).json({
            message: 'Product created successfully',
            product: newProduct
        });  
    } catch (err) {
        if (err.isJoi) {
            res.status(400).json({ error: err.details[0].message });
        } else {
            // other errors
            console.error('Error creating product:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

// POST /products/import - Endpoint to upload and process CSV file
app.post('products/import', upload.single('file'), (req, res) => {
    if(!req.file) {
        return res.status(400).json({ error: 'there is no file to upload'});
    };
})

// register/create user
app.post('/api/register', async (req, res) => {
    try {
        const value = await userSchema.validateAsync(req.body);
        console.log('Server is working');

         // Generate a unique user ID
         const userId = crypto.randomUUID();

         // destructure validated values
         const { email, name, password } = value; 
 
         // Save new user
         const newUser = { id: userId, email, name, password };
         users.push(newUser); 
 
        console.log('New User:', newUser);

        res.status(200).json({
            message: 'Your user is registered successfully',
            user: {
                id: userId,
                email,
                name,
            }
        });
    }
    catch (err) {
        if (err.isJoi) {
            // Respond with the Joi error message if validation fails
            res.status(400).json({ error: `Invalid data: ${err.details[0].message}` });
        } else {
            // Handle other errors
            console.error('Error registering user:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

});

//get all users
app.get('/api/users', (req, res) => {
    res.status(200).json({users});
    console.log(users);
});

// Middleware to check the header of the user and its validity
function checkUserId(req, res, next) {
    const userId = req.header('x-user-id');
    console.log(userId);

    if(!userId) {
        throw new ApiError(401, 'Unauthorized: x-user-id header is required');
    }

    const user = users.find(user => user.id === userId);
    if(!user) {
        throw new ApiError(401, 'Unauthorized: Invalid user id');
    }
    req.userId = userId;
    next();
};

// отримати весь список продуктів; продукти є в доданому файлі storage.js
app.get('/api/products', (req, res) => {
    res.status(200).json(products);
});

//отримати один продукт по його id;
app.get('/api/products/:productId', (req, res) => {
    const productId = parseInt(req.params.productId, 10);
    const product = products.find(prod => prod.id === productId);

    if(!product) {
        throw new ApiError(404, 'Product not found');
    }
    res.status(200).json(product);
})

// PUT /api/cart/{productId} - додати продукт в корзину, якщо корзини немає - створити її;
app.put('/api/cart/:productId', checkUserId, (req, res) => {
    const productId = parseInt(req.params.productId);
    const userId = req.userId;

    // check whether product exists 
    const product = products.find(prod => prod.id === productId);
    if(!product) {
        throw new ApiError(404, 'Product not found')
    }

    //check whether the cart of that user already exists
    let cart = carts.find(i => i.userId === userId);
    if(!cart) {
        cart = {
            id: crypto.randomUUID(),
            userId: userId,
            products: [],
        };
        carts.push(cart);
    }
    cart.products.push(product);

    res.status(200).json({ message: 'Product is added to the cart', cart});

});

// DELETE /api/cart/{productId} - видалити продукт з корзини
app.delete('/api/cart/:productId', checkUserId, (req, res) => {
    const productId = parseInt(req.params.productId);
    const userId = req.userId;

    //find cart of the product
    let cart = carts.find(cart => cart.userId === userId);
    if(!cart) {
        throw new ApiError(404, 'Cart not found for the user');
    }

    //check whether the product exists in the cart
    const productIndex = cart.products.findIndex(prod => prod.id === productId);
    if(productIndex === -1) {
        throw new ApiError(404, 'Product not found in the cart');
    }

    //delete product from the cart
    cart.products.splice(productIndex, 1);

    res.status(200).json({ message: 'Product removed from the cart', cart });

});

//POST /api/cart/checkout - створити замовлення
app.post('/api/cart/checkout', checkUserId, (req, res) => {
    const userId = req.userId;

    //check where is user's cart
    const cart = carts.find(cart => cart.userId === userId);
    if (!cart || cart.products.length === 0) {
        throw new ApiError(400, 'Cart is empty or not found');
    }

    //calculate total price of the products in the cart
    const totalPrice = cart.products.reduce((total, product) => total + product.price, 0);

    // Create a new order
    const order = {
        id: crypto.randomUUID(),
        userId: userId,
        products: cart.products,
        totalPrice: totalPrice,
    }

    //put object new Order into array orders
    orders.push(order);

    // clear user's cart after the order was created
    cart.products = [];

    res.status(201).json({
        message: 'Order created successfully',
        order: order
    });

})

//Start the server
app.listen(3000, () => {
    console.log('App is running on port 3000');
})
