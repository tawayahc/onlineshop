import React from "react";
import Layout from "../../components/Layout/Layout";
import ProductCard from "../../components/Product/ProductCard";
import data from "../../db/data";
import FilterSidebar from "../../components/Filter/FilterSidebar";

function ProductListPage() {
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
          <div className="grid grid-auto-fit-[15rem] gap-4 my-4">
            <ProductCard
              img={data[0].img}
              title={data[0].title}
              star={data[0].star}
              reviews={data[0].reviews}
              price={data[0].price}
            />
            <ProductCard
              img={data[1].img}
              title={data[1].title}
              star={data[1].star}
              reviews={data[1].reviews}
              price={data[1].price}
            />
            <ProductCard
              img={data[1].img}
              title={data[1].title}
              star={data[1].star}
              reviews={data[1].reviews}
              price={data[1].price}
            />
            <ProductCard
              img={data[2].img}
              title={data[2].title}
              star={data[2].star}
              reviews={data[2].reviews}
              price={data[2].price}
            />
            <ProductCard
              img={data[1].img}
              title={data[1].title}
              star={data[1].star}
              reviews={data[1].reviews}
              price={data[1].price}
            />
            <ProductCard
              img={data[1].img}
              title={data[1].title}
              star={data[1].star}
              reviews={data[1].reviews}
              price={data[1].price}
            />
            <ProductCard
              img={data[2].img}
              title={data[2].title}
              star={data[2].star}
              reviews={data[2].reviews}
              price={data[2].price}
            />
            <ProductCard
              img={data[2].img}
              title={data[2].title}
              star={data[2].star}
              reviews={data[2].reviews}
              price={data[2].price}
            />
          </div>
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
