import axios from "axios";
import { useRecoilState } from "recoil";
import { addressListState, addressFormDataState } from "../recoil/userInfo";

const url = "http://localhost:3333/user/";

export const useAddressActions = (userId) => {
  const [shippingAddress, setShippingAddress] = useRecoilState(addressListState);
  const [formData, setFormData] = useRecoilState(addressFormDataState);

  const fetchShippingAddress = async () => {
    try {
      const response = await axios.get(`${url}address/${userId}`);
      if (response.data.status === "ok") {
        setShippingAddress(response.data.data);
      } else {
        console.error("Error fetching shipping address data:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching shipping address:", error);
    }
  };

  const updateShippingAddress = async (data) => {
    try {
      const response = await axios.put(`${url}address/${userId}`, data);
      if (response.data.status === "ok") {
        setShippingAddress((prevAddress) =>
          prevAddress.map((address) => 
            address.ShippingAddressID === data.ShippingAddressID ? data : address
          )
        );
      } else {
        console.error("Error updating shipping address data:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating shipping address:", error);
    }
  };

  const addShippingAddress = async (data) => {
    try {
      const response = await axios.post(`${url}address/${userId}`,data); 
      if (response.data.status === "ok") {
        setShippingAddress((prevAddress) => [...prevAddress, response.data.data]);
      } else {
        console.error("Error adding shipping address data:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding shipping address:", error);
    }
  };

  const deleteShippingAddress = async (addressId) => {
    try {
      const response = await axios.delete(`${url}address/${userId}`, { data: { ShippingAddressID: addressId } });
      if (response.data.status === "ok") {
        setShippingAddress((prevAddress) =>
          prevAddress.filter((address) => address.ShippingAddressID !== addressId)
        );
      } else {
        console.error("Error deleting shipping address data:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting shipping address:", error);
    }
  };

  return {
    fetchShippingAddress,
    updateShippingAddress,
    addShippingAddress,
    deleteShippingAddress,
  };
};
