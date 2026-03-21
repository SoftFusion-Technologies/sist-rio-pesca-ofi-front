import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaArrowRight,
  FaClock,
  FaFish,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaShieldAlt,
  FaWhatsapp
} from 'react-icons/fa';
import { siteConfig } from '../../config/siteConfig';

/*
 * Benjamin Orellana - 2026-03-21 - Refuerzo visual y jerarquía UX de la sección Información y contacto.
 * Se incrementa protagonismo del bloque de contacto, se mejora la lectura de datos clave y se potencia la llamada a la acción hacia WhatsApp.
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

const initialForm = {
  nombre: '',
  telefono: '',
  tipoConsulta: 'Productos',
  mensaje: ''
};

const options = [
  'Productos',
  'Carnadas',
  'Tips',
  'Camping',
  'Consulta general'
];

export default function InfoSection() {
  const whatsappBase =
    siteConfig?.social?.whatsapp?.url ||
    `https://wa.me/${siteConfig?.contact?.phoneRaw || ''}`;

  const [form, setForm] = useState(initialForm);

  const locationLabel = siteConfig?.brand?.locationLabel || 'Río Seco, Tucumán';

  const phoneLabel =
    siteConfig?.contact?.phoneDisplay ||
    siteConfig?.contact?.phoneRaw ||
    'WhatsApp';

  const phoneRaw = siteConfig?.contact?.phoneRaw || '';

  const horarioLabel = useMemo(() => {
    return (
      siteConfig?.brand?.scheduleLabel ||
      'Consultanos por horarios de atención y disponibilidad'
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const texto = [
      'Hola Río de Pesca, quiero hacer una consulta.',
      '',
      `Nombre: ${form.nombre || 'No informado'}`,
      `Teléfono: ${form.telefono || 'No informado'}`,
      `Consulta sobre: ${form.tipoConsulta || 'General'}`,
      `Mensaje: ${form.mensaje || 'Sin detalle'}`
    ].join('\n');

    const separator = whatsappBase.includes('?') ? '&' : '?';
    const finalUrl = `${whatsappBase}${separator}text=${encodeURIComponent(texto)}`;

    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="info"
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
      aria-label="Información y contacto"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(780px 360px at 8% 10%, rgba(121,196,234,0.14), transparent 60%),
            radial-gradient(620px 280px at 92% 14%, rgba(84,164,206,0.12), transparent 58%),
            radial-gradient(520px 240px at 50% 100%, rgba(255,255,255,0.05), transparent 64%)
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
          className="max-w-4xl"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm text-white/95"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))',
              border: '1px solid rgba(255,255,255,0.14)',
              boxShadow:
                '0 14px 32px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.06)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)'
            }}
          >
            <FaShieldAlt className="text-[11px] text-cyan-200" />
            <span className="tracking-[0.18em] uppercase font-semibold">
              Información y contacto
            </span>
          </div>

          <h2 className="font-bignoodle mt-5 text-white text-[2.5rem] sm:text-[3.3rem] lg:text-[4.3rem] leading-[0.98] tracking-[-0.04em]">
            Hablemos y te ayudamos a{' '}
            <span
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,1), rgba(167,223,247,0.95), rgba(121,196,234,0.95))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              elegir mejor
            </span>
          </h2>

          <p className="font-messina mt-5 max-w-[70ch] text-sm sm:text-base lg:text-lg leading-relaxed text-white/82">
            Consultanos por productos, carnadas, accesorios o recomendaciones
            para tu próxima salida. Te dejamos un canal directo, simple y rápido
            para que nos escribas por WhatsApp con el mensaje ya preparado.
          </p>
        </motion.div>

        {/* Franja destacada */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-7 grid gap-3 md:grid-cols-3"
        >
          <HighlightPill
            icon={FaWhatsapp}
            title="Respuesta rápida"
            desc="Canal directo por WhatsApp"
          />
          <HighlightPill
            icon={FaShieldAlt}
            title="Asesoramiento real"
            desc="Te orientamos según tu necesidad"
          />
          <HighlightPill
            icon={FaFish}
            title="Productos y pesca"
            desc="Equipos, carnadas y recomendaciones"
          />
        </motion.div>

        {/* Layout */}
        <div className="mt-8 sm:mt-10 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          {/* Left info panel */}
          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
            className="relative overflow-hidden rounded-[34px] p-6 sm:p-7 lg:p-8"
            style={{
              background:
                'linear-gradient(180deg, rgba(8,23,41,0.82), rgba(8,23,41,0.56))',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow:
                '0 30px 70px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.04)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)'
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-10 top-10 h-44 w-44 rounded-full blur-3xl"
              style={{ background: 'rgba(121,196,234,0.18)' }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 bottom-0 h-48 w-48 rounded-full blur-3xl"
              style={{ background: 'rgba(167,223,247,0.12)' }}
            />

            <div className="relative">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="inline-flex rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-white/95"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)'
                  }}
                >
                  Río de Pesca
                </span>

                <span className="inline-flex rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-emerald-100">
                  <span
                    className="mr-2 inline-block h-2 w-2 rounded-full"
                    style={{
                      background: '#22c55e',
                      boxShadow: '0 0 14px rgba(34,197,94,0.75)'
                    }}
                  />
                  Atención directa
                </span>
              </div>

              <h3 className="font-bignoodle mt-5 text-white text-[2.2rem] sm:text-[2.8rem] lg:text-[3.3rem] leading-[0.98] tracking-[-0.04em] max-w-[12ch]">
                Tu consulta entra más rápido por acá.
              </h3>

              <p className="mt-4 max-w-[58ch] text-white/80 text-sm sm:text-base lg:text-[1.02rem] leading-relaxed">
                Estamos para ayudarte con una atención cercana, clara y útil. Si
                no sabés exactamente qué elegir, te guiamos según tu salida, tu
                experiencia y tu presupuesto.
              </p>

              <div className="mt-7 grid gap-4">
                <BigInfoRow
                  icon={FaMapMarkerAlt}
                  label="Ubicación"
                  value={locationLabel}
                />
                <BigInfoRow
                  icon={FaPhoneAlt}
                  label="Contacto"
                  value={phoneLabel}
                />
                <BigInfoRow
                  icon={FaClock}
                  label="Horarios"
                  value={horarioLabel}
                />
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <MiniInfoCard
                  icon={FaFish}
                  title="Pesca"
                  desc="Cañas, reels, líneas, accesorios y más."
                />
                <MiniInfoCard
                  icon={FaShieldAlt}
                  title="Asesoramiento"
                  desc="Te orientamos según tu salida y necesidad."
                />
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <motion.a
                  href={whatsappBase}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.985 }}
                  className="inline-flex min-h-[56px] items-center justify-center gap-3 rounded-full px-5 py-3 text-white font-semibold"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(29,185,84,0.98), rgba(37,211,102,0.98))',
                    border: '1px solid rgba(255,255,255,0.18)',
                    boxShadow:
                      '0 16px 34px rgba(29,185,84,0.28), inset 0 1px 0 rgba(255,255,255,0.20)'
                  }}
                >
                  <FaWhatsapp className="text-base" />
                  <span className="text-sm tracking-[0.08em] uppercase">
                    Escribir por WhatsApp
                  </span>
                  <FaArrowRight className="text-[11px]" />
                </motion.a>

                {phoneRaw ? (
                  <a
                    href={`tel:${phoneRaw}`}
                    className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full px-5 py-3 text-white/92 font-semibold"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)'
                    }}
                  >
                    <FaPhoneAlt className="text-sm text-cyan-200" />
                    <span className="text-sm tracking-[0.06em] uppercase">
                      Ver teléfono
                    </span>
                  </a>
                ) : null}
              </div>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.form
            custom={3}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-[34px] p-5 sm:p-6 lg:p-7"
            style={{
              background:
                'linear-gradient(180deg, rgba(8,23,41,0.70), rgba(8,23,41,0.46))',
              border: '1px solid rgba(255,255,255,0.10)',
              boxShadow:
                '0 24px 50px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.03)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)'
            }}
          >
            <div className="mb-5">
              <p className="text-[11px] uppercase tracking-[0.16em] text-cyan-200/90">
                Consulta rápida
              </p>
              <h4 className="mt-2 font-bignoodle text-white text-[1.8rem] sm:text-[2.2rem] leading-none tracking-[-0.03em]">
                Dejanos tu mensaje
              </h4>
              <p className="mt-2 text-sm text-white/68 leading-relaxed">
                Completás estos datos y abrimos WhatsApp con todo listo para
                enviarlo.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Nombre"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Tu nombre"
              />

              <Field
                label="Teléfono"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                placeholder="Tu teléfono"
              />
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-[11px] uppercase tracking-[0.14em] text-white/62">
                Tipo de consulta
              </label>
              <select
                name="tipoConsulta"
                value={form.tipoConsulta}
                onChange={handleChange}
                className="w-full rounded-2xl px-4 py-3.5 text-sm text-white outline-none"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)'
                }}
              >
                {options.map((opt) => (
                  <option
                    key={opt}
                    value={opt}
                    style={{ background: '#0b1b2d', color: '#ffffff' }}
                  >
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-[11px] uppercase tracking-[0.14em] text-white/62">
                Mensaje
              </label>
              <textarea
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                rows={6}
                placeholder="Contanos qué estás buscando o qué tipo de salida querés hacer..."
                className="w-full resize-none rounded-2xl px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/36"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)'
                }}
              />
            </div>

            <div
              className="mt-5 rounded-2xl p-4"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))',
                border: '1px solid rgba(255,255,255,0.08)'
              }}
            >
              <p className="text-sm text-white/72 leading-relaxed">
                Al enviar, se abrirá WhatsApp con tu consulta cargada para que
                podamos responderte más rápido.
              </p>
            </div>

            <div className="mt-5 flex">
              <motion.button
                type="submit"
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.985 }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-white font-semibold"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(29,185,84,0.98), rgba(37,211,102,0.98))',
                  border: '1px solid rgba(255,255,255,0.16)',
                  boxShadow:
                    '0 14px 30px rgba(29,185,84,0.24), inset 0 1px 0 rgba(255,255,255,0.18)'
                }}
              >
                <FaWhatsapp className="text-sm" />
                <span className="text-sm tracking-[0.08em] uppercase">
                  Enviar consulta
                </span>
                <FaArrowRight className="text-[11px]" />
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function HighlightPill({ icon: Icon, title, desc }) {
  return (
    <div
      className="rounded-2xl px-4 py-3"
      style={{
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
        border: '1px solid rgba(255,255,255,0.10)',
        boxShadow: '0 12px 28px rgba(0,0,0,0.10)'
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: 'rgba(121,196,234,0.16)',
            border: '1px solid rgba(121,196,234,0.20)'
          }}
        >
          <Icon className="text-cyan-200 text-sm" />
        </div>

        <div>
          <p className="text-white text-sm font-semibold">{title}</p>
          <p className="mt-1 text-white/66 text-sm leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function BigInfoRow({ icon: Icon, label, value }) {
  return (
    <div
      className="rounded-[24px] p-4 sm:p-5"
      style={{
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
        border: '1px solid rgba(255,255,255,0.10)',
        boxShadow: '0 10px 24px rgba(0,0,0,0.10)'
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
          style={{
            background: 'rgba(121,196,234,0.16)',
            border: '1px solid rgba(121,196,234,0.20)'
          }}
        >
          <Icon className="text-cyan-200 text-base" />
        </div>

        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/55">
            {label}
          </p>
          <p className="mt-1 text-white text-base sm:text-[1.02rem] font-semibold leading-relaxed">
            {value}
          </p>
        </div>
      </div>
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

function Field({ label, name, value, onChange, placeholder }) {
  return (
    <div>
      <label className="mb-2 block text-[11px] uppercase tracking-[0.14em] text-white/62">
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/36"
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)'
        }}
      />
    </div>
  );
}
