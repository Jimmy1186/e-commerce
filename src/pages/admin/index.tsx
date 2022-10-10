import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Breadcrumb from "../../components/widget/Breadcrumb";
import { trpc } from "../../utils/trpc";
import { Form, Formik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import EditableTextAria from "../../components/widget/EditableTextAria";
import { convertToHTML } from "draft-convert";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorProps } from "react-draft-wysiwyg";

import dynamic from "next/dynamic";

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

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
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState<any>();

  const {
    data: category,
    isError,
    isLoading,
  } = trpc.admin.getCategory.useQuery(undefined, {
    staleTime: Infinity,
  });

  const convertContentToHTML = () => {
    const currentContentAsHTML = convertToHTML({
      styleToHTML: (style) => {
        
        if (style === "BOLD") {
          return <span className="font-bold" />;
        }
        if (style === "ITALIC") {
          return <span className="italic" />;
        }
        if (style === "UNDERLINE") {
          return <span className="underline" />;
        }

        if (style.includes("STRIKETHROUGH")) {
          return <span className="line-through" />;
        }

        if (style.startsWith("fontsize")) {
          if (style.includes("fontsize-10")) {
            return <span className="text-xs" />;
          }

          if (style.includes("fontsize-11")) {
            return <span className="text-sm" />;
          }
          if (style.includes("fontsize-12")) {
            return <span className="text-base" />;
          }
          if (style.includes("fontsize-14")) {
            return <span className="text-lg" />;
          }
          if (style.includes("fontsize-18")) {
            return <span className="text-xl" />;
          }
          if (style.includes("fontsize-24")) {
            return <span className="text-2xl" />;
          }

          if (style.includes("fontsize-30")) {
            return <span className="text-3xl" />;
          }
          if (style.includes("fontsize-36")) {
            return <span className="text-4xl" />;
          }
          if (style.includes("fontsize-48")) {
            return <span className="text-5xl" />;
          }
          if (style.includes("fontsize-60")) {
            return <span className="text-6xl" />;
          }
          if (style.includes("fontsize-72")) {
            return <span className="text-7xl" />;
          }
          if (style.includes("fontsize-96")) {
            return <span className="text-8xl" />;
          }
        }

        if (style.includes("bgcolor") && style.startsWith("b")) {
          if (style.includes("bgcolor-#ef4444")) {
            return <span className="bg-red-500" />;
          }

          if (style.includes("bgcolor-#f97316")) {
            return <span className="bg-orange-500" />;
          }
          if (style.includes("bgcolor-#f59e0b")) {
            return <span className="bg-amber-500" />;
          }
          if (style.includes("bgcolor-#eab308")) {
            return <span className="bg-yellow-500" />;
          }

          if (style.includes("bgcolor-#84cc16")) {
            return <span className="bg-lime-500" />;
          }
          if (style.includes("bgcolor-#22c55e")) {
            return <span className="bg-green-500" />;
          }
          if (style.includes("bgcolor-#10b981")) {
            return <span className="bg-emerald-500" />;
          }
          if (style.includes("bgcolor-#14b8a6")) {
            return <span className="bg-teal-500" />;
          }
          if (style.includes("bgcolor-#06b6d4")) {
            return <span className="bg-cyna-500" />;
          }
          if (style.includes("bgcolor-#0ea5e9")) {
            return <span className="bg-sky-500" />;
          }
          if (style.includes("bgcolor-#3b82f6")) {
            return <span className="bg-blue-500" />;
          }
          if (style.includes("bgcolor-#6366f1")) {
            return <span className="bg-indigo-500" />;
          }

          if (style.includes("bgcolor-#8b5cf6")) {
            return <span className="bg-violet-500" />;
          }

          if (style.includes("bgcolor-#a855f7")) {
            return <span className="bg-purple-500" />;
          }

          if (style.includes("bgcolor-#d946ef")) {
            return <span className="bg-fuchsia-500" />;
          }

          if (style.includes("bgcolor-#ec4899")) {
            return <span className="bg-pink-500" />;
          }

          if (style.includes("bgcolor-#f43f5e")) {
            return <span className="bg-rose-500" />;
          }
          if (style.includes("bgcolor-#1c1917")) {
            return <span className="bg-stone-900" />;
          }

          if (style.includes("bgcolor-#78716c")) {
            return <span className="bg-stone-500" />;
          }

          if (style.includes("bgcolor-#44403c")) {
            return <span className="bg-stone-700" />;
          }

          if (style.includes("bgcolor-#fafaf9")) {
            return <span className="bg-stone-50" />;
          }
          if (style.includes("bgcolor-#e7e5e4")) {
            return <span className="bg-stone-200" />;
          }
        }

        if (style.includes("color") && style.startsWith("c")) {
          if (style.includes("color-#ef4444")) {
            return <span className="text-red-500" />;
          }

          if (style.includes("color-#f97316")) {
            return <span className="text-orange-500" />;
          }
          if (style.includes("color-#f59e0b")) {
            return <span className="text-amber-500" />;
          }
          if (style.includes("color-#eab308")) {
            return <span className="text-yellow-500" />;
          }

          if (style.includes("color-#84cc16")) {
            return <span className="text-lime-500" />;
          }
          if (style.includes("color-#22c55e")) {
            return <span className="text-green-500" />;
          }
          if (style.includes("color-#10b981")) {
            return <span className="text-emerald-500" />;
          }
          if (style.includes("color-#14b8a6")) {
            return <span className="text-teal-500" />;
          }
          if (style.includes("color-#06b6d4")) {
            return <span className="text-cyna-500" />;
          }
          if (style.includes("color-#0ea5e9")) {
            return <span className="text-sky-500" />;
          }
          if (style.includes("color-#3b82f6")) {
            return <span className="text-blue-500" />;
          }
          if (style.includes("color-#6366f1")) {
            return <span className="text-indigo-500" />;
          }

          if (style.includes("color-#8b5cf6")) {
            return <span className="text-violet-500" />;
          }

          if (style.includes("color-#a855f7")) {
            return <span className="text-purple-500" />;
          }

          if (style.includes("color-#d946ef")) {
            return <span className="text-fuchsia-500" />;
          }

          if (style.includes("color-#ec4899")) {
            return <span className="text-pink-500" />;
          }

          if (style.includes("color-#f43f5e")) {
            return <span className="text-rose-500" />;
          }
          if (style.includes("color-#1c1917")) {
            return <span className="text-stone-900" />;
          }

          if (style.includes("color-#78716c")) {
            return <span className="text-stone-500" />;
          }

          if (style.includes("color-#44403c")) {
            return <span className="text-stone-700" />;
          }

          if (style.includes("color-#fafaf9")) {
            return <span className="text-stone-50" />;
          }
          if (style.includes("color-#e7e5e4")) {
            return <span className="text-stone-200" />;
          }
        }
      },
      blockToHTML: (block) => {
        if (block.type === "SUPERSCRIPT") {
          return <p className="SIP" />;
        }
        if (block.data != undefined) {
          if (block.data["text-align"] === "center") {
            return <p className="self-center" />;
          }
          if (block.data["text-align"] === "right") {
            return <p className="self-end" />;
          }
          if (block.data["text-align"] === "start") {
            return <p className="self-start" />;
          }
        }
      },
      entityToHTML: (entity, originalText) => {
        if (entity.type === "LINK") {
          return <a href={entity.data.url}>{originalText}</a>;
        }

        return originalText;
      },
    })(editorState.getCurrentContent());

    setConvertedContent(currentContentAsHTML);
  };

  const handleEditorChange = (state: any) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const sumbitHandler = (values: createProductType, actions: any) => {
    // console.log(editorState);
    console.log(convertedContent);

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
              <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                toolbar={{
                  options: [
                    "inline",
                    "fontSize",
                    "list",
                    "textAlign",
                    "colorPicker",
                    "link",
                    "emoji",
                    "history",
                    "image",
                  ],
                  inline: {
                    options: ["bold", "italic", "underline", "strikethrough"],
                  },
                  fontSize: {
                    options: [
                      10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96,
                    ],
                  },

                  colorPicker: {
                    // icon: color,
                    // className: "text-",
                    // component: undefined,
                    colors: [
                      "#fafaf9",
                      "#e7e5e4",
                      "#78716c",
                      "#44403c",
                      "#1c1917",
                      "#ef4444",
                      "#f97316",
                      "#f59e0b",
                      "#eab308",
                      "#84cc16",
                      "#22c55e",
                      "#10b981",
                      "#14b8a6",
                      "#06b6d4",
                      "#0ea5e9",
                      "#3b82f6",
                      "#6366f1",
                      "#8b5cf6",
                      "#a855f7",
                      "#d946ef",
                      "#ec4899",
                      "#ec4899",
                      "#f43f5e",
                    ],
                  },
                  textAlign: {
                    // inDropdown: false,
                    // className: undefined,

                    // dropdownClassName: undefined,
                    options: ["left", "center", "right"],
                  },
                  image: {
                    urlEnabled: false,
                    uploadEnabled: true,
                    alignmentEnabled: true,
                    uploadCallback: uploadImageCallBack,
                    previewImage: true,
                    inputAccept:
                      "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                    alt: { present: true, mandatory: false },
                    defaultSize: {
                      height: "auto",
                      width: "auto",
                    },
                  },
                }}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
              />
            </div>
            <div className=""></div>
            <div className="">
              <div
                className="content flex flex-col"
                dangerouslySetInnerHTML={{ __html: convertedContent }}
              />
              ;
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

function uploadImageCallBack(file: any) {
  console.log(file);
  return new Promise((resolve, reject) => {
    resolve(console.log(file));
  });
}
