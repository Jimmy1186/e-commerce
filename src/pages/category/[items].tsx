import Image from "next/image";
import React, { useState } from "react";
import Breadcrumb from "../../components/widget/Breadcrumb";

const fakeData = {
  imgPath: [
    "/static/products/1.jpg",
    "/static/products/2.jpg",
    "/static/products/3.jpg",
  ],
  itemTitle: "SHOTGUN",
  price: 123133,
  detail:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
};

function ItemDetail() {
  const [iPath, setIPath] = useState(fakeData.imgPath[0]);

  const changePathHandler = (i: number) => {
    setIPath(fakeData.imgPath[i]);
  };

  return (
    <>
      <main className="w-full h-full bg-stone-100 flex flex-col gap-5 mx-auto pt-24 px-3  lg:max-w-7xl  lg:grid grid-cols-6 xl:max-w-[1440px] lg:grid-rows-[40px_auto_auto]">
        <Breadcrumb />
        <div className="bg-stone-300 w-full h-48 relative sm:h-80 md:h-96 lg:col-span-3 lg:order-2 lg:h-full"  >
          <Image src={iPath!} layout="fill" objectFit="cover" />
        </div>
        <div className="flex justify-center gap-5 lg:flex-col lg:col-span-1 lg:order-1 lg:justify-start">
          {fakeData.imgPath.map((v, i) => {
            return (
              <div
                className="relative w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40"
                key={i}
                onClick={() => changePathHandler(i)}
              >
                <Image src={v} layout="fill" objectFit="cover" />
              </div>
            );
          })}
        </div>

       
        <div className="flex flex-col gap-3 lg:col-span-2 lg:order-3 lg:justify-between">
          <div className="divider"></div>
          <h1 className="text-3xl font-semibold">{fakeData.itemTitle}</h1>
          <p className="text-xl ">$ {fakeData.price}</p>
          <div className="bg-amber-700 text-white p-5 font-bold text-2xl flex gap-5 justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
              />
            </svg>
            連結至賣場
          </div>
          <div className="divider"></div>
        </div>
        <div className="lg:col-span-6 lg:order-4 ">
          <div className="tabs">
            <a className="tab tab-lifted tab-active">商品說明</a>
          </div>
          <div className="bg-white h-screen p-10">
asd
          </div>
          
        </div>
      </main>
    </>
  );
}

export default ItemDetail;
