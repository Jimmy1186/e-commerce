import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import homeIcon from "public/icon.png";

function NavList() {
  return (
    <>
      <ul
        className="text-stone-300 font-medium text-2xl flex flex-col justify-center items-center gap-3
     lg:flex-row lg:gap-6
     "
      >
        <li>配件</li>
        <li>彈藥</li>
        <li>瞄具</li>
        <li>其他</li>
        <li><Link href={"/admin"}><a>管理員</a></Link></li>
        <li><Link href={"/api/auth/signin"}><a>登入</a></Link></li>
        <li><Link href={"/api/auth/signout"}><a>登出</a></Link></li>
      </ul>
    </>
  );
}

function Navbar() {
  const [navbar, setNavbar] = useState(false);

  return (
    <>
      <nav
        className="fixed top-0 w-full h-24 p-3 bg-[#07494375] z-10
    flex justify-between items-center
    "
      >
        <Link href="/">
          <a className="flex w-14 h-14">
            <Image src={homeIcon} />
          </a>
        </Link>

        <div className="hidden lg:block">
          <NavList />
        </div>

        <div className="flex gap-5 lg:hidden" onClick={() => setNavbar(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-stone-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </nav>

      <div
        className={`
      fixed w-5/6 h-screen bg-stone-800 z-50  flex-col gap-10 transition-all 
      ${navbar ? "left-0 opacity-100 block" : "-left-[850px] opacity-0 "}
      lg:hidden
   
      
      `}
      >
        <div className="p-5" onClick={() => setNavbar(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-stone-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
<div className={`${navbar?"block":"hidden"}`}>
       <NavList />
</div>
   
      </div>

      {navbar ? (
        <div
          className=" h-screen w-screen fixed  z-20"
          onClick={() => setNavbar(false)}
        ></div>
      ) : (
        ""
      )}
    </>
  );
}

export default Navbar;
