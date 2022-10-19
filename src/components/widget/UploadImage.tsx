import React from "react";
import Image from "next/image";
import { createProductType, uploadImgType } from "../../types/editor";
import { imgPayloadConvert } from "../../utils/functions";
import { generateSignature } from "../../utils/cloudinarySign";

function UploadImage({ values, setFieldValue }: uploadImgType) {
  async function handleWidgetClick() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
        uploadSignature: generateSignature,
        apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_KEY,
        resourceType: "image",
        folder: "my_test",
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {

    
          const oldV     =  values.product_image
          const newV = [...oldV,{ img_path: result.info.url, index_of: 0 }]

       

          setFieldValue("product_image",newV);
          // setIsImageUploaded(true);
        } else if (error) {
          console.log(error);
        }
      }
    );
    widget.open();
  }



  return (
    <>
      {values.product_image?(
        values.product_image.map((v,i)=>{
          return <Image key={i} src={v.img_path} height="250" width={250} />
        })
      ):("")}
      <div className="h-10 w-10 bg-red-500" onClick={handleWidgetClick}></div>
    </>
  );
}

export default UploadImage;

{
  /* {values.product_image.length != 0
        ? values.product_image.map((v: any, i) => {
            return (
              <div key={i}>
                <Image
                  alt="not fount"
                  width="200"
                  height="200"
                  src={URL.createObjectURL(v.img_path)}
                />

                <br />
                <button
                  onClick={() =>
                    setFieldValue(
                      "product_image",
                      values.product_image.filter((fv, fi) => {
                        return fi != i;
                      })
                    )
                  }
                >
                  Remove
                </button>
              </div>
            );
          })
        : ""}



      <input
        type="file"
        title="uploadImage"
        name="myImage"
        multiple
        onChange={(event) => {
          setFieldValue("product_image", imgPayloadConvert(event));
        }}
      /> 
      */
}
