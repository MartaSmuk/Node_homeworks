// services/product.service.ts
import crypto from 'crypto';
import { productSchema } from '../validation/product.schema';
import { readProductsFromFile, writeProductsToFile, getProducts } from '../../repository/product.repository';
import { convertCsvToJson } from '../utils/fileHelper';
import fs from 'fs/promises';

// Interface representing a product
export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
}

export const productService = {
    /**
     * Registers a new product by validating input, assigning an ID, and saving it to a file.
     * @param productData - Partial product data to be validated and saved.
     * @returns The newly registered product with an ID.
     */
    registerProduct: async (productData: Omit<Product, 'id'>): Promise<Product> => {
        // Validate the incoming product data
        const validatedProduct = await productSchema.validateAsync(productData);
    
        // Read the existing products from the file
        const products: Product[] = await readProductsFromFile();
    
        // Add ID to the new product
        const newProduct: Product = {
            id: crypto.randomUUID(),
            ...validatedProduct
        };
    
        // Add the new product to the list and save to file
        products.push(newProduct);
        await writeProductsToFile(products);
    
        return newProduct;
    },

    /**
     * Imports a CSV file, checks if the file is empty, and converts it to JSON.
     * @param filePath - Path to the CSV file.
     * @returns A JSON representation of the CSV data or a message if the file is empty.
     */
    importCsvFile: async (filePath: string): Promise<string | object> => {
        try {
            console.log(`Attempting to read file at: ${filePath}`);
            
            const stats = await fs.stat(filePath);
            const isFileEmpty = stats.size === 0;

            console.log(`File size is ${stats.size} bytes`);
            console.log(`Is file empty: ${isFileEmpty}`);
            
            // Proceed with CSV conversion
            const result = isFileEmpty 
                ? await convertCsvToJson(true, 0)
                : await convertCsvToJson(false, stats.size - 1);
                
            console.log(`CSV Conversion Result: ${result}`);
            return result;

        } catch (error) {
            console.error('Error in importCsvFile:', error.message); // Log only the error message for brevity
            throw new Error('Failed to import CSV file');
        }
    },

    /**
     * Fetches all products from the repository.
     * @returns An array of all products.
     */
    fetchAllProducts: async (): Promise<Product[]> => {
        return getProducts();
    },
};

