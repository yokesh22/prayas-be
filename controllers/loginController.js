import CryptoJS from 'crypto-js';
import { getStallNo } from '../models/loginModel.js';

export async function handleLogin(req, res) {
  console.log('Login request received');

  const { phone, stall } = req.body;
    console.log('Request body:', req.body);
  if (!phone || !stall) {
    return res.status(200).json({
      status: 'fail',
      message: 'Missing parameters',
    });
  }

  try {
    // Step 1: check it is a valid stallno
    const validStall = await getStallNo({ stallno: stall });
    console.log('Valid Stall:', validStall);

    if (!validStall || validStall.length === 0) {
      return res.status(200).json({
        status: 'fail',
        message: 'Invalid stall number',
      });
    }

    // ✅ All good
    return res.status(200).json({
      status: 'success',
      message: 'valid stall number',
    });

  } catch (err) {
    console.error('QR validation error:', err);
    return res.status(500).json({
      status: 'fail',
      message: 'Server error during QR validation',
    });
  }
}
