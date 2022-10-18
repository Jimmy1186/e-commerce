import { z } from "zod";
import { authedProcedure, t } from "../trpc";

export const adminSettingRouter = t.router({
  getCategory: authedProcedure.query(({ ctx }) => {
    try {
      return ctx.prisma.product_category.findMany({});
    } catch (e) {
      console.dir(e);
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
      // const imagePayload = await product_image.map((v, i) => {
      //   return {
      //     img_path: v.img_path,
      //     index_of: v.index_of,
      //   };
      // });

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
          // select:{
          //   product_images:true
          // }
        });
        return { as: "should success" };
      } catch (e) {
        console.log(e)
      }
    }),
});
