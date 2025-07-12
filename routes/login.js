import express from 'express';
import { handleLogin } from '../controllers/loginController.js';

const router = express.Router();

router.post('/login', handleLogin);

export default router;

