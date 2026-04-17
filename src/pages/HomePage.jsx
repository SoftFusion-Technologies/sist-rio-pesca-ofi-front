import React, { useEffect, useState } from 'react';
import HeroSection from '../components/sections/HeroSection';
import SorteosTeaserSection from '../components/sections/SorteosTeaserSection';
import ProductsSection from '../components/sections/ProductsSection';
import CarnadasSection from '../components/sections/CarnadasSection';
import TipsSection from '../components/sections/TipsSection';
import InfoSection from '../components/sections/InfoSection';
import UbicacionSection from '../components/sections/UbicacionSection';
/* ACCESORIOS  */
import FeaturedProductsAccesorios from './FeaturedProductsAccesorios';
import FeaturedProductsCablesAceroTubosAluminio from './FeaturedProductsCablesAceroTubosAluminio';
import FeaturedProductsCascabelPluz from './FeaturedProductsCascabelPluz';
import FeaturedProductsEsmerillones from './FeaturedProductsEsmerillones';
import FeaturedProductsTrampa2 from './FeaturedProductsTrampa2';
import FeaturedProductsTrampa6 from './FeaturedProductsTrampa6';
/* ACCESORIOS  */

/* BOLSOS TERMICOS  */
import FeaturedProductsbt_75 from './Bolsos_Termicos/FeaturedProductsbt_7,5l';
import FeaturedProductsbt_135 from './Bolsos_Termicos/FeaturedProductsbt_13,5';
import FeaturedProductsbt_ConservadoraFishman from './Bolsos_Termicos/FeaturedProductsbt_ConservadoraFishman';
import FeaturedProductsbt_ConservadoraTelgopor from './Bolsos_Termicos/FeaturedProductsbt_ConservadoraTelgopor';
/* BOLSOS TERMICOS  */

/* BOYAS  */
import FeaturedProductsBoyas from './Boyas/FeaturedProductsBoyas';
/* BOYAS  */

/* CAMPING  */
import FeaturedProductsCamping from './Camping/FeaturedProductsCamping';
/* CAMPING  */

/* CAÑAS  */
import FeaturedProductsCañas from './Cañas/FeaturedProductsCañas';
/* CAÑAS  */

import FeaturedProductsCombos from './Combos/FeaturedProductsCombos';
import FeaturedProductsCuellos from './Cuellos/FeaturedProductsCuellos';
import FeaturedProductsGaveteros_Cajas from './Gaveteros_Cajas/FeaturedProductsGaveteros_Cajas';
const HomePage = () => {

  return (
    <div className="relative">
      <HeroSection />

      <div className="relative z-20 -mt-10 sm:-mt-14 lg:-mt-20">
        <SorteosTeaserSection />
        {/* ACCESORIOS  */}
        <FeaturedProductsAccesorios></FeaturedProductsAccesorios>
        <FeaturedProductsCablesAceroTubosAluminio></FeaturedProductsCablesAceroTubosAluminio>
        <FeaturedProductsCascabelPluz></FeaturedProductsCascabelPluz>
        <FeaturedProductsEsmerillones></FeaturedProductsEsmerillones>
        <FeaturedProductsTrampa2></FeaturedProductsTrampa2>
        <FeaturedProductsTrampa6></FeaturedProductsTrampa6>
        {/* ACCESORIOS  */}

        {/* BOLSOS TERMICOS  */}
        <FeaturedProductsbt_75></FeaturedProductsbt_75>
        <FeaturedProductsbt_135></FeaturedProductsbt_135>
        <FeaturedProductsbt_ConservadoraFishman></FeaturedProductsbt_ConservadoraFishman>
        <FeaturedProductsbt_ConservadoraTelgopor></FeaturedProductsbt_ConservadoraTelgopor>
        {/* BOLSOS TERMICOS  */}

        {/* BOYAS  */}
        <FeaturedProductsBoyas></FeaturedProductsBoyas>
        {/* BOYAS  */}
        {/* CAMPING  */}
        <FeaturedProductsCamping></FeaturedProductsCamping>
        {/* CAMPING  */}

        {/* CAÑAS  */}
        <FeaturedProductsCañas></FeaturedProductsCañas>
        {/* CAÑAS  */}
        {/* Combos  */}
        <FeaturedProductsCombos></FeaturedProductsCombos>
        {/* Combos  */}
        {/* Cuellos  */}
        <FeaturedProductsCuellos></FeaturedProductsCuellos>
        {/* Cuellos  */}
        {/* Gaveteros y cajas  */}
        <FeaturedProductsGaveteros_Cajas></FeaturedProductsGaveteros_Cajas>
        {/* Gaveteros y cajas  */}
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
