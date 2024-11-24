"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserId = void 0;
const errorHndler_1 = require("../utils/errorHndler"); // Ensure the path to the file is correct
const storage_1 = require("../storage");
const checkUserId = (req, res, next) => {
    const userId = req.header('x-user-id');
    console.log(userId);
    if (!userId) {
        throw new errorHndler_1.ApiError(401, 'Unauthorized: x-user-id header is required');
    }
    if (!userId || !storage_1.users.find(user => user.id === userId)) {
        throw new errorHndler_1.ApiError(401, 'Unauthorized: Invalid user ID');
    }
    req.userId = userId;
    next();
};
exports.checkUserId = checkUserId;
// import { ApiError } from '../utils/errorHndler.js';
// import { users } from '../storage.js';
// export const checkUserId = (req, res, next) => {
//     const userId = req.header('x-user-id');
//     console.log(userId);
//     if(!userId) {
//         throw new ApiError(401, 'Unauthorized: x-user-id header is required');
//     }
//     if (!userId || !users.find(user => user.id === userId)) {
//         throw new ApiError(401, 'Unauthorized: Invalid user ID');
//     }
//     req.userId = userId;
//     next();
// };
