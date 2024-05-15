import React, { useState, useEffect, Suspense } from "react";
import AboutSeller from "./AboutSeller";
import Review from "./Review";
import {
  BsBagFill,
  BsStarFill,
  BsStarHalf,
  BsStar,
  BsHeart,
} from "react-icons/bs";
import ProductQuantityCounter from "./ProductQuantityCounter";
import ProductImage from "./ProductImage";
import {
  useRecoilValue,
  useRecoilState,
} from "recoil";
import { currentProductDetailState } from "../../recoil/atom";
import {
  productDetailSelector,
  loadingCurrentProductDetail,
} from "../../recoil/productDetail";
import axios from "axios";

const Description = ({ descriptionDetail }) => {
  return <div className="p-4 bg-gray-200 rounded">{descriptionDetail}</div>;
};

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  return (
    <>
      {[...Array(fullStars)].map((_, index) => (
        <BsStarFill key={index} className="text-warning" />
      ))}
      {hasHalfStar && <BsStarHalf key="half" className="text-warning" />}
      {[...Array(emptyStars)].map((_, index) => (
        <BsStar
          key={index + fullStars + (hasHalfStar ? 1 : 0)}
          className="text-gray-400"
        />
      ))}
    </>
  );
};

function ProductDetailLayout({ productId }) {
  const [activeButton, setActiveButton] = useState("Description");
  const [productDetail, setProductDetail] = useRecoilState(currentProductDetailState);
  const [loading, setLoading] = useRecoilState(loadingCurrentProductDetail);

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  }
// WARN : API
  useEffect(() => {
    const fetchData = async () => {
      if (!productId) return;
      setLoading(true);
      try {
        const response = await axios.get(`https://dummyjson.com/products/${productId}`);
        setProductDetail(prevState => ({
          ...prevState,
          name: response.data.title,
          description: response.data.description,
          price: response.data.price,
          quantityAvailable: response.data.stock,
          ratingAvg: response.data.rating,
          shopName: response.data.brand,
          productImages: response.data.images,
        }));
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [productId, setProductDetail, setLoading]);

  const product = useRecoilValue(productDetailSelector);

  //NOTE : it shhould suit with our db
  // const thumbnailImages = product?.productImages?.map(image => image.Productimagecode) || [];
  const thumbnailImages = product?.productImages || [];

  /*
  name
  ratingAvg
  price
  quantityAvailable
  productImages
  description
  */

  //WARN : properties name
  return (
    <div className="flex flex-col">
      {loading ? (
        <div className="flex justify-center h-96">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center mx-auto">
          <ProductImage thumbnailImages={thumbnailImages} />
          <div className="grid grid-rows-6 max-w-[450px] max-h-[450px] gap-2 px-4">
            <div className="flex flex-col w-full py-2">
              <h1 className="text-3xl max-w-[418px]">{product.name}</h1>
            </div>
            <div className="flex flex-col w-full ">
              <div className="flex w-full items-center">
                {renderStars(product.ratingAvg)}
                <div className="ml-2">{product.ratingAvg}</div>
                <div className="divider divider-horizontal mx-2"></div>
                <div>
                  {product.quantityAvailable > 0 ? "In Stock" : "Out of Stock"}
                </div>
              </div>
              <div className="flex w-full items-center mt-4 h-full">
                <h1 className="text-4xl">${product.price}</h1>
              </div>
            </div>

            <div className="flex flex-col w-full mb-2 row-span-4 ">
              <div className="flex flex-col h-full justify-center space-y-4">
                <ProductQuantityCounter
                  initialCount={1}
                  minCount={1}
                  maxCount={100}
                />
                <div className="flex">
                  <button className="btn btn-accent btn-wide mr-4">
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
              <Description descriptionDetail={product.description} />
            )}
            {activeButton === "Review" && <Review />}
            {activeButton === "AboutSeller" && <AboutSeller />}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetailLayout;
