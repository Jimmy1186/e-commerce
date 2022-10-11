import { z } from "zod";

export const initialValues = {
  product_title: "",
  product_category: "",
  product_detail:""
};

export const createProductSchema = z.object({
  product_title: z.string(),
  product_category: z.string(),
  product_detail: z.any(),
});

export type createProductType = z.infer<typeof createProductSchema>;
