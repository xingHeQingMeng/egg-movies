import { Service } from "egg";
import {dbQuery} from '../utils/mysql'
export default class GetMovies extends Service{
    public getMovies(){
        // const { ctx } = this
        // const request = ctx.request.body
       return dbQuery('select * from recentlyTop250Movies;')
    }
}