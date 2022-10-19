import { preview } from "@cloudinary/url-gen/actions/videoEdit";
import React, { useState,useCallback } from "react";
import { trpc } from "../../utils/trpc";

type categoryType = {
  errors: any;
  handleChange: (v: any) => void;
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
};

function CategorySelect({ errors, handleChange }: categoryType) {
  const [cat, setCat] = useState<Array<number>>([]);
  const [levelState, setLevelState] = useState<number>(0);
  const {
    data: category,
    isError,
    isLoading,
  } = trpc.admin.getCategory.useQuery(undefined, {
    staleTime: Infinity,
  });
  const addCategoryMutation = trpc.admin.addCategory.useMutation()

  const clearV = () => {
    setLevelState(0);
    setCat([]);
  };







  const onAddCate = useCallback(()=>{

  },[addCategoryMutation])







  const nextCat = (id: number, level: number, catLength: number) => {
    // console.log("-----------------------------")
    // console.log("cat :"+ cat)
    // console.log("level :" + level);
    // console.log("catleng :" + catLength);
    // console.log("levelState :" + levelState);


    if (level != 0) {
   
        if (level - levelState === 0) {
            setCat(cat.slice(0,-1))
            setCat((prev) => [...prev, id]);
            return;
          }
      
      if (level - levelState <0) {
        setCat(cat.slice(0,-1))
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
      <div className="flex w-full gap-3">
        <ul className="flex w-36 flex-col gap-3 bg-white p-5">
          {category.flatMap((v, i) => {
            return v.parent_category_id === null ? (
              <li
                key={v.id}
                className="w-full text-lg"
                onClick={() => nextCat(v.id, 0, 1)}
              >
                {v.category_name}
              </li>
            ) : (
              []
            );
          })}
<li className="relative bottom-0" onClick={()=>{}}>
<label htmlFor="my-modal-4" className="btn modal-button">新增分類</label>
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
            />
          );
        })}





<input type="checkbox" id="my-modal-4" className="modal-toggle" />
<label htmlFor="my-modal-4" className="modal cursor-pointer">
  <label className="modal-box relative" >
    <h3 className="text-lg font-bold">新增分類</h3>
    <p className="py-4 flex  gap-3">
    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" /> 
    <button className="btn btn-outline" name="category">Button</button>
    </p>
  </label>
</label>
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
}: conpomentListType) {
  return (
    <ul className="flex w-36 flex-col gap-3 bg-white p-5">
      {catelist.flatMap((v, i) => {
        return v.parent_category_id === id ? (
          <li
            key={v.id}
            onClick={() => nextCat(v.id, level, catLength)}
            className="bg-stone-200 "
          >
            {v.category_name}
          </li>
        ) : (
          []
        );
      })}

   
    </ul>
  );
}
