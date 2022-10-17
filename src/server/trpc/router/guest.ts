import { t,publicProcedure } from "../trpc";


export const exampleRouter = t.router({
    someData : publicProcedure.query(()=>{
        return {data:"RENDER HERER"}
    })
})