import React from "react";
import { BsBagFill, BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

function ProductCard({ id, img, title, star, reviews, price }) {
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
  return (
    // TODO : Wishlist
    <div>
      <div className="card w-60 min-96 bg-black shadow-xl">
        <figure className="h-40">
          <img src={img} alt={title} className="w-full h-full object-cover" />
        </figure>
        <div className="card-body flex flex-col">
          <div className="h-12">
            <h3 className="card-title line-clamp-2">{title}</h3>
          </div>
          <div className="card-actions justify-between items-center mt-auto">
            <div className="flex flex-row items-center">
              {renderStars(star)}
              <p>{reviews}</p>
            </div>
            <div className="flex flex-row justify-between w-full items-center">
              <p>${price}</p>
              <button className="btn btn-accent btn-sm">
                <BsBagFill /> Add to cart
              </button>
            </div>

            <div className="">
              <div className="badge badge-outline mr-2">Fashion</div>
              <div className="badge badge-outline">Products</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
