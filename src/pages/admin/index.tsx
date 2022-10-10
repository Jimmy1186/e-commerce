import { useSession } from "next-auth/react";
import React, { useEffect, useMemo, useState } from "react";
import Breadcrumb from "../../components/widget/Breadcrumb";
import { trpc } from "../../utils/trpc";
import { Form, Formik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import dynamic from "next/dynamic";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
import "react-quill/dist/quill.snow.css";

// const modules = {

//   toolbar: [
//     [{ header: "1" }, { header: "2" }, { font: [] }],
//     [{ size: [] }],
//     ["bold", "italic", "underline", "strike", "blockquote"],
//     [
//       { list: "ordered" },
//       { list: "bullet" },
//       { indent: "-1" },
//       { indent: "+1" },
//     ],
//     ["link", "image", "video"],
//     ["clean"],
//     // [{ 'color': ["text-orange-600","text-yellow-600" ] }]
//     [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466']
//   }],
//   ],

//   clipboard: {
//     // toggle to add extra line breaks when pasting HTML:
//     matchVisual: false,
//   },

// };
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
];

const initialValues = {
  product_title: "",
  product_category: "",
};

const createProductSchema = z.object({
  product_title: z.string(),
  product_category: z.string(),
  product_detail: z.any(),
});

export type createProductType = z.infer<typeof createProductSchema>;

function Index() {
  const { data: session } = useSession();

  const [convertedContent, setConvertedContent] = useState<any>();

  const { data: category } = trpc.admin.getCategory.useQuery(undefined, {
    staleTime: Infinity,
  });

  const sumbitHandler = (values: createProductType, actions: any) => {
    console.log(values);
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [
            { header: [1, 2, 3, 4, 5, 6, false] },
            { size: ["small", false, "large", "huge"] },
          ],
          ["bold", "italic", "underline", "strike", "blockquote", "line"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { script: "sub" },
            { script: "super" },
            { align: [] },
          ],
          [
            {
              color: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
              ],
            },
            {
              background: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
              ],
            },
          ],
          ["link"],
          ["clean"],
        ],
        // handlers: {
        //   "color" : function(col:string) {
        //      console.log(this.quill)
        //   } ,
        // },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  useEffect(() => {
    const { Quill } = require("react-quill");
    let Inline = Quill.import("blots/inline");
    let ColorClass = Quill.import("attributors/class/color");





// class justifyCenterBlot extends Inline {

// }


// justifyCenterBlot.blotName = "align"
// justifyCenterBlot.tagName = 'div';


// Quill.register(justifyCenterBlot);

    // class ColorBlot extends Inline {
    //   static create(value: any) {
    //     const node = super.create(value);
    //     console.log(value);
    //     console.log(node);
    //     node.setAttribute("class", "text-[" + value + "]");
    //     return node;
    //   }
    // }
    // console.log(ColorBlot)
    //  ColorClass.keyName ="text"

    // // ColorBlot.blotName = "color";
    // // ColorBlot.tagName = "p";
    // class BoldBlot extends Inline {}
    // BoldBlot.blotName = "bold";
    // BoldBlot.className = "font-bold";
    // // Quill.register("formats/color", ColorBlot);
    // Quill.register(ColorClass, true);

    // Quill.register("formats/bold", BoldBlot);
  }, []);

  if (session?.user?.isAdmin || !session) {
    return <h1>無權限</h1>;
  }

  return (
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
              <QuillNoSSRWrapper
                id="product_detail"
                modules={modules}
                formats={formats}
                theme="snow"
                onChange={(event) => setFieldValue("product_detail", event)}
                value={values.product_detail}
              />
            </div>
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
  );
}

export default Index;
