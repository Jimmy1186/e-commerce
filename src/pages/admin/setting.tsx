import React, { useCallback, useState } from "react";
import { Form, Formik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { trpc } from "../../utils/trpc";

const initialValues = {
  catId: null,
  catName: "",
};

const catSchema = z.object({
  catId: z.number().nullable(),
  catName: z.string(),
});

type catType = z.infer<typeof catSchema>;

type conpomentListType = {
  id: number;
  catelist: {
    id: number;
    category_name: string | null;
    parent_category_id: number | null;
  }[];
  nextCat: (id: number, level: number, catLength: number) => void;
  level: number;
  catLength: number;
  setFieldValue: (fieldName: string, v: number) => void;
  deleteHandler:(id:number)=>void
};

function Setting() {
  const [cat, setCat] = useState<Array<number>>([]);
  const [levelState, setLevelState] = useState<number>(0);
  const {
    data: category,
    refetch,
    isError,
    isLoading,
  } = trpc.admin.getCategory.useQuery(undefined, {
    staleTime: Infinity,
  });
  const addCategoryMutation = trpc.admin.addCategory.useMutation({
    onSuccess: () => refetch(),
  });
  const deleteCategoryMutation = trpc.admin.deleteCategory.useMutation({
    onSuccess: () => refetch(),
  });

  const clearV = () => {
    setLevelState(0);
    setCat([]);
  };

  const nextCat = (id: number, level: number, catLength: number) => {
    // console.log("-----------------------------")
    // console.log("cat :"+ cat)
    // console.log("level :" + level);
    // console.log("catleng :" + catLength);
    // console.log("levelState :" + levelState);

    if (level != 0) {
      if (level - levelState === 0) {
        setCat(cat.slice(0, -1));
        setCat((prev) => [...prev, id]);
        return;
      }

      if (level - levelState < 0) {
        setCat(cat.slice(0, -1));
        return;
      }

      if (level < catLength && level != levelState) {
        setCat((prev) => [...prev, id]);
      }
    } else {
      setCat((prev) => [id]);
    }

    setLevelState(level);
  };
  const deleteHandler = (id: number) => {
    deleteCategoryMutation.mutate({
      id: id,
    });
  };

  const sumbitHandler = (values: catType, actions: any) => {
    // console.log(editorState);
    addCategoryMutation.mutate({
      parent_category_id: values.catId,
      c_name: values.catName,
    });
    console.log(values);
  };

  if (category === undefined) {
    return <>loading</>;
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={toFormikValidationSchema(catSchema)}
        onSubmit={sumbitHandler}
      >
        {({ errors, values, handleChange, isValid, setFieldValue }) => (
          <main className="mx-auto flex h-full w-full grid-cols-6 flex-col gap-3 bg-stone-100 px-3  pt-24 ">
            <Form className="flex flex-col gap-5 ">
              <div className="h-10 w-10 bg-amber-600" onClick={() => clearV()}>
                Cler
              </div>
              <p> id {errors.catId}</p>
              <p> name {errors.catName}</p>

              <div className="flex w-full gap-3">
                <ul className="flex w-36 flex-col gap-3 bg-white p-5">
                  {category.flatMap((v, i) => {
                    return v.parent_category_id === null ? (
                      <li
                        key={v.id}
                        className="w-full text-lg flex justify-between"
                        onClick={() => nextCat(v.id, 0, 1)}
                      >
                        {v.category_name}

                        <div className="" onClick={() => deleteHandler(v.id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-6 w-6 text-red-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </div>
                      </li>
                    ) : (
                      []
                    );
                  })}
                  <li
                    className="relative bottom-0"
                    onClick={() => setFieldValue("catId", null)}
                  >
                    <label htmlFor="my-modal-4" className="modal-button btn">
                      新增分類
                    </label>
                  </li>
                </ul>

                {cat.map((v, i) => {
                  return (
                    <ChildCat
                      key={i}
                      id={v}
                      catelist={category}
                      nextCat={nextCat}
                      catLength={cat.length + 1}
                      level={i + 1}
                      setFieldValue={setFieldValue}
                      deleteHandler={deleteHandler}
                    />
                  );
                })}

                <input
                  type="checkbox"
                  id="my-modal-4"
                  className="modal-toggle"
                />
                <label htmlFor="my-modal-4" className="modal cursor-pointer">
                  <label className="modal-box relative">
                    <h3 className="text-lg font-bold">新增分類</h3>
                    <p className="flex gap-3  py-4">
                      <input
                        type="text"
                        placeholder="Type here"
                        name="catName"
                        value={values.catName}
                        onChange={handleChange}
                        className="input input-bordered w-full max-w-xs"
                      />
                      <button className="btn btn-outline" type="submit">
                        新增
                      </button>
                    </p>
                  </label>
                </label>
              </div>
            </Form>
          </main>
        )}
      </Formik>
    </>
  );
}

export default Setting;

function ChildCat({
  id,
  catelist,
  nextCat,
  level,
  catLength,
  setFieldValue,
  deleteHandler
}: conpomentListType) {
  return (
    <>
      <ul className="flex w-36 flex-col gap-3 bg-white p-5">
        {catelist.flatMap((v, i) => {
          return v.parent_category_id === id ? (
            <li
              key={v.id}
              onClick={() => nextCat(v.id, level, catLength)}
              className="w-full text-lg flex justify-between"
            >
              {v.category_name}




              <div className="" onClick={() => deleteHandler(v.id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-6 w-6 text-red-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </div>
            </li>
          ) : (
            []
          );
        })}
        <li
          className="relative bottom-0"
          onClick={() => setFieldValue("catId", id)}
        >
          <label htmlFor="my-modal-4" className="modal-button btn">
            新增分類
          </label>
        </li>
      </ul>
    </>
  );
}
