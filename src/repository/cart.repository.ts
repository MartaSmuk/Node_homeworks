import { carts, products } from '../../src/storage';
import crypto from 'crypto';

// Define the types for Cart and Product objects
interface Product {
    id: string;
    name: string;
    price: number;
    // You can add more properties to the Product interface as needed
}

interface Cart {
    id: string;
    userId: string;
    products: Product[];
}

// Function to get cart by user ID
export const getCartByUserId = (userId: string): Cart | undefined => {
    return carts.find(carts => carts.userId === userId);
};

// Function to clear cart for a specific user
export const clearCart = (userId: string): void => {
    const cart = getCartByUserId(userId);
    if (cart) {
        cart.products = [];
    }
};

// Function to find a product by its ID
export const findProductById = async (productId: string): Promise<Product | undefined> => {
    return products.find(product => products.id === productId);
};

// Function to find or create a cart for a user
export const findOrCreateCart = async (userId: string): Promise<Cart> => {
    // Find the cart for the given user
    let cart = carts.find(cart => cart.userId === userId);

    // If no cart exists, create a new one
    if (!cart) {
        cart = {
            id: crypto.randomUUID(),
            userId,
            products: [],
        };
        carts.push(cart);
    }

    return cart;
};

// Function to find a cart by user ID
export const findCartByUserId = (userId: string): Cart | undefined => {
    return carts.find(cart => cart.userId === userId);
};

// Function to save or update a cart
export const saveCart = (cart: Cart): void => {
    const index = carts.findIndex(c => c.id === cart.id);
    if (index !== -1) {
        carts[index] = cart; // Update existing cart
    } else {
        carts.push(cart); // Add new cart
    }
};