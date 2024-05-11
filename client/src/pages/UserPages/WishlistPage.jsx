import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import ProductCard from "../../components/Product/ProductCard";
import axios from "axios";

function WishlistPage() {
  const [productsCount, setProductsCount] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products?limit=4"
        );
        if (response.data.products && response.data.products.length)
          setProductsCount(response.data.products.length);
          setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col m-10">
      <div className="text-3xl font-noto">สินค้าในรายการโปรด</div>
      <div className="mt-5">
        {productsCount > 0 ? (
          <div className="grid grid-cols-5 gap-4">
            {products.map((product, index) => (
              <ProductCard
              key={index}
              img={product.thumbnail}
              title={product.title}
              star={product.rating}
              reviews={product.reviews}
              price={product.price} />
            ))}
          </div>
        ) : (
          <div className="text-xl font-noto">ยังไม่มีสินค้าในรายการโปรด</div>
        )}
      </div>
    </div>
  );
}

export default () => (
  <Layout>
    <WishlistPage />
  </Layout>
);
