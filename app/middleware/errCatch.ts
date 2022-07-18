import { Context } from 'egg';
export default ()=>async (ctx:Context,next:()=>Promise<any>)=>{
    try{
        await next()
    }catch(e : any){
        ctx.body = e
    }
}