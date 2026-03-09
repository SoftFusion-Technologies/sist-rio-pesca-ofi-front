import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FaGift,
  FaUsers,
  FaTruck,
  FaWhatsapp,
  FaArrowRight
} from 'react-icons/fa';

// Benjamin Orellana - 2026-02-22 - Imagen de referencia como fondo del teaser
import promoSorteosImg from '../../assets/sorteos/sorteos-referencia.jpg';

/*
 * Benjamin Orellana - 2026-02-22 - Teaser/CTA de sorteos para Home (entre Hero y Productos)
 * Imagen como background + overlay para legibilidad + CTA al grupo y link a /sorteos
 */

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: i * 0.06, duration: 0.42, ease: [0.22, 1, 0.36, 1] }
  })
};

const GROUP_URL = 'https://chat.whatsapp.com/Bt01EgPaGdC6iIgGC2C61N';

export default function SorteosTeaserSection() {
  const navigate = useNavigate();

  return (
    <section id="sorteos" className="relative py-8 sm:py-10 lg:py-12">
      <div className="rp-container">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative overflow-hidden rounded-[28px]"
          style={{
            // Imagen como fondo + overlay directo en background para que no “flicker” y quede uniforme
            backgroundImage: `
              linear-gradient(180deg, rgba(6,18,33,0.40) 0%, rgba(6,18,33,0.70) 45%, rgba(6,17,30,0.92) 100%),
              url(${promoSorteosImg})
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '1px solid rgba(255,255,255,0.10)',
            boxShadow:
              '0 22px 52px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.03)'
          }}
        >
          {/* Glows suaves por encima del bg */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: `
                radial-gradient(520px 200px at 8% 0%, rgba(121,196,234,0.12), transparent 65%),
                radial-gradient(420px 180px at 95% 10%, rgba(84,164,206,0.10), transparent 62%),
                radial-gradient(520px 180px at 50% 100%, rgba(224,160,32,0.07), transparent 70%)
              `
            }}
          />

          {/* Contenido */}
          <div className="relative p-4 sm:p-6 lg:p-7">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-4 sm:gap-5 items-stretch">
              {/* Bloque principal (glass) */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                custom={0}
                className="relative overflow-hidden rounded-3xl p-4 sm:p-5 lg:p-6"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(8,24,42,0.72), rgba(7,20,36,0.62))',
                  border: '1px solid rgba(255,255,255,0.10)',
                  boxShadow:
                    '0 18px 44px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)'
                }}
              >
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={1}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs sm:text-sm text-white/92"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(121,196,234,0.16), rgba(84,164,206,0.08))',
                    border: '1px solid rgba(121,196,234,0.18)'
                  }}
                >
                  <FaGift className="text-[12px]" />
                  <span className="font-semibold uppercase tracking-[0.12em]">
                    Sorteos semanales
                  </span>
                </motion.div>

                <motion.h3
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={2}
                  className="mt-3 font-bignoodle text-white font-extrabold tracking-[-0.02em] text-[1.55rem] sm:text-[1.9rem] lg:text-[2.15rem] leading-[1.05]"
                >
                  Sumate al grupo y participá por premios de pesca y camping
                </motion.h3>

                <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={3}
                  className="mt-3 text-white/78 text-sm sm:text-base leading-relaxed max-w-[68ch]"
                >
                  Todas las semanas realizamos sorteos. Enterate primero, seguí
                  las bases y participá desde el grupo de WhatsApp. Si ganás,
                  coordinamos entrega o envío.
                </motion.p>

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={4}
                  className="mt-4 flex flex-wrap gap-2"
                >
                  <Pill icon={FaUsers} text="Grupo activo" />
                  <Pill icon={FaGift} text="Premios semanales" />
                  <Pill icon={FaTruck} text="Envíos a todo el país" />
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={5}
                  className="mt-5 flex flex-col sm:flex-row gap-3"
                >
                  <motion.a
                    href={GROUP_URL}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -1, scale: 1.01 }}
                    whileTap={{ scale: 0.985 }}
                    className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-white font-semibold"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(29,185,84,0.96), rgba(37,211,102,0.96))',
                      border: '1px solid rgba(255,255,255,0.18)',
                      boxShadow:
                        '0 14px 28px rgba(29,185,84,0.18), inset 0 1px 0 rgba(255,255,255,0.14)'
                    }}
                  >
                    <FaWhatsapp />
                    <span className="uppercase tracking-[0.08em] text-sm">
                      Sumarte al grupo
                    </span>
                  </motion.a>

                  <motion.button
                    type="button"
                    onClick={() => navigate('/sorteos')}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.985 }}
                    className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-white/92 font-semibold"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))',
                      border: '1px solid rgba(255,255,255,0.10)'
                    }}
                  >
                    <span className="uppercase tracking-[0.08em] text-sm">
                      Ver detalles
                    </span>
                    <FaArrowRight className="text-xs" />
                  </motion.button>
                </motion.div>
              </motion.div>

              {/* Panel  “derecha grande”) */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                custom={2}
                className="relative overflow-hidden rounded-3xl p-4 sm:p-5"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(8,24,42,0.66), rgba(7,20,36,0.58))',
                  border: '1px solid rgba(255,255,255,0.10)',
                  boxShadow:
                    '0 16px 40px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)'
                }}
              >
                <div className="text-white font-extrabold tracking-[-0.02em] text-lg sm:text-xl">
                  ¿Qué se sortea?
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <MiniCard title="Pesca" text="Cañas, reels, kits" />
                  <MiniCard title="Camping" text="Conservadoras, luces" />
                  <MiniCard title="Accesorios" text="Señuelos y más" />
                  <MiniCard title="Sorpresas" text="Premios especiales" />
                </div>

                <div className="mt-4 rounded-2xl p-3 border border-white/10 bg-white/5">
                  <div className="text-white font-semibold">
                    Sorteos todas las semanas
                  </div>
                  <div className="mt-1 text-white/70 text-sm leading-relaxed">
                    Sumate al grupo para ver bases y novedades.
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Pill({ icon: Icon, text }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-white/85 text-xs sm:text-sm"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.09)'
      }}
    >
      <Icon className="text-[12px] text-cyan-200/90" />
      <span>{text}</span>
    </span>
  );
}

function MiniCard({ title, text }) {
  return (
    <div className="rounded-2xl p-3 border border-white/10 bg-white/5">
      <div className="text-white font-semibold">{title}</div>
      <div className="mt-0.5 text-white/70 text-sm">{text}</div>
    </div>
  );
}
