import { z } from "zod";
declare global {
  interface Window {
    cloudinary: any;
  }
}

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
      img_path:z.string(),
      index_of:z.number().max(3).min(0)
    })
  )
});

export type createProductType = z.infer<typeof createProductSchema>;



export type uploadImgType = {
  values: createProductType;
  setFieldValue: (title: string, setValue: Array<object>) => void;
};


export type pImgType ={
  img_path:string,
  index_of:number
}

export type pImgStringType ={
  img_path:string,
  index_of:number
}