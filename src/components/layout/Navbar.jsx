import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FaBars,
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaTimes,
  FaTiktok,
  FaWhatsapp
} from 'react-icons/fa';

import logoImg from '../../assets/logos/logo.jpeg';
import { siteConfig } from '../../config/siteConfig';

/*
 * Benjamin Orellana - 2026-02-22 - Navbar full-width premium estilo river glass con navegación por secciones, CTA WhatsApp y dock social (Instagram/Facebook/TikTok).
 */

const SECTION_LABELS = {
  inicio: 'INICIO',
  productos: 'PRODUCTOS',
  carnadas: 'CARNADAS',
  tips: 'TIPS',
  sorteos: 'SORTEOS',
  info: 'INFO',
  ubicacion: 'UBICACIÓN'
};

const enterVariants = {
  hidden: { opacity: 0, y: -18, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  }
};

const childVariants = {
  hidden: { opacity: 0, y: -8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerWrap = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.03
    }
  }
};

function toLabel(section) {
  return SECTION_LABELS[section] || String(section || '').toUpperCase();
}

function useScrollCompact(threshold = 18) {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    let rafId = 0;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setIsCompact(window.scrollY > threshold);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, [threshold]);

  return isCompact;
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isCompact = useScrollCompact(18);

  const sections = useMemo(() => siteConfig.sections || [], []);
  const [activeSection, setActiveSection] = useState(sections[0] || 'inicio');
  const [hoveredSection, setHoveredSection] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const socials = siteConfig?.social || {};
  const whatsappUrl =
    socials?.whatsapp?.url ||
    `https://wa.me/${siteConfig?.contact?.phoneRaw || ''}`;

  const socialItems = [
    {
      key: 'instagram',
      icon: FaInstagram,
      label: socials?.instagram?.label || 'Instagram',
      handle: socials?.instagram?.handle || '',
      url: socials?.instagram?.url || ''
    },
    {
      key: 'facebook',
      icon: FaFacebookF,
      label: socials?.facebook?.label || 'Facebook',
      handle: socials?.facebook?.handle || '',
      url: socials?.facebook?.url || ''
    },
    {
      key: 'tiktok',
      icon: FaTiktok,
      label: socials?.tiktok?.label || 'TikTok',
      handle: socials?.tiktok?.handle || '',
      url: socials?.tiktok?.url || ''
    }
  ].filter((x) => !!x.url);

  // Benjamin Orellana - 2026-02-22 - Sincroniza sección activa desde el hash para navegación SPA por anchors.
  useEffect(() => {
    const hash = location.hash?.replace('#', '');

    // Benjamin Orellana - 2026-02-22 - Marca sorteos como activo cuando la ruta actual es /sorteos.
    if (location.pathname === '/sorteos') {
      setActiveSection('sorteos');
      return;
    }

    // Home + hash (#inicio, #productos, etc.)
    if (location.pathname === '/' && hash && sections.includes(hash)) {
      setActiveSection(hash);
      return;
    }

    // Home sin hash => sección inicial
    if (location.pathname === '/' && !hash && sections[0]) {
      setActiveSection(sections[0]);
      return;
    }

    // Opcional: limpiar activo en otras rutas
    // setActiveSection('');
  }, [location.hash, location.pathname, sections]);

  // Benjamin Orellana - 2026-02-22 - Scrollspy para resaltar la sección visible de la landing en desktop/mobile.
  useEffect(() => {
    if (location.pathname !== '/') return undefined;
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return undefined;
    }

    const targets = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!targets.length) return undefined;

    const visibleEntries = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleEntries.set(entry.target.id, entry);
        });

        const intersects = Array.from(visibleEntries.values())
          .filter((e) => e.isIntersecting)
          .sort((a, b) => {
            if (b.intersectionRatio !== a.intersectionRatio) {
              return b.intersectionRatio - a.intersectionRatio;
            }
            return (
              Math.abs(a.boundingClientRect.top) -
              Math.abs(b.boundingClientRect.top)
            );
          });

        if (intersects[0]?.target?.id) {
          setActiveSection(intersects[0].target.id);
          return;
        }

        const closest = targets
          .map((el) => ({
            id: el.id,
            d: Math.abs(el.getBoundingClientRect().top)
          }))
          .sort((a, b) => a.d - b.d)[0];

        if (closest?.id) setActiveSection(closest.id);
      },
      {
        root: null,
        rootMargin: '-16% 0px -58% 0px',
        threshold: [0.1, 0.2, 0.35, 0.5, 0.7]
      }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [location.pathname, sections]);

  // Cerrar menu mobile cuando cambia ruta/hash
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  // Lock scroll en mobile menu
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (mobileOpen) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // Benjamin Orellana - 2026-02-22 - Navegación híbrida: /sorteos como ruta real y el resto como secciones del home por hash.
  const goToSection = (section) => {
    if (!section) return;

    // Ruta dedicada
    if (section === 'sorteos') {
      navigate('/sorteos');
      return;
    }

    // Si estamos fuera del home, navegamos al home con hash
    if (location.pathname !== '/') {
      navigate(`/#${section}`);
      return;
    }

    // Si ya estamos en home, scroll/hash local
    const el = document.getElementById(section);
    if (el) {
      const navOffset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top, behavior: 'smooth' });

      // actualiza hash sin recargar
      if (window.location.hash !== `#${section}`) {
        window.history.replaceState(null, '', `#${section}`);
      }
      return;
    }

    // fallback
    window.location.hash = section;
  };

  return (
    <>
      <motion.header
        variants={enterVariants}
        initial="hidden"
        animate="show"
        className="sticky top-0 z-[90] w-full px-0 pt-0"
      >
        <motion.div
          variants={staggerWrap}
          initial="hidden"
          animate="show"
          className="relative w-full pointer-events-auto"
        >
          {/* Rail full-width principal */}
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 240, damping: 28 }}
            className={[
              'relative w-full overflow-hidden',
              'border-b',
              isCompact ? 'py-2.5' : 'py-3.5'
            ].join(' ')}
            style={{
              background: isCompact
                ? 'linear-gradient(180deg, rgba(6,18,33,0.78), rgba(7,20,36,0.68))'
                : 'linear-gradient(180deg, rgba(6,18,33,0.64), rgba(7,20,36,0.56))',
              borderColor: isCompact
                ? 'rgba(255,255,255,0.10)'
                : 'rgba(255,255,255,0.08)',
              boxShadow: isCompact
                ? '0 18px 42px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.03)'
                : '0 14px 34px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.02)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)'
            }}
          >
            {/* brillo superior */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-14"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.065), rgba(255,255,255,0))'
              }}
            />

            {/* shimmer horizontal sutil */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -left-1/4 top-0 h-full w-1/4"
              style={{
                background:
                  'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.06), rgba(255,255,255,0))',
                filter: 'blur(10px)'
              }}
              animate={{ x: ['0%', '500%'] }}
              transition={{
                duration: 8.5,
                ease: 'linear',
                repeat: Infinity,
                repeatDelay: 2.2
              }}
            />

            {/* línea inferior tipo corriente (full width) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] overflow-hidden"
              style={{
                background:
                  'linear-gradient(90deg, rgba(121,196,234,0.04), rgba(121,196,234,0.10), rgba(121,196,234,0.04))'
              }}
            >
              <motion.div
                className="absolute left-[-20%] top-0 h-full w-[30%]"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(255,255,255,0), rgba(167,223,247,0.95), rgba(255,255,255,0))',
                  boxShadow: '0 0 14px rgba(121,196,234,0.28)'
                }}
                animate={{ x: ['0%', '420%'] }}
                transition={{
                  duration: 4.8,
                  ease: 'linear',
                  repeat: Infinity
                }}
              />
            </div>

            <div className="relative grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 px-3 sm:px-4 lg:px-6 xl:px-8">
              {/* LEFT: BRAND */}
              <motion.div
                variants={childVariants}
                className="min-w-0 flex items-center gap-3"
              >
                <motion.button
                  type="button"
                  onClick={() => goToSection('inicio')}
                  whileHover={{ scale: 1.02, rotate: -1 }}
                  whileTap={{ scale: 0.985 }}
                  className="relative shrink-0 rounded-2xl focus:outline-none"
                  aria-label="Ir a inicio"
                >
                  <div className="absolute inset-0 rounded-2xl bg-white/15 blur-lg" />
                  <div
                    className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-2xl p-[2px]"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.06))',
                      border: '1px solid rgba(255,255,255,0.10)',
                      boxShadow:
                        '0 10px 26px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.05)'
                    }}
                  >
                    <img
                      src={logoImg}
                      alt={`${siteConfig.brand.name} logo`}
                      className="h-full w-full rounded-[14px] object-cover"
                      loading="eager"
                    />
                  </div>
                </motion.button>

                <div className="min-w-0">
                  <button
                    type="button"
                    onClick={() => goToSection('inicio')}
                    className={[
                      'truncate text-left uppercase font-semibold text-white',
                      isCompact
                        ? 'text-[0.86rem] tracking-[0.12em]'
                        : 'text-[0.92rem] sm:text-[1rem] tracking-[0.14em]'
                    ].join(' ')}
                    style={{
                      textShadow: '0 0 14px rgba(121,196,234,0.18)'
                    }}
                    aria-label={siteConfig.brand.name}
                  >
                    {siteConfig.brand.name}
                  </button>

                  <motion.div
                    animate={{
                      opacity: isCompact ? 0.72 : 0.9,
                      y: isCompact ? -1 : 0
                    }}
                    transition={{ duration: 0.22 }}
                    className="mt-0.5 flex items-center gap-1.5 text-[11px] sm:text-xs text-white/75 truncate"
                  >
                    <FaMapMarkerAlt className="shrink-0 text-[10px] text-white/70" />
                    <span className="truncate">
                      {siteConfig.brand.locationLabel}
                    </span>
                  </motion.div>
                </div>
              </motion.div>

              {/* CENTER: DESKTOP NAV CAPSULE */}
              <motion.div
                variants={childVariants}
                className="hidden lg:flex items-center justify-center"
              >
                <div
                  className="relative flex items-center gap-1 rounded-full px-2 py-1.5"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
                    border: '1px solid rgba(255,255,255,0.10)',
                    boxShadow:
                      'inset 0 1px 0 rgba(255,255,255,0.04), 0 12px 28px rgba(0,0,0,0.16)'
                  }}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  {sections.map((section) => {
                    const isActive = activeSection === section;
                    const isHovered = hoveredSection === section;

                    return (
                      <div key={section} className="relative">
                        {isActive && (
                          <motion.div
                            layoutId="river-nav-active-pill"
                            className="absolute inset-0 rounded-full"
                            transition={{
                              type: 'spring',
                              stiffness: 360,
                              damping: 30
                            }}
                            style={{
                              background:
                                'linear-gradient(180deg, rgba(121,196,234,0.20), rgba(84,164,206,0.10))',
                              border: '1px solid rgba(121,196,234,0.18)',
                              boxShadow:
                                '0 10px 22px rgba(3,12,22,0.22), inset 0 1px 0 rgba(255,255,255,0.05)'
                            }}
                          />
                        )}

                        <AnimatePresence>
                          {isHovered && !isActive && (
                            <motion.div
                              initial={{ opacity: 0, scaleX: 0.35, y: 2 }}
                              animate={{ opacity: 1, scaleX: 1, y: 0 }}
                              exit={{ opacity: 0, scaleX: 0.35, y: 2 }}
                              transition={{ duration: 0.18 }}
                              className="pointer-events-none absolute left-3 right-3 bottom-[6px] h-[2px] rounded-full"
                              style={{
                                background:
                                  'linear-gradient(90deg, rgba(255,255,255,0), rgba(121,196,234,0.9), rgba(255,255,255,0))',
                                boxShadow: '0 0 12px rgba(121,196,234,0.20)'
                              }}
                            />
                          )}
                        </AnimatePresence>

                        <motion.button
                          type="button"
                          onClick={() => goToSection(section)}
                          onMouseEnter={() => setHoveredSection(section)}
                          whileHover={{ y: -1 }}
                          whileTap={{ scale: 0.985 }}
                          className="relative z-[1] rounded-full px-3.5 xl:px-4 py-2"
                          style={{
                            color: isActive
                              ? 'rgba(255,255,255,0.98)'
                              : 'rgba(255,255,255,0.80)'
                          }}
                        >
                          <span className="text-[11px] xl:text-[11.5px] font-semibold tracking-[0.16em] uppercase">
                            {toLabel(section)}
                          </span>
                        </motion.button>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* RIGHT: CTA + SOCIAL DOCK */}
              <motion.div
                variants={childVariants}
                className="min-w-0 flex items-center justify-end gap-2 sm:gap-3"
              >
                {/* Desktop dock */}
                <div className="hidden sm:flex flex-col items-end min-w-0">
                  <motion.a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -1, scale: 1.01 }}
                    whileTap={{ scale: 0.985 }}
                    className="group relative inline-flex items-center gap-2 rounded-full px-3.5 py-2.5 text-white"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(29,185,84,0.95), rgba(37,211,102,0.95))',
                      border: '1px solid rgba(255,255,255,0.16)',
                      boxShadow:
                        '0 12px 26px rgba(29,185,84,0.22), inset 0 1px 0 rgba(255,255,255,0.18)'
                    }}
                    aria-label="Escribinos por WhatsApp"
                  >
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full"
                      animate={{ opacity: [0.12, 0.2, 0.12] }}
                      transition={{ duration: 2.8, repeat: Infinity }}
                      style={{
                        boxShadow: '0 0 0 0 rgba(37,211,102,0.28)'
                      }}
                    />
                    <FaWhatsapp className="text-[15px]" />
                    <span className="text-sm font-semibold tracking-[0.08em] uppercase">
                      WhatsApp
                    </span>
                    <motion.span
                      className="hidden xl:inline text-[11px] text-white/90"
                      animate={{ x: [0, 1, 0] }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        repeatDelay: 2.6
                      }}
                    >
                      {siteConfig?.contact?.phoneDisplay || ''}
                    </motion.span>
                  </motion.a>

                  {/* Social dock pequeño */}
                  {socialItems.length > 0 && (
                    <div className="mt-1.5 flex items-center gap-1.5">
                      {socialItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <motion.a
                            key={item.key}
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ y: -1, scale: 1.03 }}
                            whileTap={{ scale: 0.96 }}
                            className="group relative inline-flex h-7 w-7 items-center justify-center rounded-full text-white/75 hover:text-white"
                            style={{
                              background: 'rgba(255,255,255,0.035)',
                              border: '1px solid rgba(255,255,255,0.08)',
                              boxShadow:
                                'inset 0 1px 0 rgba(255,255,255,0.02), 0 6px 12px rgba(0,0,0,0.12)'
                            }}
                            aria-label={`${item.label} ${item.handle}`}
                            title={`${item.label}${item.handle ? ` · ${item.handle}` : ''}`}
                          >
                            <Icon className="text-[11px]" />

                            <span
                              className="pointer-events-none absolute top-full mt-1 hidden whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] text-white/90 group-hover:block"
                              style={{
                                background: 'rgba(8,23,41,0.92)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.18)'
                              }}
                            >
                              {item.label}
                            </span>
                          </motion.a>
                        );
                      })}

                      <span className="ml-1 text-[10px] text-white/55 hidden xl:inline">
                        {socials?.instagram?.handle ||
                          socials?.facebook?.handle ||
                          ''}
                      </span>
                    </div>
                  )}
                </div>

                {/* Mobile WhatsApp quick */}
                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  whileTap={{ scale: 0.95 }}
                  className="ml-48 sm:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-white"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(29,185,84,0.95), rgba(37,211,102,0.95))',
                    border: '1px solid rgba(255,255,255,0.14)',
                    boxShadow: '0 10px 18px rgba(29,185,84,0.20)'
                  }}
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="text-base" />
                </motion.a>

                {/* Mobile menu button */}
                <motion.button
                  type="button"
                  onClick={() => setMobileOpen((v) => !v)}
                  whileTap={{ scale: 0.96 }}
                  className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-white"
                  style={{
                    background: 'rgba(255,255,255,0.045)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    boxShadow:
                      'inset 0 1px 0 rgba(255,255,255,0.03), 0 8px 16px rgba(0,0,0,0.14)'
                  }}
                  aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
                  aria-expanded={mobileOpen}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {mobileOpen ? (
                      <motion.span
                        key="close"
                        initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.18 }}
                      >
                        <FaTimes />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="menu"
                        initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.18 }}
                      >
                        <FaBars />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.header>

      {/* MOBILE PANEL */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              key="nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[85] cursor-default"
              aria-label="Cerrar menú"
              onClick={() => setMobileOpen(false)}
              style={{
                background: 'rgba(2, 8, 16, 0.36)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)'
              }}
            />

            <motion.div
              key="nav-panel"
              initial={{ opacity: 0, y: -10, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.985 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-3 right-3 top-[78px] z-[95] sm:left-4 sm:right-4"
            >
              <div
                className="relative overflow-hidden rounded-3xl p-3"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(7,20,36,0.88), rgba(7,20,36,0.82))',
                  border: '1px solid rgba(255,255,255,0.10)',
                  boxShadow:
                    '0 24px 60px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)'
                }}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-14"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0))'
                  }}
                />

                <div className="relative space-y-2">
                  {sections.map((section, idx) => {
                    const isActive = activeSection === section;

                    return (
                      <motion.button
                        key={section}
                        type="button"
                        onClick={() => goToSection(section)}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        whileTap={{ scale: 0.985 }}
                        className="w-full rounded-2xl px-4 py-3 text-left"
                        style={{
                          background: isActive
                            ? 'linear-gradient(180deg, rgba(121,196,234,0.16), rgba(84,164,206,0.08))'
                            : 'rgba(255,255,255,0.025)',
                          border: isActive
                            ? '1px solid rgba(121,196,234,0.18)'
                            : '1px solid rgba(255,255,255,0.05)',
                          boxShadow: isActive
                            ? 'inset 0 1px 0 rgba(255,255,255,0.05)'
                            : 'none'
                        }}
                      >
                        <span
                          className="text-sm font-semibold tracking-[0.16em] uppercase"
                          style={{
                            color: isActive
                              ? 'rgba(255,255,255,0.98)'
                              : 'rgba(255,255,255,0.82)'
                          }}
                        >
                          {toLabel(section)}
                        </span>
                      </motion.button>
                    );
                  })}

                  <div className="pt-2 space-y-2">
                    <motion.a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      whileTap={{ scale: 0.985 }}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-white font-semibold"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(29,185,84,0.95), rgba(37,211,102,0.95))',
                        border: '1px solid rgba(255,255,255,0.14)',
                        boxShadow: '0 12px 24px rgba(29,185,84,0.18)'
                      }}
                    >
                      <FaWhatsapp />
                      <span className="uppercase tracking-[0.08em]">
                        Escribinos por WhatsApp
                      </span>
                    </motion.a>

                    {socialItems.length > 0 && (
                      <div
                        className="rounded-2xl px-3 py-2.5"
                        style={{
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid rgba(255,255,255,0.05)'
                        }}
                      >
                        <div className="text-[10px] uppercase tracking-[0.16em] text-white/55 mb-2">
                          Redes
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                          {socialItems.map((item) => {
                            const Icon = item.icon;
                            return (
                              <motion.a
                                key={item.key}
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-white/85"
                                style={{
                                  background: 'rgba(255,255,255,0.035)',
                                  border: '1px solid rgba(255,255,255,0.08)'
                                }}
                                aria-label={`${item.label} ${item.handle}`}
                              >
                                <Icon className="text-[12px]" />
                                <span className="text-[11px]">
                                  {item.label}
                                </span>
                                {item.handle ? (
                                  <>
                                    <span className="text-white/35">·</span>
                                    <span className="text-[11px] text-white/65">
                                      {item.handle}
                                    </span>
                                  </>
                                ) : null}
                              </motion.a>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
