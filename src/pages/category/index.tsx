import React, { useState } from "react";
import ItemBox from "../../components/layout/ItemBox";
import Breadcrumb from "../../components/widget/Breadcrumb";

import CategoryTool from "../../components/widget/CategoryTool";
const fakeData = [
  {
    imgPath: "/static/products/1.jpg",
    itemTitle: "sadasdas",
    price: 123133,
  },
  {
    imgPath: "/static/products/2.jpg",
    itemTitle: "sadasdas",
    price: 123133,
  },
  {
    imgPath: "/static/products/3.jpg",
    itemTitle: "sadasdas",
    price: 123133,
  },
  {
    imgPath: "/static/products/4.jpg",
    itemTitle: "sadasdas",
    price: 123133,
  },
  {
    imgPath: "/static/products/5.jpg",
    itemTitle: "sadasdas",
    price: 123133,
  },
  {
    imgPath: "/static/products/6.jpg",
    itemTitle: "sadasdas",
    price: 123133,
  },
  {
    imgPath: "/static/products/6.jpg",
    itemTitle: "sadasdas",
    price: 123133,
  },
  {
    imgPath: "/static/products/6.jpg",
    itemTitle: "sadasdas",
    price: 123133,
  },

  {
    imgPath: "/static/products/6.jpg",
    itemTitle: "sadasdas",
    price: 123133,
  },
  {
    imgPath: "/static/products/6.jpg",
    itemTitle: "sadasdas",
    price: 123133,
  },
];

function Index() {
  return (
    <>
      <main className="w-full h-full bg-stone-100 flex flex-col gap-3 mx-auto pt-24 px-3  lg:max-w-7xl  lg:grid grid-cols-6 xl:max-w-[1440px]">
        <Breadcrumb />
        <CategoryTool />

        <div className="flex flex-col gap-3  lg:max-w-7xl  lg:col-span-5">
          <h1 className="font-bold text-2xl text-stone-500 ">類別標題</h1>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6  ">
            {fakeData.map((s, i) => {
              return (
                <ItemBox
                  imgPath={s.imgPath}
                  itemTitle={s.itemTitle}
                  price={s.price}
                  key={i}
                />
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}

export default Index;
