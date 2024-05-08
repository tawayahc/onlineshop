import React from "react";

function Comment() {
  return (
    <div className="flex flex-row m-4">
      <div className="avatar items-start">
        <div className="w- h-12 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <div className="flex flex-col ml-4 text-wrap">
        <div className="flex flex-row">
          <div className="font-bold text-xl">Name</div>
          <div className="ml-4 self-end text-gray-500">Date</div>
        </div>
        <div>Star</div>
        <div className="flex flex-wrap max-w-[450px]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium
          commodi, at modi asperiores aliquid repellendus rem quasi nostrum
          inventore facere perferendis unde harum ducimus? Labore minima ratione
          minus obcaecati nisi!
        </div>
      </div>
    </div>
  );
}

export default Comment;
