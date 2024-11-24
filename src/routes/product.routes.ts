// routes/user.routes.ts
import express, { Request, Response } from 'express';
import { registerUser, getUsers } from '../controllers/user.controller';

const router = express.Router();

// register/create user
router.post('/register', (req: Request, res: Response) => registerUser(req, res));

// Get users
router.get('/', (req: Request, res: Response) => getUsers(req, res));

export default router;

