import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaFish, FaWhatsapp } from 'react-icons/fa';
import { siteConfig } from '../../config/siteConfig';

/*
 * Benjamin Orellana - 2026-03-08 - Sección visual de carnadas para Río de Pesca.
 * Mantiene la línea estética del sitio con cards modernas, fondo oscuro y CTA a WhatsApp.
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

const carnadas = [
  {
    id: 1,
    nombre: 'Lombriz',
    descripcion: 'Clásica, rendidora y muy buscada para distintas salidas.',
    imagen:
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80',
    tipo: 'Natural'
  },
  {
    id: 2,
    nombre: 'Mojarra',
    descripcion:
      'Ideal para pesca variada y jornadas donde necesitás carnada confiable.',
    imagen:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    tipo: 'Natural'
  },
  {
    id: 3,
    nombre: 'Masa preparada',
    descripcion:
      'Práctica y lista para usar, excelente para llevar y resolver rápido.',
    imagen:
      'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=80',
    tipo: 'Preparada'
  },
  {
    id: 4,
    nombre: 'Maíz',
    descripcion:
      'Una opción simple y efectiva para determinadas especies y contextos.',
    imagen:
      'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=1200&q=80',
    tipo: 'Clásica'
  }
];

export default function CarnadasSection() {
  const whatsappUrl =
    siteConfig?.social?.whatsapp?.url ||
    `https://wa.me/${siteConfig?.contact?.phoneRaw || ''}`;

  return (
    <section
      id="carnadas"
      className="relative py-14 sm:py-16 lg:py-20 overflow-hidden"
      aria-label="Carnadas"
    >
      {/* Glow de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(680px 260px at 12% 10%, rgba(121,196,234,0.10), transparent 60%),
            radial-gradient(540px 260px at 88% 18%, rgba(84,164,206,0.10), transparent 58%),
            radial-gradient(440px 220px at 50% 100%, rgba(255,255,255,0.04), transparent 65%)
          `
        }}
      />

      <div className="rp-container relative z-10">
        {/* Header */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-3xl"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs sm:text-sm text-white/90"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
              border: '1px solid rgba(255,255,255,0.10)',
              boxShadow:
                '0 10px 24px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.03)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
            }}
          >
            <FaFish className="text-[11px] text-cyan-200" />
            <span className="tracking-[0.14em] uppercase font-semibold">
              Carnadas
            </span>
          </div>

          <h2 className="font-bignoodle mt-4 text-white text-[2.2rem] sm:text-[2.8rem] lg:text-[3.5rem] leading-[1.02] tracking-[-0.03em]">
            Opciones de{' '}
            <span
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,1), rgba(167,223,247,0.92), rgba(121,196,234,0.92))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              carnadas
            </span>{' '}
            para cada salida
          </h2>

          <p className="font-messina mt-4 max-w-[62ch] text-sm sm:text-base lg:text-lg leading-relaxed text-white/78">
            Encontrá opciones prácticas, rendidoras y listas para acompañarte en
            cada jornada. Consultanos por disponibilidad y te ayudamos a elegir
            según el tipo de pesca que vas a hacer.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {carnadas.map((item, idx) => (
            <motion.article
              key={item.id}
              custom={idx + 1}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.18 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="group relative overflow-hidden rounded-[26px]"
              style={{
                background:
                  'linear-gradient(180deg, rgba(8,23,41,0.70), rgba(8,23,41,0.46))',
                border: '1px solid rgba(255,255,255,0.10)',
                boxShadow:
                  '0 22px 44px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.03)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)'
              }}
            >
              {/* Imagen */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(5,12,20,0.06) 0%, rgba(5,12,20,0.14) 35%, rgba(5,12,20,0.74) 100%)'
                  }}
                />

                <div className="absolute left-3 top-3">
                  <span
                    className="inline-flex rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-white/90"
                    style={{
                      background: 'rgba(8,23,41,0.48)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)'
                    }}
                  >
                    {item.tipo}
                  </span>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-white text-lg sm:text-xl font-semibold tracking-[0.01em]">
                      {item.nombre}
                    </h3>
                    <p className="mt-2 text-white/70 text-sm leading-relaxed">
                      {item.descripcion}
                    </p>
                  </div>

                  <div
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-white/90"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(121,196,234,0.18), rgba(84,164,206,0.08))',
                      border: '1px solid rgba(121,196,234,0.18)'
                    }}
                  >
                    <FaFish className="text-sm" />
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-white/50">
                    Consultar stock
                  </span>

                  <motion.a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ x: 1 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-white"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(29,185,84,0.94), rgba(37,211,102,0.94))',
                      border: '1px solid rgba(255,255,255,0.14)',
                      boxShadow:
                        '0 10px 22px rgba(29,185,84,0.18), inset 0 1px 0 rgba(255,255,255,0.16)'
                    }}
                  >
                    <FaWhatsapp className="text-[13px]" />
                    <span className="text-xs font-semibold tracking-[0.08em] uppercase">
                      Pedir
                    </span>
                    <FaArrowRight className="text-[10px]" />
                  </motion.a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
