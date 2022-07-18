import { Service } from 'egg';
import { dbQuery, getSql } from '../utils/mysql';

export default class GetMovies extends Service {
  public getMovies() {
    const { ctx } = this;
    const sql = getSql(ctx)
    return dbQuery(sql);
  }
}