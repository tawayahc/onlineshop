import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import ProductCard from "../../components/Product/ProductCard";
import FilterSidebar from "../../components/Filter/FilterSidebar";
import Pagination from "../../components/Product/Pagination";
import { useRecoilValue, useSetRecoilState, useRecoilValueLoadable } from "recoil";
import { loadingState, productsState } from "../../recoil/atom";
import { fetchProducts,paginatedProductsState } from "../../recoil/products";

function ProductListPage() {
  const setProducts = useSetRecoilState(productsState);
  const setLoading = useSetRecoilState(loadingState);
  const productsLoadable = useRecoilValueLoadable(fetchProducts);
  const displayedProducts = useRecoilValue(paginatedProductsState);

  useEffect(() => {
    if (productsLoadable.state === "loading") {
      setLoading(true);
    } else if (productsLoadable.state === "hasValue") {
      setProducts(productsLoadable.contents);
      setLoading(false);
    } else if (productsLoadable.state === "hasError") {
      console.error(productsLoadable.contents);
      setLoading(false);
    }
  }, [productsLoadable, setProducts, setLoading]);


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
          {productsLoadable.state === "loading" ? (
            <div className="flex justify-center h-96">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <div className="grid grid-auto-fit-[15rem] gap-4 my-4">
              {displayedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  data={product}
                />
              ))}
            </div>
          )}
          <Pagination
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
