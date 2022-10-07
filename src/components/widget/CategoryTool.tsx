import React, { useState } from "react";

function CategoryTool() {
    const [openCategory, setOpenCategory] = useState(false);

  return (
   
          <div className="flex flex-col py-3  w-full lg:col-span-1 lg:py-10">
          <div
            tabIndex={0}
            className={`collapse collapse-arrow border border-base-300 bg-base-100 rounded-box ${
              openCategory ? "collapse-open" : "collapse-close"
            }`}
          >
            <div
              className="collapse-title text-xl font-medium"
              onClick={() => setOpenCategory(!openCategory)}
            >
              價格區間
            </div>
            <div className="collapse-content flex flex-col gap-3">
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
              <button className="btn btn-outline">Button</button>
            </div>
          </div>
          <div className="divider"></div>

          <div className="btn-group overflow-auto px-2">
            <button className="btn btn-outline btn-primary">最新</button>
            <button className="btn btn-outline btn-secondary">最舊</button>
            <button className="btn btn-outline btn-accent">價格</button>
          </div>
        </div>

  )
}

export default CategoryTool