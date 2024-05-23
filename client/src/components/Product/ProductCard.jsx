import React from "react";
import { BsBagFill, BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { cartState, wishlistState } from "../../recoil/atom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function ProductCard({ data }) {
  const [cart, setCart] = useRecoilState(cartState);
  const [wishlist, setWishlist] = useRecoilState(wishlistState);
  const navigate = useNavigate();

  const isInWishlist = wishlist.some(item => item.id === data.id);
  const isInCart = cart.some(item => item.id === data.id);
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

  const handleAddToCart = () => {
    if (!isInCart) {
      setCart([...cart, data]);
    } else {
      setCart(cart.filter(item => item.id !== data.id));
    }
  };

  const handleAddToWishlist = async () => {
    if (!isInWishlist) {
      try {
        // await axios.post('http://localhost:5000/wishlist', { userId, productId: data.id });
        setWishlist([...wishlist, data]);
      } catch (error) {
        console.error("Error adding to wishlist:", error);
      }
    } else {
      try {
        // await axios.delete('http://localhost:5000/wishlist', { data: { userId, productId: data.id } });
        setWishlist(wishlist.filter(item => item.id !== data.id));
      } catch (error) {
        console.error("Error removing from wishlist:", error);
      }
    }
  };


  const handleCardClick = () => {
    navigate(`/products/${data.id}`);
    console.log("Card clicked");
  };
  return (
    // TODO : Add to cart & wishlist
    <div className="group">
      <div className="card card-compact w-60 min-96 shadow-xl">
        <figure className="h-40">
          <img src={data.thumbnail} alt={data.name} className="w-full h-full object-cover cursor-pointer" onClick={handleCardClick} />
        </figure>
        <button 
         onClick={handleAddToWishlist}
         className={isInWishlist ? "btn btn-circle btn-sm absolute top-2 right-2 btn-error" : "btn btn-circle btn-sm absolute top-2 right-2"}
         >
          <svg
            className="h-8 w-8"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="card-body flex flex-col">
          <div className="h-12">
            <button onClick={handleCardClick}>
            <h3 className="card-title line-clamp-2">{data.title}</h3>

            </button>
          </div>
          <div className="card-actions justify-between items-center mt-auto">
            <div className="flex flex-row items-center">
              {renderStars(data.rating)}
              <p>{data.rating}</p>
            </div>
            <div className="flex flex-row justify-between w-full items-center">
              <p className="text-xl">${data.price}</p>
              <button className="btn btn-accent btn-sm">
                <BsBagFill /> {isInCart ? 'Remove from cart' : 'Add to cart'}
              </button>
            </div>

            <div className="mt-2">
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
