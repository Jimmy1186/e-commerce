import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
const slides = [
  {
    url: "/static/home/0.jpg",
    title: "beach",
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nunc turpis, pellentesque sed dictum non, egestas a turpis. Sed faucibus rhoncus quam, non porttitor risus.",
  },
  {
    url: "/static/home/1.jpg",
    title: "beach",
    subtitle:
      "posuere. Sed diam mi, elementum vel aliquet in, commodo at velit. Curabitur tempus nisl ex, sed sodales enim posuere ac. Aliquam erat volutpat.",
  },
  {
    url: "/static/home/2.jpg",
    title: "boat",
    subtitle:
      "posuere. Sed diam mi, elementum vel aliquet in, commodo at velit. Curabitur tempus nisl ex, sed sodales enim posuere ac. Aliquam erat volutpat.",
  },
  {
    url: "/static/home/3.jpg",
    title: "forest",
    subtitle:
      "posuere. Sed diam mi, elementum vel aliquet in, commodo at velit. Curabitur tempus nisl ex, sed sodales enim posuere ac. Aliquam erat volutpat.",
  },
  // { url: "", title: "city" },
  // { url: "", title: "italy" },
];

function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  //   useEffect(()=>{
  //     const timer = setTimeout(()=>{
  //         setCurrentIndex(perv=>perv>=slides.length-1? 0 :perv+1)
  //     },3000)
  //     return ()=>clearTimeout(timer)
  //   },[currentIndex])
  return (
    <>
      <div className=" flex  h-full w-full overflow-hidden relative  top-0 z-0">
        {slides.map((s, i) => {
          return (
            <div
              className="h-screen w-full relative overflow-auto bg-cover bg-center bg-no-repeat shrink-0  transition-all duration-300 ease-in-out flex flex-col justify-center items-center"
              key={i}
              style={{
                marginLeft: i === 0 ? `-${currentIndex * 100}%` : undefined,
              }}
            >
              <Image
                src={s.url}
                layout="fill"
                objectFit="cover"
                priority={true}
              />
              <div className="flex flex-col gap-3 justify-center items-center text-center w-2/4 z-10">
                <h1 className="text-6xl font-extrabold text-amber-500">
                  {s.title}
                </h1>
                <span className="text-xl font-medium text-white">
                  {s.subtitle}
                </span>
                <div className="text-2xl font-bold text-white bg-amber-500 p-3 tracking-wide">
                  立即購買
                </div>
              </div>
            </div>

          );
        })}
        <div className="absolute bottom-0 w-full  flex justify-center">
          {slides.map((s, i) => {
            return (
              <svg
                onClick={() => setCurrentIndex(i)}
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-10 h-6 ${currentIndex===i? "text-white" :""}`} 
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12h-15"
                />
              </svg>
            );
          })}
        </div>

        <div
          className="absolute  left-0 z-10 h-full w-1/6 flex justify-center items-center "
          onClick={() => goToPrevious()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </div>

        <div
          className="absolute  right-0  h-full w-1/6 flex justify-center items-center "
          onClick={() => goToNext()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
    </>
  );
}

export default ImageCarousel;
