import express from 'express';
import { getProfile, updateProfile } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get Profile (only accessible by authenticated users)
router.get('/profile', authMiddleware, getProfile);

// Update Profile (only accessible by authenticated users)
router.put('/profile', authMiddleware, updateProfile);  // Corrected route path

export default router;
