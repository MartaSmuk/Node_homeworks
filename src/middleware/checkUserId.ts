import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/errorHndler'; // Ensure the path to the file is correct
import { users } from '../storage';

// Extend the Express Request interface to include userId
interface CustomRequest extends Request {
    userId?: string;
}

export const checkUserId = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const userId = req.header('x-user-id');
    console.log(userId);

    if (!userId) {
        throw new ApiError(401, 'Unauthorized: x-user-id header is required');
    }

    if (!userId || !users.find(user => user.id === userId)) {
        throw new ApiError(401, 'Unauthorized: Invalid user ID');
    }

    req.userId = userId;
    next();
};