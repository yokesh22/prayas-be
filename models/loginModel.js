import pool from '../db/mysql.js';

export async function getStallNo(data) {
  const { stallno, pinno, phoneno } = data;
  console.log('Fetching stall number:', stallno);
  const sql = `
    select * from stallInfo where stallNo = ? and pin = ? and phone = ?
  `;
  const [rows] = await pool.execute(sql, [stallno, pinno, phoneno]);
  return rows;
}
