import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import ProductsSection from '../components/sections/ProductsSection';

const HomePage = () => {
  return (
    <div className="relative">
      <HeroSection />
      <ProductsSection />
    </div>
  );
};

export default HomePage;
