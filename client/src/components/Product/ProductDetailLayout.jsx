import React, { useState } from "react";
import AboutSeller from "./AboutSeller";
import Review from "./Review";
import {
  BsBagFill,
  BsStarFill,
  BsStarHalf,
  BsStar,
  BsHeart,
} from "react-icons/bs";
import ProductOptionButton from "./ProductOptionButton";
import ProductQuantityCounter from "./ProductQuantityCounter";
import ProductImage from "./ProductImage";

const Description = ({ descriptionDetail }) => {
  return <div className="p-4 bg-gray-200 rounded">{descriptionDetail}</div>;
};

const fakeDescription = "This is description";

export default function ProductDetailLayout() {
  const [activeButton, setActiveButton] = useState("Description");
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
    { value: "option5", label: "Option 5" },
  ];

  const handleOptionSelected = (selectedOption) => {
    console.log("Selected option:", selectedOption);
  };

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center mx-auto">
        <ProductImage
          thumbnailImages={[
            "https://picsum.photos/450?id=1",
            "https://picsum.photos/450?id=2",
            "https://picsum.photos/450?id=3",
            "https://picsum.photos/450?id=4",
          ]}
        />
        <div className="grid grid-rows-6 max-w-[450px] gap-2 px-4">
          <div className="flex flex-col w-full py-2">
            <h1 className="text-3xl max-w-[418px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h1>
          </div>
          <div className="flex flex-col w-full ">
            <div className="flex w-full items-center">
              <div>star</div>
              <div className="divider divider-horizontal mx-2"></div>
              <div>Stock</div>
            </div>
            <div className="flex w-full items-center my-2 h-full">
              <h1 className="text-3xl">Price</h1>
            </div>
          </div>

          <div className="flex flex-col w-full mb-2 row-span-4 ">
            <div className="flex flex-col">
              <ProductOptionButton
                options={options}
                onOptionSelected={handleOptionSelected}
                optionsName="Color"
              />
              <ProductOptionButton
                options={options}
                onOptionSelected={handleOptionSelected}
                optionsName="Size"
              />
            </div>
            <div className="flex flex-row h-full">
              <ProductQuantityCounter
                initialCount={2}
                minCount={1}
                maxCount={100}
              />
              <div className="flex self-end">
                <button className="btn btn-accent mx-4">
                  <BsBagFill /> Add to cart
                </button>
                <button className="btn">
                  <BsHeart />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 w-full gap-4 justify-center mx-auto mt-4 bg-gray-200 ">
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
              onClick={() => handleClick("Review")}
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
          {activeButton === "Description" && (
            <Description descriptionDetail={fakeDescription} />
          )}
          {activeButton === "Review" && <Review />}
          {activeButton === "AboutSeller" && <AboutSeller />}
        </div>
      </div>
    </div>
  );
}
