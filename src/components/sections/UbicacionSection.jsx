import React from 'react';
import { motion } from 'framer-motion';
import {
  FaArrowRight,
  FaClock,
  FaMapMarkerAlt,
  FaRoute,
  FaShieldAlt,
  FaStore,
  FaWhatsapp
} from 'react-icons/fa';
import { siteConfig } from '../../config/siteConfig';

/*
 * Benjamin Orellana - 2026-03-08 - Sección de ubicación para Río de Pesca.
 * Soporta mapa embebido si existe mapEmbedUrl en siteConfig y fallback visual si aún no está definido.
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

export default function UbicacionSection() {
  const whatsappUrl =
    siteConfig?.social?.whatsapp?.url ||
    `https://wa.me/${siteConfig?.contact?.phoneRaw || ''}`;

  const mapsUrl =
    siteConfig?.contact?.mapsUrl || siteConfig?.brand?.mapsUrl || '';

  const mapEmbedUrl =
    siteConfig?.contact?.mapEmbedUrl || siteConfig?.brand?.mapEmbedUrl || '';

  const locationLabel = siteConfig?.brand?.locationLabel || 'Río Seco, Tucumán';

  const addressLine =
    siteConfig?.contact?.addressLine ||
    siteConfig?.brand?.addressLine ||
    'Consultanos para recibir la ubicación exacta y cómo llegar.';

  const horarioLabel =
    siteConfig?.brand?.scheduleLabel ||
    'Consultanos por horarios de atención y disponibilidad.';

  return (
    <section
      id="ubicacion"
      className="relative overflow-hidden py-14 sm:py-16 lg:py-20"
      aria-label="Ubicación"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(760px 320px at 10% 12%, rgba(121,196,234,0.10), transparent 60%),
            radial-gradient(560px 260px at 88% 18%, rgba(84,164,206,0.10), transparent 58%),
            radial-gradient(420px 220px at 50% 100%, rgba(255,255,255,0.04), transparent 64%)
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
            <FaMapMarkerAlt className="text-[11px] text-cyan-200" />
            <span className="tracking-[0.14em] uppercase font-semibold">
              Ubicación
            </span>
          </div>

          <h2 className="font-bignoodle mt-4 text-white text-[2.2rem] sm:text-[2.8rem] lg:text-[3.5rem] leading-[1.02] tracking-[-0.03em]">
            Visitá nuestra{' '}
            <span
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,1), rgba(167,223,247,0.92), rgba(121,196,234,0.92))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              tienda física
            </span>
          </h2>

          <p className="font-messina mt-4 max-w-[62ch] text-sm sm:text-base lg:text-lg leading-relaxed text-white/78">
            Estamos en {locationLabel}. Acercate, conocé nuestros productos y
            recibí asesoramiento real para elegir mejor tu equipo, carnadas y
            accesorios.
          </p>
        </motion.div>

        {/* Layout */}
        <div className="mt-8 sm:mt-10 grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
          {/* Panel izquierdo */}
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
              <span
                className="inline-flex rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/90"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.10)'
                }}
              >
                Río de Pesca
              </span>

              <h3 className="font-bignoodle mt-5 text-white text-[2rem] sm:text-[2.4rem] lg:text-[2.9rem] leading-[1.02] tracking-[-0.03em]">
                Te esperamos con atención personalizada y asesoramiento real.
              </h3>

              <p className="mt-4 text-white/78 text-sm sm:text-base leading-relaxed">
                Podés acercarte a conocer nuestros productos, consultar
                disponibilidad y recibir recomendaciones según tu tipo de pesca
                o tu próxima salida.
              </p>

              <div className="mt-6 space-y-3">
                <InfoRow
                  icon={FaMapMarkerAlt}
                  label="Zona"
                  value={locationLabel}
                />
                <InfoRow icon={FaStore} label="Dirección" value={addressLine} />
                <InfoRow icon={FaClock} label="Horarios" value={horarioLabel} />
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <MiniInfoCard
                  icon={FaShieldAlt}
                  title="Atención real"
                  desc="Te ayudamos a elegir según tu necesidad y presupuesto."
                />
                <MiniInfoCard
                  icon={FaRoute}
                  title="Cómo llegar"
                  desc="Podés abrir la ubicación en el mapa y venir directo."
                />
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {mapsUrl ? (
                  <motion.a
                    href={mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -1, scale: 1.01 }}
                    whileTap={{ scale: 0.985 }}
                    className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-white font-semibold"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.05))',
                      border: '1px solid rgba(255,255,255,0.14)',
                      boxShadow:
                        '0 12px 24px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.04)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)'
                    }}
                  >
                    <FaRoute className="text-sm" />
                    <span className="text-sm tracking-[0.08em] uppercase">
                      Cómo llegar
                    </span>
                  </motion.a>
                ) : null}

                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -1, scale: 1.01 }}
                  whileTap={{ scale: 0.985 }}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-white font-semibold"
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
                    Consultar ubicación
                  </span>
                  <FaArrowRight className="text-[11px]" />
                </motion.a>
              </div>
            </div>
          </motion.article>

          {/* Panel derecho / mapa */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
            className="relative overflow-hidden rounded-[30px]"
            style={{
              background:
                'linear-gradient(180deg, rgba(8,23,41,0.68), rgba(8,23,41,0.44))',
              border: '1px solid rgba(255,255,255,0.10)',
              boxShadow:
                '0 24px 50px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.03)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)'
            }}
          >
            {mapEmbedUrl ? (
              <div className="relative h-[420px] sm:h-[480px]">
                <iframe
                  title="Ubicación de Río de Pesca"
                  src={mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0"
                />

                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-24"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(8,23,41,0.34), rgba(8,23,41,0))'
                  }}
                />
              </div>
            ) : (
              <div className="relative flex h-[420px] sm:h-[480px] items-center justify-center p-6">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `
                      radial-gradient(620px 260px at 50% 10%, rgba(121,196,234,0.16), transparent 60%),
                      radial-gradient(300px 220px at 50% 100%, rgba(167,223,247,0.08), transparent 65%)
                    `
                  }}
                />

                <div className="relative z-10 max-w-md text-center">
                  <div
                    className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-[22px] text-white"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(121,196,234,0.18), rgba(84,164,206,0.08))',
                      border: '1px solid rgba(121,196,234,0.18)'
                    }}
                  >
                    <FaMapMarkerAlt className="text-xl" />
                  </div>

                  <h3 className="mt-5 text-white text-2xl font-semibold">
                    Ubicación de Río de Pesca
                  </h3>

                  <p className="mt-3 text-white/72 text-sm sm:text-base leading-relaxed">
                    {locationLabel}
                  </p>

                  <p className="mt-2 text-white/58 text-sm leading-relaxed">
                    aqui se mostrara el mapa
                  </p>

                  {mapsUrl ? (
                    <motion.a
                      href={mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ y: -1, scale: 1.01 }}
                      whileTap={{ scale: 0.985 }}
                      className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-3 text-white font-semibold"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.05))',
                        border: '1px solid rgba(255,255,255,0.14)',
                        boxShadow:
                          '0 12px 24px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.04)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)'
                      }}
                    >
                      <FaRoute className="text-sm" />
                      <span className="text-sm tracking-[0.08em] uppercase">
                        Abrir mapa
                      </span>
                    </motion.a>
                  ) : null}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))',
        border: '1px solid rgba(255,255,255,0.08)'
      }}
    >
      <div className="flex items-center gap-2 text-white">
        <Icon className="text-cyan-200 text-sm" />
        <span className="text-sm font-semibold">{label}</span>
      </div>
      <p className="mt-2 text-white/70 text-sm leading-relaxed">{value}</p>
    </div>
  );
}

function MiniInfoCard({ icon: Icon, title, desc }) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))',
        border: '1px solid rgba(255,255,255,0.08)'
      }}
    >
      <div className="flex items-center gap-2 text-white">
        <Icon className="text-cyan-200 text-sm" />
        <span className="text-sm font-semibold">{title}</span>
      </div>
      <p className="mt-2 text-white/70 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
