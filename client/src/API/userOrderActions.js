import { useRecoilState } from "recoil";
import axios from "axios";
import { orderListState } from "../recoil/order";

const url = "http://localhost:3333/user/";

const useOrderActions = (userId) => {
  const [orderList, setOrderList] = useRecoilState(orderListState);

  const fetchOrderList = async () => {
    try {
      const response = await axios.get(`${url}order/${userId}`);
      if (response.data.status === "ok") {
        setOrderList(response.data.data);
      } else {
        console.error("Error fetching order list:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching order list:", error);
    }
  };

  const processOrder = async (orderData) => {
    try {
      const response = await axios.post(`${url}orders/checkout`, orderData);
      if (response.data.status === "ok") {
        console.log("Order and order items created successfully.");
      } else {
        console.error("Error creating order:", response.data.message);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  return { fetchOrderList, processOrder };
};

export default useOrderActions;
