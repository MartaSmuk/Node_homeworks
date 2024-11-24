// Define the Product interface for strong typing of product objects
interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
}

// Define the User interface (assuming basic user properties)
interface User {
    id: string;
    name: string;
    email: string;
    // Add other user-specific properties as needed
}

// Define the Cart interface (assuming each cart holds products and a user ID)
interface Cart {
    userId: string;
    products: Product[];
}

// Define the Order interface (assuming an order contains products and a user ID)
interface Order {
    userId: string;
    products: Product[];
    totalPrice: number;
    orderDate: string; // or Date if you prefer a Date object
}

// Define the arrays with the appropriate types
export const products: Product[] = [
    {
        id: 1,
        title: "Digital Painting",
        description: "A custom digital painting created by a professional artist.",
        price: 50
    },
    {
        id: 2,
        title: "Online Yoga Class",
        description: "A one-hour online yoga session with a certified instructor.",
        price: 20
    },
    {
        id: 3,
        title: "E-Book",
        description: "A bestselling e-book available for instant download.",
        price: 10
    },
    {
        id: 4,
        title: "Virtual Cooking Class",
        description: "A two-hour virtual cooking class with a renowned chef.",
        price: 30
    },
    {
        id: 5,
        title: "Music Streaming Subscription",
        description: "A three-month subscription to a premium music streaming service.",
        price: 15
    },
    {
        id: 6,
        title: "Online Course",
        description: "Access to an online course on a subject of your choice.",
        price: 100
    },
    {
        id: 7,
        title: "Digital Photo Album",
        description: "A beautifully crafted digital photo album with customizable options.",
        price: 25
    },
    {
        id: 8,
        title: "Meditation App Subscription",
        description: "A one-year subscription to a popular meditation app.",
        price: 40
    },
    {
        id: 9,
        title: "Virtual Tour",
        description: "A virtual tour of a famous museum or landmark.",
        price: 35
    },
    {
        id: 10,
        title: "Online Personal Training Session",
        description: "A personalized one-hour workout session with a certified trainer.",
        price: 45
    }
];

export const users: User[] = []; // List of users (you can define the User structure with more details)

export const carts: Cart[] = []; // List of carts, each containing products and a userId

export const orders: Order[] = []; // List of orders containing products, userId, total price, and order date

