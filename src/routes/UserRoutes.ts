// src/routes/UserRoutes.ts
import express from 'express';
import { registerUser, loginUser } from '../controllers/UserController';

const router = express.Router();

// User Registration and Login
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
