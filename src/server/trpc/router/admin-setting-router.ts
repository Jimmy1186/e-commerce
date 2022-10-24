import { z } from "zod";
import { authedProcedure, t } from "../trpc";

export const adminSettingRouter = t.router({
  getCategory: authedProcedure.query(async({ ctx }) => {

    try {
      const all  = await ctx.prisma.product_category.findMany({});
      return all

    } catch (e) {
      console.dir(e);
    }
  }),
  addCategory: authedProcedure
    .input(
      z.object({
        parent_category_id: z.number().nullable(),
        c_name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.product_category.create({
          data:{
            category_name: input.c_name,
            parent_category_id:input.parent_category_id
          }
        })
        console.log(input);
      } catch (e) {
        console.log(e);
      }
    }),
    deleteCategory:authedProcedure.input(
      z.object({
        id:z.number()
      })
    ).mutation(async({ctx,input})=>{
      try{
        return await ctx.prisma.product_category.delete({
          where:{
            id:input.id
          }
        })
      }catch{

      }
    }),
  saveProduct: authedProcedure
    .input(
      z.object({
        product_title: z.string(),
        product_category: z.number(),
        product_detail: z.any(),
        product_image: z.array(
          z.object({
            img_path: z.string(),
            index_of: z.number().max(3).min(0),
          })
        ),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { product_title, product_category, product_detail, product_image } =
        input;

      try {
        await ctx.prisma.product.create({
          data: {
            name: product_title,
            description: product_detail,
            category_id: product_category,
            product_images: {
              createMany: {
                data: product_image,
              },
            },
          },
        });
        return { as: "should success" };
      } catch (e) {
        console.log(e);
      }
    }),
});
