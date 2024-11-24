"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/user.routes.ts
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
// register/create user
router.post('/register', (req, res) => (0, user_controller_1.registerUser)(req, res));
// Get users
router.get('/', (req, res) => (0, user_controller_1.getUsers)(req, res));
exports.default = router;
// import express from 'express';
// import { registerUser, getUsers } from '../controllers/user.controller.js';
// const router = express.Router();
// // register/create user
// router.post('/register', registerUser);
// router.get('/', getUsers);
// export default router;
