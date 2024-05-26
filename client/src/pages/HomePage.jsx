import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";

function HomePage() {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  return (
    <div className="w-full mx-auto">
      <Layout>
        <Banner />
        <div className="flex justify-center items-center my-4">
          <div className="w-full max-w-5xl px-4">
            {/* <FlashSale /> */}
            <ExploreProducts />
            {/* <NewArrival /> */}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default () => (
  <Layout>
    <HomePage />
  </Layout>
);
