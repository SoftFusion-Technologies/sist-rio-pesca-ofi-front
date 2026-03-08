import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import SorteosTeaserSection from '../components/sections/SorteosTeaserSection';
import ProductsSection from '../components/sections/ProductsSection';

const HomePage = () => {
  return (
    <div className="relative">
      <HeroSection />

      <div className="relative z-20 -mt-10 sm:-mt-14 lg:-mt-20">
        <div
          className="relative"
          style={{
            background: `
              linear-gradient(
                180deg,
                rgba(6,20,37,0.10) 0%,
                rgba(6,20,37,0.48) 16%,
                rgba(6,20,37,0.86) 36%,
                rgba(6,20,37,1) 100%
              )
            `
          }}
        >
          <SorteosTeaserSection />
          <ProductsSection />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
