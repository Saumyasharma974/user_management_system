import express from 'express';
import { register, login, sendOTP } from '../controllers/authController.js';

const router = express.Router();

// Route to register a new user
router.post('/register', register);

// Route to login an existing user
router.post('/login', login);

// Route to send OTP for email verification
router.post('/sendOTP', sendOTP);

export default router;
