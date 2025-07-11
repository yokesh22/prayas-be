import pool from '../db/mysql.js';

export async function insertRegistration(data) {
  const { orderid, fullName, email, mobileNumber, village, pincode, visitDate } = data;
  const sql = `
    INSERT INTO registrationInfo (orderid, name, email, phoneNumber, village, pincode, visitDate)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  await pool.execute(sql, [orderid, fullName, email, mobileNumber, village, pincode, visitDate]);
}
