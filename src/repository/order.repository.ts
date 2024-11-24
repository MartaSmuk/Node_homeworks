// Assuming 'orders' is an array of order objects from 'storage.ts'
import { orders } from '../storage';

// Define a type for the Order object
interface Order {
    id: string;
    userId: string;
    products: Array<any>; // You can further define the structure of the products if needed
    totalPrice: number;
    [key: string]: any; // Allows flexibility for other properties
}

// Function to create an order
export const createOrder = (order: Order): Order => {
    orders.push(order);
    return order;
};