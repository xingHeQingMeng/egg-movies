import mysql from 'mysql';
import option from '../mysqlConfig/constant'
const pool = mysql.createPool(option);
export function dbQuery(sql: string): Promise<any> {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
}
