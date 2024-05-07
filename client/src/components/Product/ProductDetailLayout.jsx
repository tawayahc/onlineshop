import React, { useState } from "react";
import AboutSeller from "./AboutSeller";
import Comment from "./Comment";

const Description = () => {
  return <div className="p-4 bg-gray-200 rounded">This is description</div>;
};

export default function ProductDetailLayout() {
  const [activeButton, setActiveButton] = useState("component1"); // Track clicked button

  const handleClick = (buttonName) => {
    setActiveButton(buttonName); // Update state on click
  };

  return (
    <div className="flex flex-col">
      <div className="w-full mb-5 md:mb-0">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Documents</a>
            </li>
            <li>Add Document</li>
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center mx-auto">
        <div className="flex flex-col md:w-[450px]">
          <div className="mb-4">
            <picture>
              <img
                src="https://picsum.photos/450"
                alt="Shoes"
                className="rounded-xl max-w-full"
              />
            </picture>
          </div>
          <div className="flex flex-row mt-3 overflow-x-auto md:overflow-x-visible justify-evenly">
            <picture className="w-24 h-24">
              <img
                src="https://picsum.photos/450"
                alt="Shoes"
                className="rounded-xl"
              />
            </picture>
            <picture className="w-24 h-24">
              <img
                src="https://picsum.photos/450"
                alt="Shoes"
                className="rounded-xl"
              />
            </picture>
            <picture className="w-24 h-24">
              <img
                src="https://picsum.photos/450"
                alt="Shoes"
                className="rounded-xl"
              />
            </picture>
            <picture className="w-24 h-24">
              <img
                src="https://picsum.photos/450"
                alt="Shoes"
                className="rounded-xl"
              />
            </picture>
          </div>
        </div>
        <div className="grid grid-rows-4 w-full gap-2">
          <div className="flex w-full bg-red-400 px-4 py-2">
            <h1 className="text-3xl">Name</h1>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex w-full items-center">
              <div>star</div>
              <div className="divider divider-horizontal mx-2"></div>
              <div>Stock</div>
            </div>
            <div className="flex w-full items-center my-2">
              <h1 className="text-3xl">Price</h1>
            </div>
          </div>
          
          <div className="w-full bg-black text-primary px-4 py-2 mb-2 row-span-2">
            Option+Buy
          </div>
        </div>
        <div class="col-span-2 w-full gap-4 justify-center mx-auto mt-4 bg-gray-200 ">
          <div className="flex flex-row items-center p-4">
            <button
              className={`m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                activeButton === "component1" && "bg-opacity-50" 
              }`}
              onClick={() => handleClick("Description")}
            >
              Description
            </button>
            <button
              className={`m-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${
                activeButton === "component2" && "bg-opacity-50"
              }`}
              onClick={() => handleClick("Comment")}
            >
              Review
            </button>
            <button
              className={`m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${
                activeButton === "component3" && "bg-opacity-50"
              }`}
              onClick={() => handleClick("AboutSeller")}
            >
              About Seller
            </button>
          </div>
          {activeButton === "Description" && <Description />}
          {activeButton === "Comment" && <Comment />}
          {activeButton === "AboutSeller" && <AboutSeller/>}
        </div>
      </div>
    </div>
  );
}
