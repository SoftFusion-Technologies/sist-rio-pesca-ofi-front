import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FaArrowRight,
  FaCampground,
  FaFacebookF,
  FaFish,
  FaInstagram,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaTiktok,
  FaWhatsapp
} from 'react-icons/fa';

import { siteConfig } from '../../config/siteConfig';
import logoImg from '../../assets/logos/logo.jpeg';

/*
 * Benjamin Orellana - 2026-02-22 - Hero principal de Río de Pesca orientado a conversión (WhatsApp), confianza (tienda física) y descubrimiento de categorías.
 */

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.07,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

const quickCards = [
  {
    id: 'productos',
    title: 'Productos',
    desc: 'Cañas, reels, líneas y accesorios',
    icon: FaFish
  },
  {
    id: 'carnadas',
    title: 'Carnadas',
    desc: 'Opciones para distintas salidas',
    icon: FaFish
  },
  {
    id: 'tips',
    title: 'Tips',
    desc: 'Recomendaciones y consejos útiles',
    icon: FaShieldAlt
  },
  {
    id: 'ubicacion',
    title: 'Ubicación',
    desc: 'Encontranos en Río Seco, Tucumán',
    icon: FaMapMarkerAlt
  }
];

const trustBadges = [
  'Atención personalizada',
  'Tienda física',
  'Pesca + Camping',
  'Respuesta por WhatsApp'
];

export default function HeroSection() {
  const navigate = useNavigate();
  const location = useLocation();

  const whatsappUrl =
    siteConfig?.social?.whatsapp?.url ||
    `https://wa.me/${siteConfig?.contact?.phoneRaw || ''}`;

  const socialItems = [
    {
      key: 'instagram',
      icon: FaInstagram,
      label: siteConfig?.social?.instagram?.label || 'Instagram',
      handle: siteConfig?.social?.instagram?.handle || '',
      url: siteConfig?.social?.instagram?.url || ''
    },
    {
      key: 'facebook',
      icon: FaFacebookF,
      label: siteConfig?.social?.facebook?.label || 'Facebook',
      handle: siteConfig?.social?.facebook?.handle || '',
      url: siteConfig?.social?.facebook?.url || ''
    },
    {
      key: 'tiktok',
      icon: FaTiktok,
      label: siteConfig?.social?.tiktok?.label || 'TikTok',
      handle: siteConfig?.social?.tiktok?.handle || '',
      url: siteConfig?.social?.tiktok?.url || ''
    }
  ].filter((x) => !!x.url);

  const goToSection = (sectionId) => {
    if (!sectionId) return;

    const hash = `#${sectionId}`;

    // Benjamin Orellana - 2026-02-22 - Navegación por hash sin recarga para mantener animaciones persistentes (navbar/fondo).
    if (location.pathname !== '/') {
      navigate({ pathname: '/', hash });
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      const navOffset = 102;
      const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top, behavior: 'smooth' });
      return;
    }

    navigate({ pathname: '/', hash });
  };

  return (
    <section
      id="inicio"
      className="relative pt-6 sm:pt-8 lg:pt-10 pb-10 sm:pb-12 lg:pb-16"
      aria-label="Inicio"
    >
      <div className="rp-container">
        <div className="grid items-center gap-6 lg:gap-8 xl:gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* LEFT COLUMN */}
          <div className="relative">
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs sm:text-sm"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.05))',
                border: '1px solid rgba(255,255,255,0.10)',
                color: 'rgba(255,255,255,0.92)',
                boxShadow:
                  '0 10px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.04)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)'
              }}
            >
              <span className="inline-flex h-2 w-2 rounded-full bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.35)]" />
              <span className="font-semibold tracking-[0.08em] uppercase">
                {siteConfig.brand.name}
              </span>
              <span className="text-white/50">·</span>
              <span className="text-white/80">{siteConfig.brand.tagline}</span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="font-bignoodle mt-4 sm:mt-5 text-[3rem] leading-[1.04] sm:text-[2.5rem] lg:text-[3.2rem] xl:text-[4.7rem] font-extrabold tracking-[-0.03em] text-white"
              style={{ textShadow: '0 10px 40px rgba(5, 20, 34, 0.18)' }}
            >
              Todo para{' '}
              <span
                className="inline-block"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,1), rgba(167,223,247,0.9) 45%, rgba(121,196,234,0.9))',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent'
                }}
              >
                pesca y camping
              </span>{' '}
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="font-messina mt-4 max-w-[62ch] text-sm sm:text-base lg:text-lg leading-relaxed text-white/82"
            >
              Te ayudamos a elegir cañas, reels, carnadas y accesorios según tu
              salida, experiencia y presupuesto. Atención rápida por WhatsApp y
              asesoramiento real desde nuestra tienda física.
            </motion.p>

            {/* CTA Row */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -1, scale: 1.01 }}
                whileTap={{ scale: 0.985 }}
                className="group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-white font-semibold"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(29,185,84,0.96), rgba(37,211,102,0.96))',
                  border: '1px solid rgba(255,255,255,0.18)',
                  boxShadow:
                    '0 14px 28px rgba(29,185,84,0.20), inset 0 1px 0 rgba(255,255,255,0.18)'
                }}
                aria-label="Consultar por WhatsApp"
              >
                <FaWhatsapp className="text-base" />
                <span className="tracking-[0.06em] uppercase text-sm">
                  Consultar por WhatsApp
                </span>
                <motion.span
                  animate={{ x: [0, 2, 0] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    repeatDelay: 2.2
                  }}
                  className="text-white/90"
                >
                  <FaArrowRight className="text-xs" />
                </motion.span>
              </motion.a>

              <motion.button
                type="button"
                onClick={() => goToSection('productos')}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.985 }}
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-semibold text-white"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))',
                  border: '1px solid rgba(255,255,255,0.12)',
                  boxShadow:
                    '0 12px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)'
                }}
              >
                <span className="tracking-[0.08em] uppercase text-sm">
                  Ver productos
                </span>
              </motion.button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-5 flex flex-wrap gap-2"
            >
              {trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center rounded-full px-3 py-1.5 text-xs sm:text-[13px] text-white/86"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)'
                  }}
                >
                  {badge}
                </span>
              ))}
            </motion.div>

            {/* Social + local proof row */}
            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
            >
              <div className="inline-flex items-center gap-2 text-white/82">
                <FaMapMarkerAlt className="text-[13px] text-white/75" />
                <span className="text-sm">
                  {siteConfig.brand.locationLabel}
                </span>
              </div>

              {socialItems.length > 0 && (
                <div className="flex items-center gap-2">
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
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/85 hover:text-white"
                        style={{
                          background: 'rgba(255,255,255,0.045)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          boxShadow:
                            '0 8px 16px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.02)'
                        }}
                        title={`${item.label}${item.handle ? ` · ${item.handle}` : ''}`}
                        aria-label={`${item.label} ${item.handle}`}
                      >
                        <Icon className="text-sm" />
                      </motion.a>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </div>

          {/* RIGHT COLUMN / VISUAL SELLING PANEL */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="relative"
          >
            <div
              className="relative overflow-hidden rounded-[26px] p-4 sm:p-5 lg:p-6"
              style={{
                background:
                  'linear-gradient(180deg, rgba(8,23,41,0.50), rgba(8,23,41,0.35))',
                border: '1px solid rgba(255,255,255,0.10)',
                boxShadow:
                  '0 26px 60px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.03)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)'
              }}
            >
              {/* luces de fondo */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `
                    radial-gradient(520px 220px at 82% 10%, rgba(121,196,234,0.16), transparent 60%),
                    radial-gradient(420px 220px at 8% 18%, rgba(167,223,247,0.10), transparent 65%),
                    radial-gradient(360px 200px at 50% 100%, rgba(84,164,206,0.08), transparent 70%)
                  `
                }}
              />

              {/* shimmer */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.05), rgba(255,255,255,0))',
                  filter: 'blur(10px)'
                }}
                animate={{ x: ['0%', '310%'] }}
                transition={{
                  duration: 7.5,
                  ease: 'linear',
                  repeat: Infinity,
                  repeatDelay: 2.5
                }}
              />

              {/* Header visual card */}
              <div
                className="relative rounded-2xl p-4 sm:p-5"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.025))',
                  border: '1px solid rgba(255,255,255,0.09)',
                  boxShadow:
                    'inset 0 1px 0 rgba(255,255,255,0.03), 0 14px 28px rgba(0,0,0,0.12)'
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 rounded-2xl bg-white/15 blur-md" />
                    <div
                      className="relative h-14 w-14 rounded-2xl p-[2px]"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0.05))',
                        border: '1px solid rgba(255,255,255,0.08)'
                      }}
                    >
                      <img
                        src={logoImg}
                        alt={siteConfig.brand.name}
                        className="h-full w-full rounded-[14px] object-cover"
                      />
                    </div>
                  </div>

                  <div className="min-w-0">
                    <div className="text-white text-base sm:text-lg font-semibold tracking-[0.02em]">
                      {siteConfig.brand.name}
                    </div>
                    <div className="text-white/76 text-sm mt-0.5">
                      {siteConfig.brand.tagline}
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] text-white/88"
                        style={{
                          background: 'rgba(255,255,255,0.045)',
                          border: '1px solid rgba(255,255,255,0.08)'
                        }}
                      >
                        <FaFish className="text-[10px]" />
                        Pesca
                      </span>
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] text-white/88"
                        style={{
                          background: 'rgba(255,255,255,0.045)',
                          border: '1px solid rgba(255,255,255,0.08)'
                        }}
                      >
                        <FaCampground className="text-[10px]" />
                        Camping
                      </span>
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] text-white/88"
                        style={{
                          background: 'rgba(255,255,255,0.045)',
                          border: '1px solid rgba(255,255,255,0.08)'
                        }}
                      >
                        <FaShieldAlt className="text-[10px]" />
                        Asesoramiento
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick category grid */}
              <div className="relative mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quickCards.map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <motion.button
                      key={card.id}
                      type="button"
                      onClick={() => goToSection(card.id)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.05, duration: 0.35 }}
                      whileHover={{ y: -2, scale: 1.01 }}
                      whileTap={{ scale: 0.985 }}
                      className="group text-left rounded-2xl p-3.5 sm:p-4"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.025))',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow:
                          '0 12px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.02)'
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-white/90"
                          style={{
                            background:
                              'linear-gradient(180deg, rgba(121,196,234,0.18), rgba(84,164,206,0.08))',
                            border: '1px solid rgba(121,196,234,0.18)'
                          }}
                        >
                          <Icon className="text-sm" />
                        </div>

                        <div className="min-w-0">
                          <div className="text-white/96 font-semibold text-sm sm:text-[15px]">
                            {card.title}
                          </div>
                          <div className="mt-0.5 text-white/68 text-xs sm:text-[13px] leading-relaxed">
                            {card.desc}
                          </div>
                        </div>

                        <FaArrowRight className="ml-auto mt-1 text-[11px] text-white/50 group-hover:text-white/85 transition-colors" />
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Bottom trust strip */}
              <div
                className="relative mt-4 rounded-2xl p-3.5"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.02))',
                  border: '1px solid rgba(255,255,255,0.07)'
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3">
                  <div className="text-[11px] uppercase tracking-[0.16em] text-white/58 shrink-0">
                    Atención
                  </div>

                  <div className="h-px sm:h-5 sm:w-px bg-white/10 hidden sm:block" />

                  <div className="text-sm text-white/86 leading-relaxed">
                    Te ayudamos a elegir según tu salida y presupuesto. Consultá
                    por WhatsApp y te respondemos rápido.
                  </div>
                </div>
              </div>

              {/* ondas decorativas sutiles */}
              <div className="pointer-events-none absolute inset-x-4 bottom-3 h-10 opacity-50">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-x-0 rounded-full"
                    style={{
                      height: 10 + i * 5,
                      bottom: i * 2,
                      border: '1px solid rgba(167,223,247,0.12)'
                    }}
                    animate={{ x: [0, 8, 0], opacity: [0.22, 0.38, 0.22] }}
                    transition={{
                      duration: 4 + i * 1.1,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      delay: i * 0.35
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom quick action strip (extra conversión + navegación) */}
        {/* <motion.div
          custom={6}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-6 lg:mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3"
        >
          <QuickActionItem
            title="Ver productos"
            subtitle="Explorá categorías principales"
            onClick={() => goToSection('productos')}
            accent="blue"
          />
          <QuickActionItem
            title="Consultar carnadas"
            subtitle="Opciones según tu salida"
            onClick={() => goToSection('carnadas')}
            accent="cyan"
          />
          <QuickActionItem
            title="Tips y consejos"
            subtitle="Contenido útil para elegir mejor"
            onClick={() => goToSection('tips')}
            accent="ice"
          />
          <QuickActionItem
            title="Cómo llegar"
            subtitle={siteConfig.brand.locationLabel}
            onClick={() => goToSection('ubicacion')}
            accent="soft"
          />
        </motion.div> */}
      </div>
    </section>
  );
}

function QuickActionItem({ title, subtitle, onClick, accent = 'blue' }) {
  const accentMap = {
    blue: {
      bg: 'linear-gradient(180deg, rgba(121,196,234,0.10), rgba(121,196,234,0.04))',
      border: 'rgba(121,196,234,0.16)'
    },
    cyan: {
      bg: 'linear-gradient(180deg, rgba(167,223,247,0.10), rgba(167,223,247,0.04))',
      border: 'rgba(167,223,247,0.16)'
    },
    ice: {
      bg: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
      border: 'rgba(255,255,255,0.12)'
    },
    soft: {
      bg: 'linear-gradient(180deg, rgba(84,164,206,0.08), rgba(255,255,255,0.03))',
      border: 'rgba(84,164,206,0.14)'
    }
  };

  const style = accentMap[accent] || accentMap.blue;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.005 }}
      whileTap={{ scale: 0.985 }}
      className="group text-left rounded-2xl p-4"
      style={{
        background: style.bg,
        border: `1px solid ${style.border}`,
        boxShadow:
          '0 12px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.02)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}
    >
      <div className="flex items-start gap-3">
        <div className="min-w-0">
          <div className="text-white font-semibold text-sm sm:text-[15px]">
            {title}
          </div>
          <div className="mt-1 text-white/66 text-xs sm:text-[13px]">
            {subtitle}
          </div>
        </div>

        <motion.span
          className="ml-auto text-white/55 group-hover:text-white/90"
          animate={{ x: [0, 2, 0] }}
          transition={{ duration: 1.7, repeat: Infinity, repeatDelay: 2.4 }}
        >
          <FaArrowRight className="text-xs mt-1" />
        </motion.span>
      </div>
    </motion.button>
  );
}
