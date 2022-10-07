import { useSession } from "next-auth/react";
import React from "react";
import Breadcrumb from "../../components/widget/Breadcrumb";
import { trpc } from "../../utils/trpc";

// const fakeData = {
//     shotgun:{

//     }
// }

function index() {
  const { data: session } = useSession();
  const { data: category,isError,isLoading } = trpc.useQuery(["admin.getCategory"], {
    staleTime: Infinity,
  });


  if (session?.user?.isAdmin || !session) {
    return <h1>無權限</h1>;
  }
  // if(isLoading){
  //   return <>loading</>
  // }
  return (
    <>
      <main className="w-full h-full bg-stone-100 flex flex-col gap-3 mx-auto pt-24 px-3  lg:max-w-7xl  lg:grid grid-cols-6 xl:max-w-[1440px]">
        <Breadcrumb />
        <div className="">
          <p className="text-3lx">新增商品</p>
          <div className="divider"></div>
          <div className="flex items-center gap-3">
            <p>商品名稱</p>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <select
            title="category"
            className="select select-bordered w-full max-w-xs"
          >
            {category ? (
              category.map((v, i) => {
                return (
                  <option key={i} disabled={v.parent_category_id === null}>
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
          <div className="w-full"></div>
        </div>
      </main>
    </>
  );
}

export default index;
