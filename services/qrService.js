import QRCode from 'qrcode';

export async function generateQRCode(data) {
  try {
    return await QRCode.toDataURL(data);
  } catch (error) {
    console.error('QR code generation error:', error);
    throw error;
  }
}
