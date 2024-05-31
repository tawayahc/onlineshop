import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import ProductCard from "../../components/Product/ProductCard";
import axios from "axios";
import useWishActions from "../../API/userWishAction";
import { useRecoilValue} from "recoil";
import { wishlistState } from "../../recoil/wishlist";

function WishlistPage() {
  const wishlist = useRecoilValue(wishlistState);
  const userId = localStorage.getItem("userId");
  const { fetchWishlist,addToWishlist, removeFromWishlist } = useWishActions(userId);
  const [loading, setLoading] = useState(true);

  //NOTE : wishlist fetch database
  useEffect(() => {
    setLoading(true);
    fetchWishlist().finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col m-10">
      <div className="text-3xl font-noto">สินค้าในรายการโปรด</div>
      <div className="mt-5">
        {wishlist ? (
          <div className="grid grid-cols-5 gap-4">
            {wishlist.map((product) => (
              <ProductCard
                key={product.ProductID}
                data={product}
              />
            ))}
          </div>
        ) : (
          <div className="text-xl font-noto">ยังไม่มีสินค้าในรายการโปรด</div>
        )}
      </div>
    </div>
  );
}

export default ({ userId }) => (
  <Layout>
    <WishlistPage userId={userId} />
  </Layout>
);
