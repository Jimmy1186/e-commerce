import React from "react";
import Image from "next/image";

type itemType = {
  imgPath: string;
  itemTitle: string;
  price: number;
};

function ItemBox({ imgPath, itemTitle, price }: itemType) {
  return (
    <div
      className="w-full h-full  flex flex-col gap-3 pb-3 items-center transition-all shadow hover:shadow-xl 
    md:h-80 lg:h-96 lg:gap-5"
    >
      <div className="w-full h-40 relative md:h-56 lg:h-72">
        <Image
          src={imgPath}
          layout="fill"
          objectFit="cover"
          alt="new product"
        />
      </div>
      <h3 className="font-semibold">{itemTitle}</h3>
      <span className="font-extrabold text-pink-700">$ {price}</span>
    </div>
  );
}

export default ItemBox;
