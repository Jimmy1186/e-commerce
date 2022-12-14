import { useSession } from "next-auth/react";
import React, { useCallback, useState } from "react";
import Breadcrumb from "../../components/widget/Breadcrumb";
import { trpc } from "../../utils/trpc";
import { Form, Formik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
import Script from "next/script";
import UploadImage from "../../components/widget/UploadImage";
import CategorySelect from "../../components/widget/CategorySelect";
import {
  createProductType,
  initialValues,
  createProductSchema,
} from "../../types/editor";
import DraggableList from "../../components/widget/DraggableList";
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});


function Index(props: any) {
  const { data: session } = useSession();

  const saveProductMutation = trpc.admin.saveProduct.useMutation();

  const onSave = useCallback((values: createProductType) => {
    saveProductMutation.mutate({
      product_title: values.product_title,
      product_category: Number(values.product_category),
      product_detail: values.product_detail,
      product_image: values.product_image,
    });
  }, []);

  const [html, setHtml] = useState("");
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const handleDescriptionChange = (ct: any) => {
    setHtml(ct);
    console.log(html);
  };

  //   const handleImageUpload = (
  //     targetImgElement: HTMLElement,
  //     index: number,
  //     state: string,
  //     imageInfo: any,
  //     remainingFilesCount: number
  //   ) => {
  //     // console.log(targetImgElement, index, state, imageInfo, remainingFilesCount)
  //     if (targetImgElement === null) return;
  //     // console.log(targetImgElement.setAttribute())
  //     // console.log(imageInfo.src)
  //     // const temp = "<div>lolo <div/>";
  //     // targetImgElement.setAttribute("src", "fk");
  //   };
  // 編輯區塊上傳照片的方法

  // const onImageUploadBefore = (files:any, info:any, uploadHandler:any) => {
  //   console.log(info)
  //   console.log(files)
  //   try {
  //     if(!info.anchor){
  //       console.log("no anchor")
  //     }

  // }
  // catch (err) {
  //    console.log(err)
  // }
  // return true

  // }

  const sumbitHandler = (values: createProductType, actions: any) => {
    // console.log(editorState);
    // onSave(values);
    console.log(values);
  };

  if (session?.user?.isAdmin || !session) {
    return <h1>無權限</h1>;
  }

  return (
    <>
      <Script
        defer
        src="https://widget.cloudinary.com/v2.0/global/all.js"
        type="text/javascript"
      ></Script>

      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(createProductSchema)}
        onSubmit={sumbitHandler}
      >
        {({ errors, values, handleChange, isValid, setFieldValue }) => (
          <main className="mx-auto flex h-full w-full grid-cols-6 flex-col gap-3 bg-stone-100 px-3  pt-24 ">
            {/* <main className="mx-auto flex h-full w-full grid-cols-6 flex-col gap-3 bg-stone-100 px-3  pt-24  lg:grid lg:max-w-7xl xl:max-w-[1440px]"></main> */}
            <Form className="flex flex-col gap-5">
              <Breadcrumb />

              <p className="text-3lx">新增商品</p>
              <div className="divider"></div>
              <div className="flex gap-3 lg:flex-col">
                {/* <button type="button" onClick={handleWidgetClick}>
                  Upload image
                </button> */}
              </div>
              <div className="">
                <p>{JSON.stringify(errors)}</p>
             

                <UploadImage values={values} setFieldValue={setFieldValue} />
                <div className="">
                 {/* <DraggableList items={values.product_image} /> */}
              </div>
              </div>
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
            
             
              <CategorySelect 
              errors={errors} 
              handleChange={handleChange}
              setFieldValue={setFieldValue}
              values={values}/>

              <div className="w-full">
                <SunEditor
                  lang="en"
                  name="product_detail"
                  onChange={handleChange("product_detail")}
                  // onImageUpload={handleImageUpload}
                  // onImageUploadBefore={onImageUploadBefore}
                  setOptions={{
                    height: "500px",
                    buttonList: [
                      ["codeView"],
                      ["font", "fontSize", "formatBlock"],
                      ["bold", "underline", "italic"],
                      ["align", "horizontalRule", "list", "table"],
                      ["fontColor", "hiliteColor"],
                      ["link", "image", "video"],
                    ],
                  }}
                />
              </div>
              <div className=""></div>
              <div className="">
                <div
                  className="content flex flex-col"
                  dangerouslySetInnerHTML={{ __html: values.product_detail }}
                />
              </div>

              <button className="btn" type="submit" disabled={!isValid}>
                Button
              </button>
            </Form>
          </main>
        )}
      </Formik>
    </>
  );
}

export default Index;

// export async function getServerSideProps() {
//   const {resources} = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/resources/image`, {
//     headers: {
//       Authorization: `Basic ${Buffer.from(process.env.NEXT_PUBLIC_CLOUDINARY_KEY + ':' + process.env.CLOUDINARY_SECRET).toString('base64')}`
//     }
//   }).then(r => r.json());
// console.log(resources)
//   return {
//     props: {
//       image:resources
//     }
//   }
// }
