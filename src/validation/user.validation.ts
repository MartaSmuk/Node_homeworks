import Joi, { ObjectSchema } from 'joi';

// Define the user data interface
interface UserData {
    name: string;
    email: string;
    password: string;
}

// Validation schema for the user
const schema: ObjectSchema<UserData> = Joi.object({
    name: Joi.string().min(5).max(35).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$'))
        .required()
});

// Validation function
export const validateUser = (data: UserData): Promise<UserData> => {
    return schema.validateAsync(data);
};