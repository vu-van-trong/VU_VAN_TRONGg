import React from 'react';
import HeroSlider from '../components/HeroSlider';
import CategoryBanners from '../components/CategoryBanners';
import ProductList from '../components/ProductList';
import PromotionBanners from '../components/PromotionBanners';
import AboutUs from '../components/AboutUs';
import BackToTop from '../components/BackToTop';
import { newProducts, bestSellerProducts } from '../data/products';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-quicksand">
      <main className="flex-1">
        <HeroSlider />
        <CategoryBanners />
        <ProductList 
          title="Sản phẩm mới" 
          products={newProducts} 
          link="/collections/frontpage" 
        />
        <PromotionBanners />
        <ProductList 
          title="Sản phẩm bán chạy" 
          products={bestSellerProducts} 
          link="/collections/onsale" 
        />
        <AboutUs />
      </main>
      <BackToTop />
    </div>
  );
}