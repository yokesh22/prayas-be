import CryptoJS from 'crypto-js';
import { QR_ENCRYPTION_KEY } from '../config/constants.js';


export async function handleQrcodeValidator(req, res) {
  console.log('QR code validation request received');

  const { encrypted, mobile } = req.query;

  if (!encrypted || !mobile) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing parameters: encrypted or mobile',
    });
  }

  try {
    // Step 1: Ensure the encrypted string is URL-decoded
    const decodedEncrypted = decodeURIComponent(encrypted);
    console.log('Decoded Encrypted:', decodedEncrypted);

    // Step 2: Attempt decryption using mobile as key
    // const bytes = CryptoJS.AES.decrypt(decodedEncrypted, mobile);
    const bytes = CryptoJS.AES.decrypt(decodedEncrypted, QR_ENCRYPTION_KEY);

    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    console.log('Decrypted Text:', decryptedText);

    if (!decryptedText) {
      return res.status(400).json({
        status: 'fail',
        message: 'Decryption failed. Possibly wrong mobile number or corrupted QR code',
      });
    }

    // Step 3: Parse JSON
    let parsedData;
    try {
      parsedData = JSON.parse(decryptedText);
    } catch (err) {
      return res.status(400).json({
        status: 'fail',
        message: 'Decrypted text is not valid JSON',
      });
    }

    // Step 4: Validate mobile number match
    if (parsedData.phone !== mobile) {
      return res.status(400).json({
        status: 'fail',
        message: 'Mobile number mismatch in decrypted QR data',
      });
    }

    // ✅ All good
    return res.status(200).json({
      status: 'success',
      message: 'QR code validated successfully',
      data: parsedData,
    });

  } catch (err) {
    console.error('QR validation error:', err);
    return res.status(500).json({
      status: 'fail',
      message: 'Server error during QR validation',
    });
  }
}
