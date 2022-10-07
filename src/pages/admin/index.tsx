import { useSession } from "next-auth/react";
import React from "react";
import Breadcrumb from "../../components/widget/Breadcrumb";
import { trpc } from "../../utils/trpc";
import { Form, Formik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import EditableTextAria from "../../components/widget/EditableTextAria";

const initialValues = {
  product_title: "",
  product_category: "",
  product_detail: "",
};

const createProductSchema = z.object({
  product_title: z.string(),
  product_category: z.string(),
  product_detail: z.string(),
});

export type createProductType = z.infer<typeof createProductSchema>;

function index() {
  const { data: session } = useSession();
  const {
    data: category,
    isError,
    isLoading,
  } = trpc.admin.getCategory.useQuery(undefined, {
    staleTime: Infinity,
  });

  const sumbitHandler = (values: createProductType, actions: any) => {
    console.log("sumbit");
    console.log(values);
  };

  if (session?.user?.isAdmin || !session) {
    return <h1>無權限</h1>;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(createProductSchema)}
      onSubmit={sumbitHandler}
    >
      {({ errors, values, handleChange, isValid,setFieldValue }) => (
        <main className="mx-auto flex h-full w-full grid-cols-6 flex-col gap-3 bg-stone-100 px-3  pt-24 ">
          {/* <main className="mx-auto flex h-full w-full grid-cols-6 flex-col gap-3 bg-stone-100 px-3  pt-24  lg:grid lg:max-w-7xl xl:max-w-[1440px]"></main> */}
          <Form className="flex flex-col gap-5">
            <Breadcrumb />

            <p className="text-3lx">新增商品</p>
            <div className="divider"></div>
            <div className="flex items-center gap-3">
              <p>商品名稱</p>
              {errors.product_title}
              <input
                name="product_title"
                type="text"
                onChange={handleChange}
                value={values.product_title}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </div>

            {errors.product_category}
            <select
              title="category"
              className="select select-bordered w-full max-w-xs"
              name="product_category"
              onChange={handleChange}
            >
              {category ? (
                category.map((v, i) => {
                  return (
                    <option
                      key={i}
                      disabled={v.parent_category_id === null}
                      value={v.id}
                    >
                      {v.category_name}
                    </option>
                  );
                })
              ) : (
                <option disabled defaultValue={0}>
                  Loading...
                </option>
              )}
            </select>
            <div className="w-full">
              <EditableTextAria 
              handleChange={handleChange}
              values={values}
              setFieldValue={setFieldValue}
              />
           
            </div>

            <button className="btn" type="submit" disabled={!isValid}>
              Button
            </button>
          </Form>
        </main>
      )}
    </Formik>
  );
}

export default index;
