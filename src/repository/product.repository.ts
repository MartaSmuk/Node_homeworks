import fs from 'fs/promises';
import path from 'path';
import { products as productList } from '..//storage'; // Assuming 'products' is exported from storage.ts
import { fileURLToPath } from 'url';

// Helper to get __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'products.json');

// Define types for product structure if needed
interface Product {
    id: string;
    name: string;
    price: number;
    [key: string]: any; // This allows flexibility for additional product properties
}

// Function to read products from file
export const readProductsFromFile = async (): Promise<Product[]> => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data) || [];
    } catch (err) {
        // Return an empty array if the file doesn’t exist or any other error occurs
        console.error('Error reading products from file:', err);
        return [];
    }
};

// Function to write products to file
export const writeProductsToFile = async (products: Product[]): Promise<void> => {
    try {
        await fs.writeFile(filePath, JSON.stringify(products, null, 2), 'utf8');
    } catch (err) {
        console.error('Error writing products to file:', err);
    }
};

// Function to get products from the in-memory list
export const getProducts = (): Product[] => {
    return productList;
};

