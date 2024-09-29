import express from 'express';
import crypto from 'crypto';
import { products } from './storage.js';
import { carts } from './storage.js';
import { users } from './storage.js';
import { orders } from './storage.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// register/create user
app.post('/api/register', (req, res) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json({ error: 'Please put a correct email, name, password' });
    }

    // unique user id is generated
    const userId = crypto.randomUUID();

    //regx email check user@example.com 
    const correctEmail = /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    //check whether email format is correct. If it is wrong, return error;
    if(!correctEmail.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    //check length of the email
    if (email.length > 254) {
        return res.status(400).json({ error: 'Email is too long (max 254 characters)' });
    }

    const correctPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    //check the password
    if(!correctPassword.test(password)) {
        return res.status(400).json({ error: 'Invalid password format' });
    }

    const newUser = {id: userId, email, name, password };
    users.push(newUser);
    console.log(newUser);

    res.status(201).json({
        message: 'Your user is registered successfully',
        user: {
            id: userId,
            email,
            name,
        }
    });
});

//get all users
app.get('/api/users', (req, res) => {
    res.status(200).json(users);
    console.log
});

// Middleware to check the header of the user and its validity
function checkUserId(req, res, next) {
    const userId = req.header('x-user-id');

    if(!userId) {
        return res.status(401).json({ error: 'Unauthorized: x-user-id header is required' });
    }

    const user = users.find(user => user.id === userId);
    if(!user) {
        return res.status(401).json({ error: 'Unauthorized: Invalid user id' });
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
        return res.status(404).json({ error: 'Product not found' });
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
        return res.status(404).json({ error: 'Product not found' });
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
        return res.status(404).json({error: 'Cart not found for the user' })
    }

    //check whether the product exists in the cart
    const productIndex = cart.products.findIndex(prod => prod.id === productId);
    if(productIndex === -1) {
        return res.status(404).json({ error: 'Product not found in the cart' });
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
        return res.status(400).json({ error: 'Cart is empty or not found' });
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
