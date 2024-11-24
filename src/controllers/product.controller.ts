import { Request, Response } from 'express';
import { productService } from '../services/product.service';
import { ApiError } from '../utils/errorHndler'; // Assuming you have an ApiError class for custom error handling

export const productController = {
    // Register a new product
    registerProductController: async (req: Request, res: Response): Promise<void> => {
        try {
            // Call the service to register the product
            const newProduct = await productService.registerProduct(req.body);
            res.status(200).json({
                message: 'Product created successfully',
                product: newProduct
            });
        } catch (err) {
            if ((err as any).isJoi) {
                res.status(400).json({ error: (err as any).details[0].message });
            } else {
                // other errors
                console.error('Error creating product:', err);
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    },

    // Method to handle CSV file import
    importProducts: async (req: Request, res: Response): Promise<void> => {
        if (!req.file) {
            return res.status(400).json({ error: 'There is no file to upload' });
        }

        try {
            const { file } = req;
            if (!file) {
                return res.status(400).json({ error: 'No file uploaded.' });
            }
            // Path to the uploaded CSV file
            const result = await productService.importCsvFile(file.path);

            res.status(200).json({ message: result });
        } catch (error) {
            console.error('Error importing products:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Fetch all products
    getAllProductsController: async (req: Request, res: Response): Promise<void> => {
        try {
            const products = await productService.fetchAllProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch products' });
        }
    },

    // Get product by ID
    getProductsById: async (req: Request, res: Response): Promise<void> => {
        try {
            const productId = parseInt(req.params.productId, 10);

            // Call the service method to get all products
            const allProducts = await productService.fetchAllProducts();

            // Find the product by ID
            const product = allProducts.find(prod => prod.id === productId);

            if (!product) {
                // Throw error if product is not found
                throw new ApiError(404, 'Product not found');
            }

            // Send the product as the response
            res.status(200).json(product);
        } catch (error) {
            // Handle errors
            res.status((error as ApiError).status || 500).json({ error: (error as ApiError).message || 'Internal Server Error' });
        }
    }
};