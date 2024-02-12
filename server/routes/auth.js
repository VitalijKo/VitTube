import express from 'express';
import { googleAuth, signup, login } from '../controllers/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/google', googleAuth);

export default router;
