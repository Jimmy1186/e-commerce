import { z } from "zod";
import { authedProcedure, t } from "../trpc";

export const adminSettingRouter = t.router({
  getCategory: authedProcedure.query(async({ ctx }) => {
    // let catA =[]


    try {
      const all  = await ctx.prisma.product_category.findMany({});
      return all
//       all.forEach((v,i) => {
        
//       });


// console.log(all)




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
        console.log(input, ctx);
      } catch (e) {
        console.log(e);
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
