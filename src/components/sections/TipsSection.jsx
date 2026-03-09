import React from 'react';
import { motion } from 'framer-motion';
import {
  FaArrowRight,
  FaCompass,
  FaFish,
  FaMapMarkerAlt,
  FaMoon,
  FaShieldAlt,
  FaWater,
  FaWhatsapp
} from 'react-icons/fa';
import { siteConfig } from '../../config/siteConfig';

/*
 * Benjamin Orellana - 2026-03-08 - Sección de tips de pesca para Río de Pesca.
 * Diseño editorial / mosaico para diferenciarla visualmente de carnadas y productos.
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

const tips = [
  {
    id: 1,
    icon: FaWater,
    eyebrow: 'Condiciones',
    title: 'Observá el agua antes de elegir la carnada',
    desc: 'Color, corriente y profundidad influyen mucho más de lo que parece al momento de definir qué usar.'
  },
  {
    id: 2,
    icon: FaMoon,
    eyebrow: 'Horario',
    title: 'Las primeras horas suelen dar mejores resultados',
    desc: 'Muy temprano o cerca del atardecer suele haber más movimiento y mejor respuesta en muchas especies.'
  },
  {
    id: 3,
    icon: FaCompass,
    eyebrow: 'Equipo',
    title: 'No siempre más peso significa mejor lance',
    desc: 'Elegir la línea, plomada y caña según el entorno puede darte mejor control y menos errores.'
  },
  {
    id: 4,
    icon: FaShieldAlt,
    eyebrow: 'Práctica',
    title: 'Llevá siempre una segunda opción armada',
    desc: 'Tener un armado alternativo te ahorra tiempo y te permite reaccionar rápido si cambia la actividad.'
  }
];

const quickNotes = [
  'Probá distintos niveles de profundidad antes de cambiar todo el equipo.',
  'Consultá qué carnada viene funcionando según la zona y el día.',
  'Revisá nudos, anzuelos y línea antes de salir para evitar perder tiempo.',
  'Si pescás por primera vez en una zona, empezá simple y ajustá sobre la marcha.'
];

export default function TipsSection() {
  const whatsappUrl =
    siteConfig?.social?.whatsapp?.url ||
    `https://wa.me/${siteConfig?.contact?.phoneRaw || ''}`;

  return (
    <section
      id="tips"
      className="relative overflow-hidden py-14 sm:py-16 lg:py-20"
      aria-label="Tips de pesca"
    >
      {/* Fondo sutil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(720px 300px at 10% 14%, rgba(121,196,234,0.10), transparent 60%),
            radial-gradient(560px 260px at 88% 16%, rgba(84,164,206,0.10), transparent 58%),
            radial-gradient(420px 220px at 50% 100%, rgba(255,255,255,0.04), transparent 62%)
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
              Tips y recomendaciones
            </span>
          </div>

          <h2 className="font-bignoodle mt-4 text-white text-[2.2rem] sm:text-[2.8rem] lg:text-[3.5rem] leading-[1.02] tracking-[-0.03em]">
            Consejos para{' '}
            <span
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,1), rgba(167,223,247,0.92), rgba(121,196,234,0.92))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              pescar mejor
            </span>{' '}
            en cada salida
          </h2>

          <p className="font-messina mt-4 max-w-[62ch] text-sm sm:text-base lg:text-lg leading-relaxed text-white/78">
            Te compartimos ideas simples y útiles para elegir mejor, perder
            menos tiempo y disfrutar más cada jornada. Y si querés una
            recomendación puntual, te asesoramos directo por WhatsApp.
          </p>
        </motion.div>

        {/* Layout distinto: editorial + mosaico */}
        <div className="mt-8 sm:mt-10 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Panel destacado */}
          <motion.article
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
            className="relative overflow-hidden rounded-[30px] p-5 sm:p-6 lg:p-7"
            style={{
              background:
                'linear-gradient(180deg, rgba(8,23,41,0.74), rgba(8,23,41,0.48))',
              border: '1px solid rgba(255,255,255,0.10)',
              boxShadow:
                '0 24px 50px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.03)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)'
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background: `
                  radial-gradient(420px 180px at 84% 10%, rgba(121,196,234,0.14), transparent 60%),
                  radial-gradient(280px 180px at 10% 100%, rgba(167,223,247,0.08), transparent 65%)
                `
              }}
            />

            <div className="relative">
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/90"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.10)'
                  }}
                >
                  Consejo principal
                </span>
              </div>

              <h3 className="mt-5 font-bignoodle text-white text-[2rem] sm:text-[2.4rem] lg:text-[2.9rem] leading-[1.02] tracking-[-0.03em]">
                La mejor pesca no siempre depende del equipo,
                <span className="text-cyan-200">
                  {' '}
                  sino de leer bien el lugar.
                </span>
              </h3>

              <p className="mt-4 text-white/78 text-sm sm:text-base lg:text-lg leading-relaxed">
                Antes de cambiar caña, reel o carnada, mirá el entorno. El tipo
                de agua, la hora, el clima y la actividad del lugar muchas veces
                te dicen más que cualquier armado complejo.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div
                  className="rounded-2xl p-4"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))',
                    border: '1px solid rgba(255,255,255,0.08)'
                  }}
                >
                  <div className="flex items-center gap-2 text-white">
                    <FaMapMarkerAlt className="text-cyan-200 text-sm" />
                    <span className="text-sm font-semibold">Zona</span>
                  </div>
                  <p className="mt-2 text-white/70 text-sm leading-relaxed">
                    No es igual pescar en agua quieta que en corriente. Ajustá
                    tu estrategia a ese contexto.
                  </p>
                </div>

                <div
                  className="rounded-2xl p-4"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))',
                    border: '1px solid rgba(255,255,255,0.08)'
                  }}
                >
                  <div className="flex items-center gap-2 text-white">
                    <FaMoon className="text-cyan-200 text-sm" />
                    <span className="text-sm font-semibold">Momento</span>
                  </div>
                  <p className="mt-2 text-white/70 text-sm leading-relaxed">
                    Las primeras y últimas horas del día suelen ser claves para
                    encontrar mejor movimiento.
                  </p>
                </div>
              </div>

              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -1, scale: 1.01 }}
                whileTap={{ scale: 0.985 }}
                className="mt-6 inline-flex items-center gap-2 rounded-full px-4 py-3 text-white font-semibold"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(29,185,84,0.95), rgba(37,211,102,0.95))',
                  border: '1px solid rgba(255,255,255,0.16)',
                  boxShadow:
                    '0 12px 26px rgba(29,185,84,0.22), inset 0 1px 0 rgba(255,255,255,0.18)'
                }}
              >
                <FaWhatsapp className="text-sm" />
                <span className="text-sm tracking-[0.08em] uppercase">
                  Pedir recomendación
                </span>
                <FaArrowRight className="text-[11px]" />
              </motion.a>
            </div>
          </motion.article>

          {/* Mosaico de tips */}
          <div className="grid gap-4 sm:grid-cols-2">
            {tips.map((tip, idx) => {
              const Icon = tip.icon;

              return (
                <motion.article
                  key={tip.id}
                  custom={idx + 2}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.18 }}
                  whileHover={{ y: -4 }}
                  className="group rounded-[26px] p-5"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(8,23,41,0.66), rgba(8,23,41,0.42))',
                    border: '1px solid rgba(255,255,255,0.10)',
                    boxShadow:
                      '0 20px 40px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(14px)',
                    WebkitBackdropFilter: 'blur(14px)'
                  }}
                >
                  <div
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl text-white/90"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(121,196,234,0.18), rgba(84,164,206,0.08))',
                      border: '1px solid rgba(121,196,234,0.18)'
                    }}
                  >
                    <Icon className="text-sm" />
                  </div>

                  <div className="mt-4 text-[11px] uppercase tracking-[0.14em] text-cyan-200/90">
                    {tip.eyebrow}
                  </div>

                  <h3 className="mt-2 text-white text-lg font-semibold leading-snug">
                    {tip.title}
                  </h3>

                  <p className="mt-3 text-white/70 text-sm leading-relaxed">
                    {tip.desc}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Franja inferior distinta */}
        <motion.div
          custom={7}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-6 rounded-[28px] p-5 sm:p-6"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.025))',
            border: '1px solid rgba(255,255,255,0.09)',
            boxShadow:
              '0 18px 36px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.03)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)'
          }}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <div className="text-[11px] uppercase tracking-[0.16em] text-white/55">
                Tips rápidos
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {quickNotes.map((note) => (
                  <div
                    key={note}
                    className="rounded-2xl px-4 py-3 text-sm leading-relaxed text-white/78"
                    style={{
                      background: 'rgba(255,255,255,0.035)',
                      border: '1px solid rgba(255,255,255,0.06)'
                    }}
                  >
                    {note}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-[280px]">
              <div className="text-white text-lg font-semibold">
                ¿No sabés por dónde empezar?
              </div>
              <p className="mt-2 text-white/70 text-sm leading-relaxed">
                Escribinos y te guiamos según tu salida, experiencia y lo que
                querés pescar.
              </p>

              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                whileHover={{ x: 1 }}
                whileTap={{ scale: 0.985 }}
                className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-3 text-white font-semibold"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(29,185,84,0.95), rgba(37,211,102,0.95))',
                  border: '1px solid rgba(255,255,255,0.14)',
                  boxShadow: '0 12px 24px rgba(29,185,84,0.18)'
                }}
              >
                <FaWhatsapp className="text-sm" />
                <span className="text-sm uppercase tracking-[0.08em]">
                  Consultar ahora
                </span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
