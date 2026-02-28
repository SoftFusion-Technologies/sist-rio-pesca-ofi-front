import React from 'react';
import { motion } from 'framer-motion';
import {
  FaGift,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTruck,
  FaUsers,
  FaBullhorn,
  FaStar,
  FaShieldAlt
} from 'react-icons/fa';
import { siteConfig } from '../config/siteConfig';

// Benjamin Orellana - 2026-02-22 - Página /sorteos moderna para comunicar sorteos semanales, CTA WhatsApp y beneficios de participación.
import promoSorteosImg from '../assets/sorteos/sorteos-referencia.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: 'blur(8px)' },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      delay: i * 0.06,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

const steps = [
  {
    id: '01',
    title: 'Escribinos por WhatsApp',
    text: 'Sumate al grupo de sorteos semanales y recibí novedades, productos y bases de participación.',
    icon: FaWhatsapp
  },
  {
    id: '02',
    title: 'Seguí nuestras redes',
    text: 'Publicamos los sorteos, condiciones y anuncios de ganadores en nuestras redes oficiales.',
    icon: FaBullhorn
  },
  {
    id: '03',
    title: 'Participá cada semana',
    text: 'Cada semana podés entrar en nuevos sorteos con premios de pesca y camping.',
    icon: FaGift
  },
  {
    id: '04',
    title: 'Ganás y coordinamos envío',
    text: 'Si salís ganador/a, coordinamos entrega o envío según tu ubicación.',
    icon: FaTruck
  }
];

const prizes = [
  {
    title: 'Accesorios de pesca',
    desc: 'Reeles, líneas, anzuelos, accesorios y kits para salidas de pesca.',
    tag: 'Pesca',
    icon: FaGift
  },
  {
    title: 'Camping y outdoor',
    desc: 'Conservadoras, carpas, bolsas de dormir y artículos para campamento.',
    tag: 'Camping',
    icon: FaStar
  },
  {
    title: 'Indumentaria',
    desc: 'Remeras, gorras y prendas técnicas relacionadas al mundo pesca/camping.',
    tag: 'Indumentaria',
    icon: FaCheckCircle
  },
  {
    title: 'Premios sorpresa',
    desc: 'Semanalmente pueden aparecer premios especiales según stock y campañas.',
    tag: 'Sorpresa',
    icon: FaShieldAlt
  }
];

const faqs = [
  {
    q: '¿Los sorteos son realmente semanales?',
    a: 'Sí, Río de Pesca realiza sorteos todas las semanas. Las fechas y condiciones se comunican por WhatsApp y redes oficiales.'
  },
  {
    q: '¿Cómo me sumo al grupo?',
    a: 'Tocando el botón de WhatsApp de esta página. Te abrimos el chat con un mensaje listo para consultar y sumarte.'
  },
  {
    q: '¿Hacen envíos al interior?',
    a: 'Sí, realizan envíos a todo el país. La logística del premio se coordina una vez confirmado el ganador.'
  },
  {
    q: '¿Qué tipo de premios sortean?',
    a: 'Productos de pesca, camping, accesorios, indumentaria y premios sorpresa según disponibilidad.'
  }
];

function buildWhatsAppUrl() {
  const base =
    siteConfig?.social?.whatsapp?.url ||
    `https://wa.me/${siteConfig?.contact?.phoneRaw || ''}`;

  const text = encodeURIComponent(
    siteConfig?.contact?.whatsappMessage ||
      'Hola Río de Pesca, quiero sumarme al grupo de sorteos semanales.'
  );

  return base.includes('?') ? `${base}&text=${text}` : `${base}?text=${text}`;
}

function SocialChip({ href, icon: Icon, label, handle }) {
  if (!href) return null;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-white/90"
      style={{
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))',
        border: '1px solid rgba(255,255,255,0.10)'
      }}
      aria-label={`${label} ${handle || ''}`}
      title={`${label}${handle ? ` · ${handle}` : ''}`}
    >
      <Icon className="text-[12px]" />
      <span className="text-xs font-semibold">{handle || label}</span>
    </motion.a>
  );
}

function InfoPill({ icon: Icon, label }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-white/85 text-xs sm:text-sm"
      style={{
        background: 'rgba(255,255,255,0.035)',
        border: '1px solid rgba(255,255,255,0.09)'
      }}
    >
      <Icon className="text-[12px] text-cyan-200/90" />
      <span>{label}</span>
    </div>
  );
}

export default function SorteosPage() {
  const waUrl = buildWhatsAppUrl();
  const brand = siteConfig?.brand || {};
  const social = siteConfig?.social || {};
  const contact = siteConfig?.contact || {};

  return (
    <div id="sorteos" className="relative">
      {/* Hero / portada */}
      <section className="relative pt-6 sm:pt-8 lg:pt-10 pb-8 sm:pb-10 lg:pb-14">
        <div className="rp-container">
          <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-5 lg:gap-6 items-stretch">
            {/* Columna texto */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="relative overflow-hidden rounded-[28px] p-5 sm:p-6 lg:p-7"
              style={{
                background:
                  'linear-gradient(180deg, rgba(8,24,42,0.78), rgba(7,20,36,0.70))',
                border: '1px solid rgba(255,255,255,0.10)',
                boxShadow:
                  '0 24px 54px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.03)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)'
              }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `
                    radial-gradient(500px 240px at 0% 0%, rgba(121,196,234,0.12), transparent 65%),
                    radial-gradient(460px 220px at 95% 10%, rgba(84,164,206,0.08), transparent 62%),
                    radial-gradient(380px 180px at 50% 100%, rgba(224,160,32,0.06), transparent 70%)
                  `
                }}
              />

              <div className="relative">
                <div className="flex flex-wrap gap-2">
                  <span
                    className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-white/95 text-xs sm:text-sm font-semibold uppercase tracking-[0.10em]"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(84,164,206,0.18), rgba(84,164,206,0.10))',
                      border: '1px solid rgba(121,196,234,0.20)'
                    }}
                  >
                    <FaGift className="text-[12px]" />
                    Sorteos semanales
                  </span>

                  <span
                    className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-white/85 text-xs sm:text-sm font-semibold uppercase tracking-[0.08em]"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.10)'
                    }}
                  >
                    Envíos a todo el país
                  </span>
                </div>

                <h1 className="font-bignoodle mt-4 text-white font-extrabold tracking-[-0.03em] leading-[0.95] text-3xl sm:text-4xl lg:text-5xl">
                  Sumate a los sorteos de{' '}
                  <span className="bg-gradient-to-r from-cyan-200 via-sky-300 to-blue-300 bg-clip-text text-transparent">
                    Río de Pesca
                  </span>
                </h1>

                <p className="font-messina mt-4 text-white/75 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl">
                  Todas las semanas realizamos sorteos con premios de pesca y
                  camping. Participá, seguí las novedades y enterate primero de
                  lanzamientos, promos y premios especiales.
                </p>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  <InfoPill icon={FaWhatsapp} label="Grupo por WhatsApp" />
                  <InfoPill icon={FaUsers} label="Comunidad activa" />
                  <InfoPill icon={FaTruck} label="Coordinación de envíos" />
                  <InfoPill
                    icon={FaMapMarkerAlt}
                    label={brand?.locationLabel || 'Río Seco - Tucumán'}
                  />
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <motion.a
                    href={waUrl}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.985 }}
                    className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-white font-semibold"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(29,185,84,0.96), rgba(37,211,102,0.96))',
                      border: '1px solid rgba(255,255,255,0.18)',
                      boxShadow:
                        '0 14px 28px rgba(29,185,84,0.20), inset 0 1px 0 rgba(255,255,255,0.14)'
                    }}
                  >
                    <FaWhatsapp />
                    <span className="uppercase tracking-[0.08em] text-sm">
                      Quiero sumarme al grupo
                    </span>
                  </motion.a>

                  <motion.a
                    href="#como-participar"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.985 }}
                    className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-white/92 font-semibold"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.03))',
                      border: '1px solid rgba(255,255,255,0.10)'
                    }}
                  >
                    <span className="uppercase tracking-[0.08em] text-sm">
                      Cómo participar
                    </span>
                  </motion.a>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <SocialChip
                    href={social?.instagram?.url}
                    icon={FaInstagram}
                    label={social?.instagram?.label || 'Instagram'}
                    handle={social?.instagram?.handle}
                  />
                  <SocialChip
                    href={social?.facebook?.url}
                    icon={FaFacebookF}
                    label={social?.facebook?.label || 'Facebook'}
                    handle={social?.facebook?.handle}
                  />
                  <SocialChip
                    href={social?.tiktok?.url}
                    icon={FaTiktok}
                    label={social?.tiktok?.label || 'TikTok'}
                    handle={social?.tiktok?.handle}
                  />
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      label: 'Frecuencia',
                      value: 'Semanal'
                    },
                    {
                      label: 'Canal principal',
                      value: 'WhatsApp'
                    },
                    {
                      label: 'Atención',
                      value: contact?.phoneDisplay || '381-5670618'
                    }
                  ].map((stat, idx) => (
                    <motion.div
                      key={stat.label}
                      variants={fadeUp}
                      initial="hidden"
                      animate="show"
                      custom={idx + 2}
                      className="rounded-2xl px-4 py-3"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)'
                      }}
                    >
                      <div className="text-white/60 text-[11px] uppercase tracking-[0.12em] font-semibold">
                        {stat.label}
                      </div>
                      <div className="mt-1 text-white text-sm sm:text-base font-bold">
                        {stat.value}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Columna imagen promo */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="relative overflow-hidden rounded-[28px] p-[10px] sm:p-3"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
                border: '1px solid rgba(255,255,255,0.10)',
                boxShadow:
                  '0 24px 54px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.04)'
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(360px 120px at 20% 0%, rgba(121,196,234,0.10), transparent 70%)'
                }}
              />

              <div className="relative h-full rounded-2xl overflow-hidden">
                <img
                  src={promoSorteosImg}
                  alt="Promo de sorteos semanales de Río de Pesca"
                  className="w-full h-full object-cover"
                />

                {/* <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <div
                    className="rounded-2xl px-3 py-3 sm:px-4 sm:py-3.5"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(7,20,36,0.72), rgba(7,20,36,0.86))',
                      border: '1px solid rgba(255,255,255,0.10)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)'
                    }}
                  >
                    <div className="text-white font-bold text-sm sm:text-base">
                      Sorteos todas las semanas
                    </div>
                    <div className="mt-1 text-white/75 text-xs sm:text-sm leading-relaxed">
                      Premios de pesca y camping. Sumate por WhatsApp y seguí
                      nuestras redes para participar.
                    </div>
                  </div>
                </div> */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cómo participar */}
      <section id="como-participar" className="relative py-8 sm:py-10 lg:py-12">
        <div className="rp-container">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="mb-4 sm:mb-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-white/85 text-xs uppercase tracking-[0.10em] font-semibold border border-white/10 bg-white/5">
              <FaCheckCircle className="text-cyan-200/90" />
              Cómo participar
            </div>
            <h2 className="font-bignoodle mt-3 text-white font-extrabold tracking-[-0.02em] text-2xl sm:text-3xl lg:text-4xl">
              Entrá a los sorteos en pocos pasos
            </h2>
            <p className="font-messina mt-2 text-white/72 max-w-2xl leading-relaxed">
              Lo hicimos simple para que cualquiera pueda sumarse. Seguinos,
              escribinos y participá de los sorteos semanales.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.article
                  key={step.id}
                  custom={idx}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.15 }}
                  whileHover={{ y: -3 }}
                  className="relative overflow-hidden rounded-3xl p-4 sm:p-5"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(8,24,42,0.70), rgba(7,20,36,0.62))',
                    border: '1px solid rgba(255,255,255,0.09)',
                    boxShadow: '0 16px 34px rgba(0,0,0,0.14)'
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(300px 120px at 0% 0%, rgba(121,196,234,0.08), transparent 70%)'
                    }}
                  />

                  <div className="relative">
                    <div className="flex items-center justify-between gap-3">
                      <div
                        className="h-10 w-10 rounded-2xl flex items-center justify-center text-white"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(84,164,206,0.20), rgba(84,164,206,0.10))',
                          border: '1px solid rgba(121,196,234,0.20)'
                        }}
                      >
                        <Icon />
                      </div>

                      <div className="text-cyan-200/80 font-extrabold text-sm tracking-[0.14em]">
                        {step.id}
                      </div>
                    </div>

                    <h3 className="mt-4 font-messina text-white font-bold text-base sm:text-lg leading-snug">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-white/70 text-sm leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Premios */}
      <section className="relative py-8 sm:py-10 lg:py-12">
        <div className="rp-container">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="mb-4 sm:mb-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-white/85 text-xs uppercase tracking-[0.10em] font-semibold border border-white/10 bg-white/5">
              <FaGift className="text-cyan-200/90" />
              Premios
            </div>

            <h2 className="font-bignoodle mt-3 text-white font-extrabold tracking-[-0.02em] text-2xl sm:text-3xl lg:text-4xl">
              ¿Qué podés ganar?
            </h2>

            <p className="font-messina mt-2 text-white/72 max-w-2xl leading-relaxed">
              Los premios pueden variar semana a semana según stock, campañas y
              novedades de la tienda.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {prizes.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  custom={idx}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.15 }}
                  whileHover={{ y: -3 }}
                  className="relative overflow-hidden rounded-3xl p-4 sm:p-5"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(8,24,42,0.72), rgba(7,20,36,0.64))',
                    border: '1px solid rgba(255,255,255,0.10)',
                    boxShadow: '0 16px 34px rgba(0,0,0,0.14)'
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="shrink-0 h-11 w-11 rounded-2xl flex items-center justify-center text-white"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(84,164,206,0.20), rgba(84,164,206,0.10))',
                        border: '1px solid rgba(121,196,234,0.20)'
                      }}
                    >
                      <Icon />
                    </div>

                    <div className="min-w-0">
                      <div className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.10em] text-cyan-200/90 border border-cyan-200/15 bg-cyan-200/5">
                        {item.tag}
                      </div>

                      <h3 className="font-messina mt-2 text-white font-bold text-base sm:text-lg">
                        {item.title}
                      </h3>

                      <p className="mt-1.5 text-white/70 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bloque confianza + CTA */}
      <section className="relative py-8 sm:py-10 lg:py-12">
        <div className="rp-container">
          <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_0.95fr] gap-4 sm:gap-5">
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="rounded-3xl p-5 sm:p-6"
              style={{
                background:
                  'linear-gradient(180deg, rgba(8,24,42,0.76), rgba(7,20,36,0.66))',
                border: '1px solid rgba(255,255,255,0.10)',
                boxShadow: '0 20px 44px rgba(0,0,0,0.15)'
              }}
            >
              <h3 className="text-white font-extrabold tracking-[-0.02em] text-xl sm:text-2xl">
                Sorteos transparentes y comunicación por canales oficiales
              </h3>

              <p className="mt-3 text-white/72 leading-relaxed">
                La participación y las novedades se comunican mediante WhatsApp
                y redes oficiales de Río de Pesca. Los premios y condiciones se
                anuncian en cada publicación/sorteo correspondiente.
              </p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Sorteos todas las semanas',
                  'Publicación de anuncios en redes',
                  'Contacto directo por WhatsApp',
                  'Coordinación de entrega/envío'
                ].map((txt) => (
                  <div
                    key={txt}
                    className="flex items-center gap-2 rounded-2xl px-3 py-2.5 text-white/85 text-sm"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.08)'
                    }}
                  >
                    <FaCheckCircle className="text-cyan-200/90 text-[13px]" />
                    <span>{txt}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="relative overflow-hidden rounded-3xl p-5 sm:p-6"
              style={{
                background:
                  'linear-gradient(180deg, rgba(10,32,54,0.78), rgba(7,20,36,0.68))',
                border: '1px solid rgba(255,255,255,0.10)',
                boxShadow: '0 20px 44px rgba(0,0,0,0.15)'
              }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `
                    radial-gradient(420px 160px at 100% 0%, rgba(37,211,102,0.10), transparent 70%),
                    radial-gradient(400px 180px at 0% 100%, rgba(121,196,234,0.08), transparent 70%)
                  `
                }}
              />

              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.10em] font-semibold text-white/90 border border-white/10 bg-white/5">
                  <FaWhatsapp className="text-green-300" />
                  Sumate ahora
                </div>

                <h3 className="mt-3 text-white font-extrabold tracking-[-0.02em] text-xl sm:text-2xl">
                  ¿Querés participar en los próximos sorteos?
                </h3>

                <p className="mt-2 text-white/72 leading-relaxed">
                  Escribinos y te guiamos para sumarte al grupo y seguir las
                  bases de participación de cada semana.
                </p>

                <motion.a
                  href={waUrl}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.985 }}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-white font-semibold"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(29,185,84,0.96), rgba(37,211,102,0.96))',
                    border: '1px solid rgba(255,255,255,0.18)',
                    boxShadow:
                      '0 14px 28px rgba(29,185,84,0.20), inset 0 1px 0 rgba(255,255,255,0.14)'
                  }}
                >
                  <FaWhatsapp />
                  <span className="uppercase tracking-[0.08em] text-sm">
                    Abrir WhatsApp
                  </span>
                </motion.a>

                <div className="mt-4 text-center text-white/60 text-xs">
                  {contact?.phoneDisplay || '381-5670618'}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-8 sm:py-10 lg:py-12">
        <div className="rp-container">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="mb-4 sm:mb-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-white/85 text-xs uppercase tracking-[0.10em] font-semibold border border-white/10 bg-white/5">
              <FaShieldAlt className="text-cyan-200/90" />
              Preguntas frecuentes
            </div>
            <h2 className="font-bignoodle mt-3 text-white font-extrabold tracking-[-0.02em] text-2xl sm:text-3xl">
              Todo claro antes de participar
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {faqs.map((item, idx) => (
              <motion.article
                key={item.q}
                custom={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                className="rounded-3xl p-4 sm:p-5"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(8,24,42,0.68), rgba(7,20,36,0.60))',
                  border: '1px solid rgba(255,255,255,0.09)',
                  boxShadow: '0 16px 34px rgba(0,0,0,0.12)'
                }}
              >
                <h3 className="font-messina text-white font-bold text-base leading-snug">
                  {item.q}
                </h3>
                <p className="mt-2 text-white/72 text-sm leading-relaxed">
                  {item.a}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative pt-6 pb-12 sm:pb-16 lg:pb-20">
        <div className="rp-container">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="relative overflow-hidden rounded-[30px] p-5 sm:p-6 lg:p-8"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,32,54,0.82), rgba(7,20,36,0.78))',
              border: '1px solid rgba(255,255,255,0.10)',
              boxShadow:
                '0 24px 54px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.03)'
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background: `
                  radial-gradient(480px 180px at 10% 0%, rgba(121,196,234,0.12), transparent 70%),
                  radial-gradient(420px 180px at 100% 100%, rgba(37,211,102,0.08), transparent 72%)
                `
              }}
            />

            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs uppercase tracking-[0.10em] font-semibold text-white/90 border border-white/10 bg-white/5">
                  <FaGift className="text-cyan-200/90" />
                  Sorteos Río de Pesca
                </div>

                <h2 className="font-bignoodle mt-3 text-white font-extrabold tracking-[-0.02em] text-2xl sm:text-3xl lg:text-4xl">
                  Participá de los sorteos semanales y no te pierdas los premios
                </h2>

                <p className="font-messina mt-3 text-white/72 leading-relaxed">
                  Contactanos por WhatsApp para sumarte al grupo y seguir las
                  próximas publicaciones.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.a
                  href={waUrl}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.985 }}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-white font-semibold"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(29,185,84,0.96), rgba(37,211,102,0.96))',
                    border: '1px solid rgba(255,255,255,0.18)',
                    boxShadow:
                      '0 14px 28px rgba(29,185,84,0.20), inset 0 1px 0 rgba(255,255,255,0.14)'
                  }}
                >
                  <FaWhatsapp />
                  <span className="uppercase tracking-[0.08em] text-sm">
                    Sumarme por WhatsApp
                  </span>
                </motion.a>

                <motion.a
                  href="/"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.985 }}
                  className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-white/92 font-semibold"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.03))',
                    border: '1px solid rgba(255,255,255,0.10)'
                  }}
                >
                  <span className="uppercase tracking-[0.08em] text-sm">
                    Volver al inicio
                  </span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
