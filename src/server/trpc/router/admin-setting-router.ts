import { authedProcedure, t } from "../trpc";



export const adminSettingRouter = t.router({
    getCategory:authedProcedure.query(({ctx})=>{
        try {
            return ctx.prisma.product_category.findMany({});
          } catch (e) {
            console.dir(e);
          }
    })
})