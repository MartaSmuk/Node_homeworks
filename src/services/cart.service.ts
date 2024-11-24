// services/cart.service.ts
import { getCartByUserId, clearCart, findProductById, findOrCreateCart, findCartByUserId, saveCart } from '../../repository/cart.repository';
import { createOrder } from '../repository/order.repository';
import crypto from 'crypto';
import { ApiError } from '../utils/errorHndler';

// Define the interfaces for Cart and Product
interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
}

interface Cart {
    userId: string;
    products: Product[];
}

interface Order {
    id: string;
    userId: string;
    products: Product[];
    totalPrice: number;
}

export const cartServices = {
    /**
     * Checkout the user's cart and create an order.
     * @param userId - The ID of the user performing the checkout.
     * @returns The created order.
     * @throws ApiError if the cart is empty or not found.
     */
    checkoutCart: async (userId: string): Promise<Order> => {
        const cart = await getCartByUserId(userId);
    
        // Check if the cart is empty or doesn't exist
        if (!cart || cart.products.length === 0) {
            throw new ApiError(400, 'Cart is empty or not found');
        }
    
        // Calculate the total price of the cart's products
        const totalPrice = cart.products.reduce((total, product) => total + product.price, 0);
    
        // Create a new order object
        const order: Order = {
            id: crypto.randomUUID(),
            userId: userId,
            products: cart.products,
            totalPrice: totalPrice,
        };
    
        // Add the order to the repository and clear the cart
        createOrder(order);
        clearCart(userId);
    
        return order;
    },

    /**
     * Adds a product to the user's cart.
     * @param productId - The ID of the product to add to the cart.
     * @param userId - The ID of the user adding the product.
     * @returns The updated cart.
     * @throws ApiError if the product is not found.
     */
    addProductToCartService: async (productId: string, userId: string): Promise<Cart> => {
        // Check if the product exists
        const product = await findProductById(productId);
        if (!product) {
            throw new ApiError(404, 'Product not found');
        }
    
        // Get or create a cart for the user
        const cart = await findOrCreateCart(userId);
    
        // Add the product to the cart
        cart.products.push(product);
    
        return cart;
    },

    /**
     * Removes a product from the user's cart.
     * @param productId - The ID of the product to remove.
     * @param userId - The ID of the user whose cart is being modified.
     * @returns The updated cart.
     * @throws ApiError if the cart or product is not found.
     */
    removeProductFromCart: (productId: string, userId: string): Cart => {
        // Find the user's cart
        const cart = findCartByUserId(userId);
        if (!cart) {
            throw new ApiError(404, 'Cart not found for the user');
        }

        // Find the product in the cart
        const productIndex = cart.products.findIndex(prod => prod.id === productId);
        if (productIndex === -1) {
            throw new ApiError(404, 'Product not found in the cart');
        }

        // Remove the product from the cart
        cart.products.splice(productIndex, 1);

        // Save the updated cart
        saveCart(cart);

        return cart;
    }
}
