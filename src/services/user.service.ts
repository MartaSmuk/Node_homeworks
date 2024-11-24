import crypto from 'crypto';
import { addUser, fetchUsers } from '../repository/user.repository';

/** 
 * User type representing the structure of a user object.
 */
interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

/**
 * Creates a new user, assigns a unique ID, and stores it in the repository.
 * @param userData - Partial user data without the ID.
 * @returns The complete user object with an ID.
 */
export const createUser = (userData: Omit<User, 'id'>): User => {
    const user: User = { id: crypto.randomUUID(), ...userData };
    addUser(user);
    return user;
};

/**
 * Fetches all users from the repository.
 * @returns An array of user objects.
 */
export const getAllUsers = (): User[] => fetchUsers();