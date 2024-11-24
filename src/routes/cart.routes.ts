// routes/cart.routes.ts
import express, { Request, Response, NextFunction } from 'express';
import { cartController } from '../controllers/cart.controller';
import { checkUserId } from '../middleware/checkUserId';

const router = express.Router();

// Checkout order route
router.post('/checkout', async (req: Request, res: Response) => {
    try {
        await cartController.checkoutOrder(req, res);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Add product to cart route
router.put('/:productId', checkUserId, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await cartController.addProdToCart(req, res);
    } catch (error) {
        next(error); // Passing error to the next middleware
    }
});

// Delete product from cart route
router.delete('/:productId', checkUserId, async (req: Request, res: Response, next: NextFunction) => {
    try {
        await cartController.deleteProductFromCart(req, res);
    } catch (error) {
        next(error); // Passing error to the next middleware
    }
});

export default router;
