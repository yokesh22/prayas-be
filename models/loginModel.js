import pool from '../db/mysql.js';

export async function getStallNo(data) {
  const { stallno } = data;
  console.log('Fetching stall number:', stallno);
  const sql = `
    select * from stallInfo where stallNo = ?
  `;
  const [rows] = await pool.execute(sql, [stallno]);
  return rows;
}
