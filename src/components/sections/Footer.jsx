import React from 'react';
import { motion } from 'framer-motion';
import {
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTiktok,
  FaWhatsapp
} from 'react-icons/fa';
import { siteConfig } from '../../config/siteConfig';
import logoImg from '../../assets/logos/logo.jpeg';

/*
 * Benjamin Orellana - 2026-02-22 - Footer moderno para Río de Pesca con CTA de WhatsApp, redes, navegación por secciones y cierre visual tipo río.
 */

const footerAnim = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.06,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

function scrollToSection(sectionId) {
  if (!sectionId) return;
  const el = document.getElementById(sectionId);

  if (el) {
    const navOffset = 102;
    const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top, behavior: 'smooth' });
    return;
  }

  window.location.hash = sectionId;
}

export default function Footer() {
  const year = new Date().getFullYear();

  const sections = siteConfig?.sections || [];
  const brand = siteConfig?.brand || {};
  const social = siteConfig?.social || {};
  const contact = siteConfig?.contact || {};

  const socialItems = [
    {
      key: 'instagram',
      icon: FaInstagram,
      label: social?.instagram?.label || 'Instagram',
      handle: social?.instagram?.handle || '',
      url: social?.instagram?.url || ''
    },
    {
      key: 'facebook',
      icon: FaFacebookF,
      label: social?.facebook?.label || 'Facebook',
      handle: social?.facebook?.handle || '',
      url: social?.facebook?.url || ''
    },
    {
      key: 'tiktok',
      icon: FaTiktok,
      label: social?.tiktok?.label || 'TikTok',
      handle: social?.tiktok?.handle || '',
      url: social?.tiktok?.url || ''
    }
  ].filter((x) => !!x.url);

  const whatsappUrl =
    social?.whatsapp?.url || `https://wa.me/${contact?.phoneRaw || ''}`;

  const waText = encodeURIComponent(
    contact?.whatsappMessage ||
      'Hola Río de Pesca, quisiera consultar por productos de pesca/camping.'
  );

  const finalWhatsappUrl = whatsappUrl.includes('?')
    ? `${whatsappUrl}&text=${waText}`
    : `${whatsappUrl}?text=${waText}`;

  return (
    <footer className="relative mt-10 sm:mt-14 lg:mt-16" aria-label="Footer">
      {/* Separador superior con glow */}
      <div className="rp-container">
        <div className="relative h-px w-full bg-white/10">
          <div className="absolute inset-x-0 -top-px h-[2px] bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent" />
        </div>
      </div>

      <div className="rp-container relative pt-6 sm:pt-8 pb-6 sm:pb-8">
        {/* Fondo principal */}
        <div
          className="relative overflow-hidden rounded-[28px] p-4 sm:p-5 lg:p-6 xl:p-7"
          style={{
            background:
              'linear-gradient(180deg, rgba(7,20,36,0.84), rgba(6,17,30,0.92))',
            border: '1px solid rgba(255,255,255,0.10)',
            boxShadow:
              '0 24px 60px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.03)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)'
          }}
        >
          {/* Glows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: `
                radial-gradient(520px 180px at 8% 0%, rgba(121,196,234,0.10), transparent 65%),
                radial-gradient(420px 180px at 95% 10%, rgba(167,223,247,0.08), transparent 60%),
                radial-gradient(500px 160px at 50% 100%, rgba(84,164,206,0.06), transparent 70%)
              `
            }}
          />

          {/* Contenido */}
          <div className="relative grid grid-cols-1 xl:grid-cols-[1.2fr_0.9fr_0.9fr] gap-4 sm:gap-5 lg:gap-6">
            {/* Columna marca / CTA */}
            <motion.div
              custom={0}
              variants={footerAnim}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-2xl p-4 sm:p-5"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
                border: '1px solid rgba(255,255,255,0.07)'
              }}
            >
              <div className="flex items-start gap-3">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 rounded-2xl bg-cyan-200/10 blur-md" />
                  <div
                    className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-2xl p-[2px]"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0.04))',
                      border: '1px solid rgba(255,255,255,0.08)'
                    }}
                  >
                    <img
                      src={logoImg}
                      alt={brand?.name || 'Río de Pesca'}
                      className="h-full w-full rounded-[14px] object-cover"
                    />
                  </div>
                </div>

                <div className="min-w-0">
                  <h3 className="text-white text-lg sm:text-xl font-extrabold tracking-[-0.02em]">
                    {brand?.name || 'Río de Pesca'}
                  </h3>
                  <p className="mt-1 text-white/72 text-sm sm:text-base leading-relaxed">
                    {brand?.tagline || 'Artículos de pesca y camping'}
                  </p>

                  <div className="mt-2 inline-flex items-center gap-2 text-white/78 text-sm">
                    <FaMapMarkerAlt className="text-[12px] text-white/65" />
                    <span>{brand?.locationLabel || 'Río Seco - Tucumán'}</span>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-white/70 text-sm leading-relaxed">
                Te asesoramos para elegir productos de pesca y camping según tu
                salida, experiencia y presupuesto.
              </p>

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <motion.a
                  href={finalWhatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -1, scale: 1.01 }}
                  whileTap={{ scale: 0.985 }}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-white font-semibold"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(29,185,84,0.96), rgba(37,211,102,0.96))',
                    border: '1px solid rgba(255,255,255,0.18)',
                    boxShadow:
                      '0 12px 24px rgba(29,185,84,0.18), inset 0 1px 0 rgba(255,255,255,0.15)'
                  }}
                >
                  <FaWhatsapp />
                  <span className="uppercase tracking-[0.08em] text-sm">
                    WhatsApp
                  </span>
                </motion.a>

                <motion.button
                  type="button"
                  onClick={() => scrollToSection('productos')}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.985 }}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-white/92 font-semibold"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.03))',
                    border: '1px solid rgba(255,255,255,0.10)'
                  }}
                >
                  <span className="uppercase tracking-[0.08em] text-sm">
                    Ver productos
                  </span>
                </motion.button>
              </div>
            </motion.div>

            {/* Navegación */}
            <motion.div
              custom={1}
              variants={footerAnim}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-2xl p-4 sm:p-5"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.018))',
                border: '1px solid rgba(255,255,255,0.07)'
              }}
            >
              <div className="text-white font-semibold uppercase tracking-[0.12em] text-xs sm:text-sm">
                Navegación
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                {sections.map((section) => (
                  <motion.button
                    key={section}
                    type="button"
                    onClick={() => scrollToSection(section)}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.985 }}
                    className="group text-left rounded-xl px-3 py-2.5 text-white/82 hover:text-white"
                    style={{
                      background: 'rgba(255,255,255,0.025)',
                      border: '1px solid rgba(255,255,255,0.06)'
                    }}
                  >
                    <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.10em] font-semibold">
                      {section}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Contacto + redes */}
            <motion.div
              custom={2}
              variants={footerAnim}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-2xl p-4 sm:p-5"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.018))',
                border: '1px solid rgba(255,255,255,0.07)'
              }}
            >
              <div className="text-white font-semibold uppercase tracking-[0.12em] text-xs sm:text-sm">
                Contacto y redes
              </div>

              <div className="mt-3 space-y-2.5">
                <a
                  href={finalWhatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-white/85 hover:text-white"
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.06)'
                  }}
                >
                  <FaPhoneAlt className="text-[12px] text-white/70" />
                  <span className="text-sm">
                    {contact?.phoneDisplay || '381-5670618'}
                  </span>
                </a>

                <div
                  className="rounded-xl px-3 py-3"
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.06)'
                  }}
                >
                  <div className="text-white/62 text-[11px] uppercase tracking-[0.10em] font-semibold">
                    Seguinos
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2">
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
                          className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-white/86 hover:text-white"
                          style={{
                            background:
                              'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.03))',
                            border: '1px solid rgba(255,255,255,0.08)'
                          }}
                          title={`${item.label}${item.handle ? ` · ${item.handle}` : ''}`}
                          aria-label={`${item.label} ${item.handle}`}
                        >
                          <Icon className="text-[12px]" />
                          <span className="text-xs font-semibold">
                            {item.handle || item.label}
                          </span>
                        </motion.a>
                      );
                    })}
                  </div>
                </div>

                <div
                  className="rounded-xl px-3 py-3 text-white/72 text-sm"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}
                >
                  <div className="font-semibold text-white/88">
                    Río Seco - Tucumán
                  </div>
                  <div className="mt-1 text-xs sm:text-sm leading-relaxed">
                    Argentina · Atención personalizada por WhatsApp y redes.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Línea inferior */}
          <motion.div
            custom={3}
            variants={footerAnim}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-white/8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs sm:text-sm text-white/62">
              <div>
                © {year} {brand?.name || 'Río de Pesca'}. Todos los derechos
                reservados.
              </div>

              <div className="flex items-center gap-2 sm:gap-3 text-white/55">
                <span>Diseño moderno</span>
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <span>Pesca + Camping</span>
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <span>Tucumán</span>
              </div>
            </div>
          </motion.div>

          {/* Rio calmado (ondas) */}
          <div className="pointer-events-none absolute inset-x-4 sm:inset-x-6 bottom-3 h-12 opacity-60">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-x-0 rounded-full"
                style={{
                  height: 10 + i * 4,
                  bottom: i * 2,
                  border: '1px solid rgba(167,223,247,0.10)'
                }}
                animate={{
                  x: [0, 8 + i * 2, 0],
                  opacity: [0.16, 0.32, 0.16]
                }}
                transition={{
                  duration: 5 + i * 1.1,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
