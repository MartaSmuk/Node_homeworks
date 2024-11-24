import { Request, Response } from 'express';
import { validateUser } from '../validation/user.validation';
import { createUser, getAllUsers } from '../services/user.service';

// Register a new user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        // Validate and create the user
        const value = await validateUser(req.body);
        const user = await createUser(value);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        // Handle errors, distinguish between validation and other errors
        res.status((error as any).isJoi ? 400 : 500).json({ error: (error as Error).message });
    }
};

// Get all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
    const users = await getAllUsers();
    res.status(200).json({ users });
};