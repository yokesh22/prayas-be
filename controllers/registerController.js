import { insertRegistration } from '../models/registrationModel.js';
import { insertQRCodeRecord } from '../models/qrcodeModel.js';
import { generateQRCode } from '../services/qrService.js';
import { v4 as uuidv4 } from 'uuid';

export async function handleRegister(req, res) {
  try {
    const { visitDate, visitors } = req.body;

    if (!Array.isArray(visitors) || visitors.length === 0) {
      return res.status(400).json({ message: 'No visitor data provided' });
    }

    const orderid = uuidv4();

    const results = [];

    for (const visitor of visitors) {
      const { fullName, email, mobileNumber, village, pincode } = visitor;

      if (!fullName || !mobileNumber || !visitDate) {
        return res.status(400).json({ message: 'Missing required fields in visitor data' });
      }

      // Insert registration
      await insertRegistration({
        orderid,
        fullName,
        email,
        mobileNumber,
        village,
        pincode,
        visitDate,
      });

      // Generate QR data and save
      const qrData = `Phone: ${mobileNumber}, Name: ${fullName}, Order ID: ${orderid}, Village: ${village}`;
      const qrCodeBase64 = await generateQRCode(qrData);
      await insertQRCodeRecord(qrCodeBase64, mobileNumber);

      results.push({
        fullName,
        mobileNumber,
        qrcode: qrCodeBase64,
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'All visitors registered successfully',
      orderid,
      data: results,
    });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(200).json({status: 'fail', message: 'One or more phone numbers are already registered' });
    }
    console.error(err);
    return res.status(500).json({status: 'fail', message: 'Internal server error' });
  }
}
