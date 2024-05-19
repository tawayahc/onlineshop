// useCartActions.js
import { useRecoilState } from "recoil";
import axios from "axios";
import { cartState } from "../recoil/cart";

const useCartActions = (userId) => {
  const [cart, setCart] = useRecoilState(cartState);
  const fetchCart = async () => {
    try {
      const response = await axios.get(`http://localhost:3333/cart/${userId}`);
      if (response.data.status === "ok") {
        setCart(response.data.data);
        // console.log("Cart data fetched successfully:", response.data.data);
      } else {
        console.error("Error fetching cart data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (product) => {
    try {
      await axios.post("http://localhost:3333/cart", {
        userId,
        productId: product.ProductID,
      });
      await fetchCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete("http://localhost:3333/cart", {
        data: { userId, productId },
      });
      await fetchCart();
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const updateCartQuantity = async (productId, quantity) => {
    try {
      await axios.patch("http://localhost:3333/cart", {
        userId,
        productId,
        quantity,
      });
      await fetchCart();
    } catch (error) {
      console.error("Error updating cart quantity:", error);
    }
  };

  return {
    cart,
    // totalQuantity,
    // totalPrice,
    fetchCart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
  };
};

export default useCartActions;
