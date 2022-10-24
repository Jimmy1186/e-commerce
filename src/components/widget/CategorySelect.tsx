import { preview } from "@cloudinary/url-gen/actions/videoEdit";
import React, { useState, useCallback } from "react";
import { createProductType } from "../../types/editor";
import { trpc } from "../../utils/trpc";

type categoryType = {
  errors: any;
  handleChange: (v: any) => void;
  setFieldValue: (name: string, v: number) => void;
  values:createProductType
};

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
  setFieldValue: (name: string, v: number) => void;

};

function CategorySelect({ errors, handleChange, setFieldValue,values }: categoryType) {
  const [cat, setCat] = useState<Array<number>>([]);
  const [levelState, setLevelState] = useState<number>(0);
  const {
    data: category,
    isError,
    isLoading,
  } = trpc.admin.getCategory.useQuery(undefined, {
    staleTime: Infinity,
  });
  const addCategoryMutation = trpc.admin.addCategory.useMutation();

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


  if (category === undefined) {
    return <>loading</>;
  }
  return (
    <>
      <div className="h-10 w-10 bg-amber-600" onClick={() => clearV()}>
        Cler
      </div>
      {errors.product_category}
      <div className="">
        <div className="flex w-full gap-3">
          <ul className="flex w-36 flex-col gap-3 bg-white p-5">
            {category.flatMap((v, i) => {
              return v.parent_category_id === null ? (
                <li key={v.id} className="flex w-full justify-between text-lg">
                  <p onClick={() => setFieldValue("product_category", v.id)}>
                    {v.category_name}
                  </p>

                  <div className="" onClick={() => nextCat(v.id, 0, 1)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </div>
                </li>
              ) : (
                []
              );
            })}
          </ul>

          {cat.map((v, i) => {
            return (
              <ChildCat
                key={i}
                id={v}
                catelist={category}
                nextCat={nextCat}
                setFieldValue={setFieldValue}
                catLength={cat.length + 1}
                level={i + 1}
              />
            );
          })}
        </div>

        <div className="">
          <p>目前已選擇的 : {category.find(v=>v.id===values.product_category)?.category_name}</p>
        </div>
      </div>
    </>
  );
}

export default CategorySelect;

function ChildCat({
  id,
  catelist,
  nextCat,
  level,
  catLength,
  setFieldValue,
}: conpomentListType) {
  return (
    <ul className="flex w-36 flex-col gap-3 bg-white p-5">
      {catelist.flatMap((v, i) => {
        return v.parent_category_id === id ? (
          <li key={v.id} className="flex justify-between">
            <div
              className=""
              onClick={() => setFieldValue("product_category", v.id)}
            >
              {" "}
              {v.category_name}
            </div>

            <div className="" onClick={() => nextCat(v.id, level, catLength)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </li>
        ) : (
          []
        );
      })}
    </ul>
  );
}
