// import { useCallback } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";
import { productsState, categoriesState } from "../recoil/atom";
import { useCallback } from "react";

const url = "http://localhost:3333/";
const fetchProductsList = () => {
  const [products, setProducts] = useRecoilState(productsState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(url + "products");
      if (response.data.status === "ok") {
        setProducts(response.data.data);
        return response.data.data;
      } else {
        console.error("Error fetching products:", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, [setProducts]);

  
  const fetchCategories = async () => {
    try {
      const response = await axios.get(url + "products/categories");
      if (response.data.status === "ok") {
        setCategories(response.data.data);
        return response.data.data;
      } else {
        console.error("Error fetching categories:", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  const fetchProductbyCategory = async (categoryID) => {
    console.log(categoryID);
    try {
      const response = await axios.get(`${url}products/category/${categoryID}`);
      if (response.data.status === "ok") {
        console.log(response.data.data);
        setProducts(response.data.data);
        return response.data.data;
      } else {
        console.error("Error fetching products:", response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  // WARN : code below is not used.
  // const fetchProductWithCategories = useCallback(async ({ filters }) => {
  //   // console.log(filters);
  //   try {
  //     const response = await axios.get(url + "products/category", {
  //       params: filters,
  //     });
  //     if (response.data.status === "ok") {
  //       setProducts(response.data.data);
  //       return response.data.data;
  //     } else {
  //       console.error("Error fetching products:", response.data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }, [setProducts]);
  return { fetchProducts, fetchCategories, fetchProductbyCategory };
};
export default fetchProductsList;
