import React from "react";
import Image from "next/image";
import { createProductType } from "../../types/editor";

type uploadImgType = {
  values: createProductType;
  setFieldValue: (title: string, setValue: Array<object>) => void;
};

const convertBase64 = (file: Array<Blob>) => {
  return new Promise((resolve, reject) => {
    let plm: object[] = [];

    file.map((v, i) => {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(v);
      fileReader.onload = () => {
        plm[i] = { img_path: fileReader.result, index_of: 1};
      };
    });
    resolve(plm);
  });
};

const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
  return Object.entries(event.target.files || {}).map(([s, f]) => {
    
    return { img_path: f, index_of: Number(s) };
  });
};

function UploadImage({ values, setFieldValue }: uploadImgType) {

  return (
    <>
      {values.product_image.length != 0
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

      <br />

      <br />

      <input
        type="file"
        title="uploadImage"
        name="myImage"
        multiple
        onChange={(event) => {
          setFieldValue("product_image", uploadImage(event));
        }}
      />
    </>
  );
}

export default UploadImage;
