import Joi, { ObjectSchema } from 'joi';

// Define the Product data interface
interface Product {
    name: string;
    description: string;
    category: string;
    price: number;
}

// Product schema for validation (using Joi library)
export const productSchema: ObjectSchema<Product> = Joi.object({
    name: Joi.string()
        .min(3)
        .max(40)
        .trim()
        .required(),
    description: Joi.string()
        .min(5)
        .max(250)
        .required(),
    category: Joi.string()
        .min(3)
        .max(40)
        .required(),
    price: Joi.number()
        .positive()
        .precision(2)
        .required(),
});

// Export a function for validation
export const validateProduct = (data: Product): Promise<Product> => {
    return productSchema.validateAsync(data);
};