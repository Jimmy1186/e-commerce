import React, { useEffect, useRef, useState } from "react";
import { createProductType } from "../../pages/admin";

type editTextariaType = {
  handleChange: (v: any) => void;
  values: createProductType;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
};

function EditableTextAria({
  handleChange,
  values,
  setFieldValue,
}: editTextariaType) {
  const textareaRef = useRef<HTMLTextAreaElement>();
  const [selectText, setSelectText] = useState("");

  const boldHandler = (rawString: string) => {
    console.log("bold");

    setFieldValue(
      "product_detail",
      values.product_detail.replace(rawString, `*${rawString}*`),
      false
    );
  };
  const selectHandler = () => {
    if (!textareaRef.current) return;

    let xxx = values.product_detail;
    setSelectText(
      xxx.substring(
        textareaRef.current.selectionStart,
        textareaRef.current.selectionEnd
      )
    );
    console.log("render")
    // console.log(adx);
  };
// const tat = document.getElementById("ta")
//   useEffect(() => {
//     if (!textareaRef.current) return;

//     // let xxx = values.product_detail;
//     // setSelectText(
//     //   xxx.substring(
//     //     textareaRef.current.selectionStart,
//     //     textareaRef.current.selectionEnd
//     //   )
//     // );

//     console.log("render")
//     console.log(selectText)
//   }, [textareaRef.current?.selectionStart]);
  return (
    <>
      <div className="flex items-center align-middle">
        <svg
          className="h-10 w-10"
          viewBox="0 0 24 24"
          onClick={() => boldHandler(selectText)}
        >
          <path
            fill="currentColor"
            d="M13.5,15.5H10V12.5H13.5A1.5,1.5 0 0,1 15,14A1.5,1.5 0 0,1 13.5,15.5M10,6.5H13A1.5,1.5 0 0,1 14.5,8A1.5,1.5 0 0,1 13,9.5H10M15.6,10.79C16.57,10.11 17.25,9 17.25,8C17.25,5.74 15.5,4 13.25,4H7V18H14.04C16.14,18 17.75,16.3 17.75,14.21C17.75,12.69 16.89,11.39 15.6,10.79Z"
          />
        </svg>

        <svg className="h-10 w-10" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z"
          />
        </svg>

        <input type="color" title="color" defaultValue="#000000" />

        <svg className="h-10 w-10" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M20,5A2,2 0 0,1 22,7V17A2,2 0 0,1 20,19H4C2.89,19 2,18.1 2,17V7C2,5.89 2.89,5 4,5H20M5,16H19L14.5,10L11,14.5L8.5,11.5L5,16Z"
          />
        </svg>
      </div>

      <textarea
        id="ta"
        ref={textareaRef as any}
        name="product_detail"
        value={values.product_detail}
        onChange={handleChange}
        onSelect={selectHandler}
        className="textarea textarea-bordered w-full"
        placeholder="商品說明 ..."
      ></textarea>
    </>
  );
}

export default EditableTextAria;
