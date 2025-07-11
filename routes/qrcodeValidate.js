import express from 'express';
import { handleQrcodeValidator } from '../controllers/qrcodeController.js';

const router = express.Router();

router.get('/validateQR', handleQrcodeValidator);

export default router;

