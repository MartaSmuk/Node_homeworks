import { Request, Response, NextFunction } from 'express';
import { cartServices } from '../services/cart.service';
import { ApiError } from '../utils/errorHndler'; // Assuming you have an ApiError class for custom error handling

export const cartController = {
    // Checkout Order
    checkoutOrder: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.headers['x-user-id'] as string; // Assuming userId is set by checkUserId middleware
            const order = await cartServices.checkoutCart(userId);

            if (!order) {
                throw new ApiError(404, 'Order not found');
            }

            res.status(201).json({
                message: 'Order created successfully',
                order: order
            });
        } catch (error) {
            next(error); // Pass errors to the global error handler
        }
    },

    // Add Product to Cart
    addProdToCart: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { productId } = req.params;
            const userId = req.headers['x-user-id'] as string; // Set by the `checkUserId` middleware

            // Call the service to handle the logic
            const cart = await cartServices.addProductToCartService(productId, userId);

            res.status(200).json({ message: 'Product is added to the cart', cart });
        } catch (error) {
            next(error); // Pass errors to the global error handler
        }
    },

    // Delete Product from Cart
    deleteProductFromCart: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const productId = parseInt(req.params.productId, 10);
            const userId = req.headers['x-user-id'] as string;

            const updatedCart = await cartServices.removeProductFromCart(productId, userId);

            res.status(200).json({ message: 'Product removed from the cart', cart: updatedCart });
        } catch (error) {
            next(error); // Pass errors to the global error handler
        }
    }
};
