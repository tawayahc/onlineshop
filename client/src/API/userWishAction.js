import axios from "axios";
import { wishlistState } from "../recoil/wishlist";
import { useRecoilState } from "recoil";
import { useCallback } from "react";

export const useWishActions = (userId) => {
  const [wishlist, setWishlist] = useRecoilState(wishlistState);

  const fetchWishlist = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3333/wishlist/${userId}`);
      setWishlist(response.data.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }, [setWishlist]);

  const addToWishlist = async (productId) => {
    try {
      await axios.post("http://localhost:3333/wishlist",  {
       userId, productId });
      await fetchWishlist();
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(`http://localhost:3333/wishlist`, {
        data: { userId, productId },
      });
      await fetchWishlist();
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  return {
    wishlist,
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
  };
}

export default useWishActions