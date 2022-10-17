import { z } from "zod";

export const initialValues = {
  product_title: "",
  product_category: "",
  product_detail:"",
  product_image:[]
};

export const createProductSchema = z.object({
  product_title: z.string(),
  product_category: z.string(),
  product_detail: z.any(),
  product_image:z.array(
    z.object({
      img_path:z.any(),
      index_of:z.number().max(3).min(0)
    })
  )
});

export type createProductType = z.infer<typeof createProductSchema>;
