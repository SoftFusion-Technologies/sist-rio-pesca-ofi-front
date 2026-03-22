// src/Components/Common/EmptyStateGalactic.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { SearchX, Sparkles } from 'lucide-react';

export default function EmptyStateGalactic({
  query = '',
  title = 'Sin coincidencias',
  message,
  onReset
}) {
  const hasQuery = Boolean(query && query.trim());

  const finalMessage =
    message ||
    (hasQuery
      ? 'Probá ajustar la búsqueda, revisar la ortografía o usar menos palabras.'
      : 'Probá cambiar los filtros o explorar otras categorías.');

  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl border border-[#3b82f6]/15 bg-gradient-to-br from-[#07111f] via-[#0b1730] to-[#12264f] px-6 py-7 sm:px-8 sm:py-9 shadow-[0_20px_60px_rgba(2,6,23,0.45)]"
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {/* Glows de fondo */}
      <div
        className="pointer-events-none absolute -top-24 -right-10 h-52 w-52 rounded-full bg-[#3b82f6]/18 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-8 h-48 w-48 rounded-full bg-[#60a5fa]/14 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
        aria-hidden="true"
      />

      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Lado izquierdo */}
        <div className="flex items-start gap-4">
          <div className="mt-1">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-[#60a5fa]/35 blur-md" />
              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#dbeafe] via-[#60a5fa] to-[#1d4ed8] shadow-[0_0_28px_rgba(96,165,250,0.45)] ring-1 ring-white/20">
                <SearchX className="h-5 w-5 text-[#07111f]" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-white sm:text-base">
              {title}
            </h3>

            {hasQuery && (
              <p className="mt-1 text-xs text-white/60">
                No se encontraron resultados para{' '}
                <span className="inline-flex items-center gap-1 rounded-full border border-[#60a5fa]/30 bg-[#60a5fa]/10 px-2 py-0.5 text-[11px] text-[#bfdbfe]">
                  <Sparkles className="h-3 w-3" />“{query}”
                </span>
              </p>
            )}

            <p className="mt-2 text-xs leading-relaxed text-white/70 sm:text-sm">
              {finalMessage}
            </p>

            <ul className="mt-3 flex flex-wrap gap-2 text-[11px] text-white/55">
              <li className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                Filtrá por otra palabra clave
              </li>
              <li className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                Usá menos filtros
              </li>
              <li className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                Revisá mayúsculas / tildes
              </li>
            </ul>
          </div>
        </div>

        {/* Lado derecho */}
        <div className="flex flex-col items-start gap-3 text-xs sm:text-sm md:items-end">
          {onReset && hasQuery && (
            <button
              type="button"
              onClick={onReset}
              className="
                inline-flex items-center gap-1.5 rounded-2xl
                border border-[#60a5fa]/25
                bg-[#60a5fa]/10 px-3 py-1.5
                text-[11px] uppercase tracking-[0.16em]
                text-[#dbeafe] transition
                hover:bg-[#60a5fa]/15 hover:text-white
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa]
              "
            >
              <span>Limpiar búsqueda</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
