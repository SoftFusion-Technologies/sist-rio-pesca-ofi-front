import React, { useEffect, useState } from 'react';
import HeroSection from '../components/sections/HeroSection';
import SorteosTeaserSection from '../components/sections/SorteosTeaserSection';
import ProductsSection from '../components/sections/ProductsSection';
import CarnadasSection from '../components/sections/CarnadasSection';
import TipsSection from '../components/sections/TipsSection';
import InfoSection from '../components/sections/InfoSection';
import UbicacionSection from '../components/sections/UbicacionSection';

import FeaturedProductsAccesorios from './FeaturedProductsAccesorios';
import FeaturedProductsCablesAceroTubosAluminio from './FeaturedProductsCablesAceroTubosAluminio';
import FeaturedProductsCascabelPluz from './FeaturedProductsCascabelPluz';

const HomePage = () => {

  return (
    <div className="relative">
      <HeroSection />

      <div className="relative z-20 -mt-10 sm:-mt-14 lg:-mt-20">
        <SorteosTeaserSection />
        <FeaturedProductsAccesorios></FeaturedProductsAccesorios>
        <FeaturedProductsCablesAceroTubosAluminio></FeaturedProductsCablesAceroTubosAluminio>
        <FeaturedProductsCascabelPluz></FeaturedProductsCascabelPluz>
        {/* <ProductsSection
          products={products}
          title="Accesorios"
          subtitle="Explorá accesorios seleccionados para acompañar tus salidas y consultanos por disponibilidad."
        />{' '} */}
        <CarnadasSection />
        <TipsSection />
        <InfoSection />
        <UbicacionSection></UbicacionSection>
      </div>
    </div>
  );
};

export default HomePage;
