import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { categoriesState } from "../../../recoil/atom";
import fetchProductsList from "../../../API/fetchProducts";
import { productsState } from "../../../recoil/atom";

const CategorySelectSection = () => {
  const { fetchCategories,fetchProductbyCategory,fetchProducts } = fetchProductsList();
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [selectedCategoryName, setSelectedCategoryName] = useState("All");
  const [products, setProducts] = useRecoilState(productsState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchCategories()
      .then((data) => {
        setCategories(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSelectCategory = (category) => {
    if (category === "all") {
      setSelectedCategoryName("All");
      setLoading(true);
      fetchProducts()
        .then((data) => {
          setProducts(data);
        }).finally(() => setLoading(false));
      return;
    }
    setSelectedCategoryName(category.ProductCategoryName);
    setLoading(true);
    fetchProductbyCategory(category.ProductCategoryID)
      .then((data) => {
        setProducts(data);
      }).finally(() => setLoading(false));
  };

  // console.log(products);
  
  
  return (
    <div className="flex justify-center my-4">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <button
              key="All"
              className={`mx-2 px-4 py-2 rounded ${
                selectedCategoryName === "All"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleSelectCategory("all")}
            >
              All
            </button>
          {categories.map((category) => (
            <button
              key={category.ProductCategoryID}
              className={`mx-2 px-4 py-2 rounded ${
                selectedCategoryName === category.ProductCategoryName
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleSelectCategory(category)}
            >
              {category.ProductCategoryName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySelectSection;
