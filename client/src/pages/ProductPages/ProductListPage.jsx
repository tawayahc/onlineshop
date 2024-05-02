import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import ProductCard from "../../components/Product/ProductCard";
// import data from "../../db/data";
import FilterSidebar from "../../components/Filter/FilterSidebar";
import Pagination from "../../components/Product/Pagination";
import axios from "axios";

function ProductListPage() {
  const [selectedFilters, setSelectedFilters] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(20);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        //NOTE : Fetch data from database
        setLoading(true);
        const response = await axios.get("https://dummyjson.com/products?limit=100");
        if (response.data.products && response.data.products.length)
          setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Pagination
  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )

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
            <h2 className="text-3xl font-bold">รายการสินค้า</h2>
          </div>
          {loading ? (
            <div className="flex justify-center h-96">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <div className="grid grid-auto-fit-[15rem] gap-4 my-4">
              {currentProducts.map((product, index) => (
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
          )}
            <Pagination
              length={products.length}
              productsPerPage={productsPerPage}
              handlePagination={handlePagination}
              currentPage={currentPage}
            />
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
