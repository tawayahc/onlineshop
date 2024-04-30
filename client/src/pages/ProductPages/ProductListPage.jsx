import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import ProductCard from "../../components/Product/ProductCard";
// import data from "../../db/data";
import FilterSidebar from "../../components/Filter/FilterSidebar";
import axios from "axios";

function ProductListPage() {
  const [selectedFilters, setSelectedFilters] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        //NOTE : Fetch data from database
        const response = await axios.get("https://dummyjson.com/products");
        // console.log(response.data.products);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Fiter section
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  function filteredData(data, selected) {
    let fileredProducts = data;

    if (selected) {
      fileredProducts = fileredProducts.filter(
        ({ category, brand, price, rating }) =>
          category === selected ||
          brand === selected ||
          price === selected ||
          rating === selected
      );
    }

    return fileredProducts.map(({ id, img, title, star, reviews, price }) => (
      <ProductCard
        key={id}
        img={img}
        title={title}
        star={star}
        reviews={reviews}
        price={price}
      />
    ));
  }

  return (
    <div>
      <div className="flex flex-row w-full">
        <div>
          <h1 className="text-3xl font-bold p-3 font-noto">ตั้งค่าการค้นหา</h1>
          <FilterSidebar />
        </div>
        <div className="flex flex-col p-3 w-full">
          <div>
            <h2>รายการสินค้า</h2>
          </div>
          {products.length > 0 ? (
            <div className="grid grid-auto-fit-[15rem] gap-4 my-4">
              {products.map((product, index) => (
                <ProductCard
                  key={index}
                  img={product.thumbnail}
                  title={product.title}
                  star={product.rating}
                  reviews={product.reviews}
                  price={product.price}
                />
              ))}
            </div>
           
          ) : (
            <div className="flex justify-center h-96">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          )}
          <div className="flex justify-center">
            <div className="join">
              <button className="join-item btn">1</button>
              <button className="join-item btn btn-active">2</button>
              <button className="join-item btn">3</button>
              <button className="join-item btn">4</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default () => (
  <Layout>
    <ProductListPage />
  </Layout>
);
