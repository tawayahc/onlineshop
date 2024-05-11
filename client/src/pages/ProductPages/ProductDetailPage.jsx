import React from "react";
import Layout from "../../components/Layout/Layout";
import ProductDetailLayout from "../../components/Product/ProductDetailLayout";

function ProductDetailPage() {
  return (
    <div>
      <ProductDetailLayout />
    </div>
  );
}

export default () => (
  <Layout>
    <ProductDetailPage />
  </Layout>
);
