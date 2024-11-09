// Routes/upload.js
import express from 'express';
import upload from '../middlewares/multerConfig.js';
import { uploadProfileImage } from '../controllers/uploadController.js';

const router = express.Router();

router.post('/profile-image', upload.single('profileImage'), uploadProfileImage);

export default router;
