import { Controller } from "egg";

export default class GetMovies extends Controller{
    public async getMovies(){
        const { ctx } = this
        ctx.body = await ctx.service.getMovies.getMovies()
    }
}