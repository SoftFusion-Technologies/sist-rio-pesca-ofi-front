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
 * Benjamin Orellana - 2026-03-08 - Sección de información + formulario para Río de Pesca.
 * El formulario se resuelve vía WhatsApp para mantener una experiencia simple y funcional sin backend.
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
      className="relative overflow-hidden py-14 sm:py-16 lg:py-20"
      aria-label="Información y contacto"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(720px 300px at 8% 12%, rgba(121,196,234,0.10), transparent 60%),
            radial-gradient(560px 260px at 92% 18%, rgba(84,164,206,0.10), transparent 58%),
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
            <FaShieldAlt className="text-[11px] text-cyan-200" />
            <span className="tracking-[0.14em] uppercase font-semibold">
              Información y contacto
            </span>
          </div>

          <h2 className="font-bignoodle mt-4 text-white text-[2.2rem] sm:text-[2.8rem] lg:text-[3.5rem] leading-[1.02] tracking-[-0.03em]">
            Estamos para ayudarte a{' '}
            <span
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,1), rgba(167,223,247,0.92), rgba(121,196,234,0.92))',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent'
              }}
            >
              elegir mejor
            </span>
          </h2>

          <p className="font-messina mt-4 max-w-[62ch] text-sm sm:text-base lg:text-lg leading-relaxed text-white/78">
            Consultanos por productos, carnadas, accesorios o recomendaciones
            para tu próxima salida. Completá el formulario y te llevamos directo
            a WhatsApp con el mensaje listo.
          </p>
        </motion.div>

        {/* Layout */}
        <div className="mt-8 sm:mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left info panel */}
          <motion.div
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
                Atención cercana, asesoramiento real y respuestas rápidas.
              </h3>

              <p className="mt-4 text-white/78 text-sm sm:text-base leading-relaxed">
                Te acompañamos para que encuentres lo que necesitás según tu
                salida, tu experiencia y tu presupuesto.
              </p>

              <div className="mt-6 space-y-3">
                <InfoRow
                  icon={FaMapMarkerAlt}
                  label="Ubicación"
                  value={locationLabel}
                />
                <InfoRow
                  icon={FaPhoneAlt}
                  label="Contacto"
                  value={phoneLabel}
                />
                <InfoRow icon={FaClock} label="Horarios" value={horarioLabel} />
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

              <motion.a
                href={whatsappBase}
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
                  Ir a WhatsApp
                </span>
              </motion.a>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.form
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-[30px] p-5 sm:p-6 lg:p-7"
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
                className="w-full rounded-2xl px-4 py-3 text-sm text-white outline-none"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)'
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
                className="w-full resize-none rounded-2xl px-4 py-3 text-sm text-white outline-none placeholder:text-white/36"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)'
                }}
              />
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-white/62 leading-relaxed max-w-lg">
                Al enviar, se abrirá WhatsApp con tu consulta cargada para que
                podamos responderte más rápido.
              </p>

              <motion.button
                type="submit"
                whileHover={{ y: -1, scale: 1.01 }}
                whileTap={{ scale: 0.985 }}
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-white font-semibold"
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
        className="w-full rounded-2xl px-4 py-3 text-sm text-white outline-none placeholder:text-white/36"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.10)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)'
        }}
      />
    </div>
  );
}
