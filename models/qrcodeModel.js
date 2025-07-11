import pool from '../db/mysql.js';

export async function insertQRCodeRecord(qrcode, phonenumber) {
  const sql = `
    INSERT INTO qrcodesInfo (ticketId, phoneNumber, qrcode)
    VALUES (UUID(), ?, ?)
  `;
  await pool.execute(sql, [phonenumber, qrcode]);
}
