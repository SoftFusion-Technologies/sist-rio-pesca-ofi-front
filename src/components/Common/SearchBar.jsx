// src/Components/Common/SearchBar.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Buscar…',
  className = ''
}) {
  const hasValue = Boolean(value && value.trim());

  return (
    <motion.div
      className={`w-full ${className}`}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <div className="group relative">
        {/* Aura / glow externo */}
        <div
          className="
            pointer-events-none absolute -inset-px rounded-3xl
            bg-gradient-to-r from-[#1e3a8a] via-[#3b82f6] to-[#60a5fa]
            opacity-35 blur-sm transition
            group-hover:opacity-80 group-hover:blur
          "
          aria-hidden="true"
        />

        {/* Contenedor principal */}
        <div
          className="
            relative flex items-center gap-2 overflow-hidden rounded-3xl
            border border-[#60a5fa]/20
            bg-[#07111f]/85
            px-3 py-2.5 backdrop-blur-xl sm:px-4
            shadow-[0_18px_45px_rgba(2,6,23,0.55)]
          "
        >
          {/* Línea inferior */}
          <div
            className="
              pointer-events-none absolute bottom-0 left-4 right-4 h-[1px]
              bg-gradient-to-r from-transparent via-[#60a5fa] to-transparent
              opacity-60 transition group-hover:opacity-100
            "
          />

          {/* Nodo izquierdo desktop */}
          <div className="relative mr-1 hidden sm:flex">
            <span
              className="
                flex h-6 w-6 items-center justify-center rounded-2xl
                bg-gradient-to-br from-[#dbeafe] via-[#60a5fa] to-[#1d4ed8]
                shadow-[0_0_18px_rgba(96,165,250,0.45)]
                transition group-hover:shadow-[0_0_26px_rgba(96,165,250,0.62)]
              "
            >
              <Search className="h-3.5 w-3.5 text-[#07111f]" />
            </span>
          </div>

          {/* Icono móvil */}
          <div className="pointer-events-none flex items-center sm:hidden">
            <Search className="h-4 w-4 text-[#bfdbfe]/75" />
          </div>

          {/* Input */}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            aria-label="Buscar productos"
            className="
              flex-1 border-0 bg-transparent
              text-sm text-white placeholder:text-white/35
              focus:outline-none focus:ring-0 sm:text-[0.95rem]
            "
          />

          {/* Estado */}
          <div className="hidden items-center gap-2 pr-1 text-[10px] text-white/45 md:flex">
            {!hasValue ? (
              <span className="uppercase tracking-[0.14em] text-[#cbd5e1]/70">
                BÚSQUEDA ACTIVA
              </span>
            ) : (
              <span className="uppercase tracking-[0.14em] text-[#93c5fd]">
                {value.length} CARACTERES
              </span>
            )}
          </div>

          {/* Limpiar */}
          {hasValue && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="
                relative ml-1 flex h-6 w-6 items-center justify-center rounded-full
                border border-[#60a5fa]/20
                bg-[#60a5fa]/10
                transition hover:bg-[#60a5fa]/15
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#60a5fa]
              "
              aria-label="Limpiar búsqueda"
            >
              <X className="h-3.5 w-3.5 text-[#dbeafe]/80" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
