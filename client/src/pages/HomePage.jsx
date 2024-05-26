import React from 'react';
import Layout from "../components/Layout/Layout";
import Banner from "../components/Home/Banner/Banner";
import ExploreProducts from "../components/Home/ExploreProducts/ExploreProducts";
import FlashSale from "../components/Home/FlashSale/FlashSale";
import NewArrival from '../components/Home/NewArrival/NewArrival';

export default function HomePage() {
  return (
    <div className="w-full mx-auto">
      <Layout>
        <Banner />
        <div className="flex justify-center items-center my-4">
          <div className="w-full max-w-5xl px-4">
            <FlashSale />
            <ExploreProducts />
            <NewArrival />
          </div>
        </div>
      </Layout>
    </div>
  );
}
