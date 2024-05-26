import axios from "axios";
import { useRecoilState } from "recoil";
import { paymentListState,paymentFormDataState } from "../recoil/userInfo";
import { useCallback } from "react";

const url = "http://localhost:3333/user/";

const usePayMethodActions = (userId) => {
  const [paymentMethod, setPaymentMethod] = useRecoilState(paymentListState);
  const [paymentFormData, setPaymentFormData] = useRecoilState(
    paymentFormDataState
  )
  const fetchPaymentMethod = useCallback(async () => {
    try {
      const response = await axios.get(`${url}payment/${userId}`);
      if (response.data.status === "ok") {
        setPaymentMethod(response.data.data);
        return response.data.data;
      } else {
        console.error(
          "Error fetching payment method data:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error fetching payment method:", error);
    }
  }, [setPaymentMethod]);

  const addPaymentMethod = async (data) => {
    try {
      const response = await axios.post(`${url}payment/${userId}`, data);
      if (response.data.status === "ok") {
        setPaymentMethod((prevMethod) => [...prevMethod, response.data.data]);
      } else {
        console.error(
          "Error adding payment method data:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error adding payment method:", error);
    }
  };

  const updatePaymentMethod = async (data) => {
    try {
      const response = await axios.put(`${url}payment/${userId}`, data);
      if (response.data.status === "ok") {
        setPaymentMethod((prevMethod) =>
          prevMethod.map((method) =>
            method.PaymentMethodID === data.PaymentMethodID ? data : method
          )
        );
      } else {
        console.error(
          "Error updating payment method data:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error updating payment method:", error);
    }
  };

  const deletePaymentMethod = async (paymentId) => {
    try {
      const response = await axios.delete(`${url}payment/${userId}`,{data:{paymentId}});
      if (response.data.status === "ok") {
        setPaymentMethod((prevMethod) =>
          prevMethod.filter((method) => method.PaymentMethodID !== paymentId)
        );
      } else {
        console.error(
          "Error deleting payment method data:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error deleting payment method:", error);
    }
  };

  return {
    fetchPaymentMethod,
    updatePaymentMethod,
    addPaymentMethod,
    deletePaymentMethod,
  };
};

export default usePayMethodActions;
