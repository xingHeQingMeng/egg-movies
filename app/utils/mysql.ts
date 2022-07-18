import mysql from 'mysql';
import option from '../mysqlConfig/constant';
import { requestParam } from '../middleware/validator';
import { Context } from 'egg';
const pool = mysql.createPool(option);

export const getSql = (ctx: Context): string => {
  const {
    dataSourceId,
    selectFields: fields,
    currentPage,
    pageSize,
    sort,
    groupBy,
  } = ctx.request.body as requestParam;
  let sql: string = `select ${fields} from ${dataSourceId}`;
  if (sort !== undefined) {
    sql = `${sql} ORDER BY ${sort.orderBy} ${sort.order}`;
  }
  if (currentPage !== undefined) {
    sql = `${sql} LIMIT ${pageSize} OFFSET ${
      currentPage * (pageSize as number)
    }`;
  }
  if (groupBy !== undefined) {
    sql = `${sql} GROUP BY ${groupBy.join()}`;
  }
  return sql;
};

export function dbQuery(sql: string): Promise<any> {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else if (sql.indexOf(';') !== -1) {
        reject({
          err: '";" in params is forbidden',
        });
      } else {
        connection.query(sql, (err, rows) => {
          if (err) {
            reject({ ...err, sql: sql });
          } else {
            resolve(rows);
          }
          connection.release();
        });
      }
    });
  });
}
