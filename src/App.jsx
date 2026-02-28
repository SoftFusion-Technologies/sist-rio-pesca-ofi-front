// src/App.jsx
import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation
} from 'react-router-dom';

import Navbar from './components/layout/Navbar'
import FishingCampingBackground from './components/ui/FishingCampingBackground';
import HomePage from './pages/HomePage';
import Footer from './components/layout/Footer';
import SorteosPage from './pages/SorteosPage';
// import ContactPage from './pages/ContactPage';

function HashScrollHandler() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const id = location.hash.replace('#', '');
    const el = document.getElementById(id);
    if (!el) return;

    const t = setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 40);

    return () => clearTimeout(t);
  }, [location.pathname, location.hash]);

  return null;
}

/*
 * Benjamin Orellana - 2026-02-22 - Layout raíz persistente para mantener el fondo animado montado entre cambios de ruta.
 */
function RootLayout() {
  return (
    <div className="min-h-screen">
      <FishingCampingBackground
        opacity={0.8}
        particleCount={85}
        bubbleCount={24}
        fishCount={5}
        waveLines={5}
      />

      {/* Benjamin Orellana - 2026-02-22 - El contenido queda por encima del canvas global persistente. */}
      <main className="relative z-1">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <HashScrollHandler />
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/sorteos" element={<SorteosPage />} />
          {/* <Route path="/contacto" element={<ContactPage />} /> */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}
