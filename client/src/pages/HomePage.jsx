import React from 'react';
import Layout from '../components/Layout/Layout';
import FlashSale from "../components/home/Flashsale/FlashSale";
import TopBanner from '../components/home/Banner/TopBanner';
import Category from '../components/home/Category/Category';
import BestSelling from '../components/home/BestSelling/BestSelling';
import Sale from "../components/home/Sale/Sale";
import OurProducts from '../components/home/OurProducts/OurProducts';
import SpecialOffer from '../components/home/SpecialOffer/SpecialOffer';

export default function HomePage() {
  return (
      <div className="w-full mx-auto">
        <Layout>
        <Category />
        <TopBanner />  
        <FlashSale />
        
        <BestSelling />
        <SpecialOffer />
        <OurProducts />
        <Sale />
        </Layout>
      </div>
  );
};
