import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaArrowRight,
  FaCampground,
  FaFish,
  FaLifeRing,
  FaSearch,
  FaTag,
  FaWhatsapp
} from 'react-icons/fa';
import { siteConfig } from '../../config/siteConfig';

/*
 * Benjamin Orellana - 2026-02-22 - Sección de productos rediseñada con foco e-commerce (imagen + categorías + CTA), visualmente distinta al hero y preparada para N productos.
 */

const defaultProducts = [
  {
    id: 1,
    name: 'Caña Spinning Río 2.10m',
    category: 'Pesca',
    shortDesc: 'Liviana, versátil y cómoda para salidas recreativas.',
    audience: 'Principiantes / uso general',
    tags: ['Spinning', 'Liviana', 'Versátil'],
    badge: 'Destacado',
    image:
      'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 2,
    name: 'Reel Frontal 3000',
    category: 'Pesca',
    shortDesc: 'Buen balance para río y laguna, ideal para jornadas largas.',
    audience: 'Pesca variada',
    tags: ['Reel', 'Frontal', 'Balanceado'],
    badge: 'Recomendado',
    image:
      'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 3,
    name: 'Caja Organizadora de Señuelos',
    category: 'Accesorios',
    shortDesc: 'Ordená tus accesorios y tené todo listo para la salida.',
    audience: 'Organización de equipo',
    tags: ['Accesorios', 'Resistente', 'Práctica'],
    image:
      'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 4,
    name: 'Linterna Recargable Camping',
    category: 'Camping',
    shortDesc: 'Iluminación confiable para campamento y pesca nocturna.',
    audience: 'Camping / nocturna',
    tags: ['Camping', 'Recargable', 'Portátil'],
    badge: 'Nuevo',
    image:
      'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 5,
    name: 'Kit Accesorios de Pesca',
    category: 'Accesorios',
    shortDesc: 'Set útil para arrancar o reponer lo básico antes de salir.',
    audience: 'Inicio / reposición',
    tags: ['Kit', 'Práctico', 'Salida rápida'],
    image:
      'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 6,
    name: 'Conservadora Compacta',
    category: 'Camping',
    shortDesc: 'Ideal para salidas cortas: bebida, carnada y básicos.',
    audience: 'Salidas de día',
    tags: ['Conservadora', 'Compacta', 'Camping'],
    image:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80'
  }
];

const categoriesBase = ['Todos', 'Pesca', 'Camping', 'Accesorios'];

const itemAnim = {
  hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.04,
      duration: 0.38,
      ease: [0.22, 1, 0.36, 1]
    }
  }),
  exit: { opacity: 0, y: 10, scale: 0.985, transition: { duration: 0.18 } }
};

function getCategoryIcon(category) {
  const c = String(category || '').toLowerCase();
  if (c.includes('camp')) return FaCampground;
  if (c.includes('acces')) return FaLifeRing;
  return FaFish;
}

function buildWhatsAppUrl(productName) {
  const base =
    siteConfig?.social?.whatsapp?.url ||
    `https://wa.me/${siteConfig?.contact?.phoneRaw || ''}`;

  const defaultMsg =
    siteConfig?.contact?.whatsappMessage ||
    'Hola, quisiera consultar por productos de pesca/camping.';

  const msg = `${defaultMsg} Me interesa: ${productName}.`;
  const sep = base.includes('?') ? '&' : '?';

  return `${base}${sep}text=${encodeURIComponent(msg)}`;
}

function scrollToHash(sectionId) {
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

export default function ProductsSection({
  products = defaultProducts,
  title = 'Productos',
  subtitle = 'Una selección visual de pesca, camping y accesorios. Elegí lo que te interesa y consultanos por WhatsApp para asesorarte mejor.',
  limit = null
}) {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [query, setQuery] = useState('');

  const normalizedProducts = useMemo(() => {
    const safe = Array.isArray(products) ? products : [];
    const sliced =
      Number.isInteger(limit) && limit > 0 ? safe.slice(0, limit) : safe;

    return sliced.map((p, idx) => ({
      id: p?.id ?? `prod-${idx}`,
      name: p?.name ?? 'Producto',
      category: p?.category ?? 'Producto',
      shortDesc: p?.shortDesc ?? 'Consultanos por este producto.',
      audience: p?.audience ?? 'Consulta personalizada',
      tags: Array.isArray(p?.tags) ? p.tags : [],
      badge: p?.badge || '',
      image: p?.image || '',
      priceLabel: p?.priceLabel || 'Consultar precio'
    }));
  }, [products, limit]);

  const categories = useMemo(() => {
    const dynamic = [
      ...new Set(
        normalizedProducts
          .map((p) => p.category)
          .filter(Boolean)
          .map((x) => String(x))
      )
    ];
    return categoriesBase.filter((c) => c === 'Todos' || dynamic.includes(c));
  }, [normalizedProducts]);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();

    return normalizedProducts.filter((p) => {
      const okCategory =
        activeCategory === 'Todos' || p.category === activeCategory;

      const okQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => String(t).toLowerCase().includes(q));

      return okCategory && okQuery;
    });
  }, [normalizedProducts, activeCategory, query]);

  const featuredProduct = filteredProducts[0] || null;
  const gridProducts = featuredProduct ? filteredProducts.slice(1) : [];

  return (
    <section
      id="productos"
      className="relative py-12 sm:py-14 lg:py-16"
      aria-label="Productos"
    >
      <div className="rp-container">
        {/* Header visual distinto al hero */}
        <div className="mb-5 sm:mb-6 lg:mb-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-white/90 border border-white/10 bg-white/5 backdrop-blur-sm">
                <FaTag className="text-[10px]" />
                <span className="font-semibold uppercase tracking-[0.12em]">
                  Catálogo visual
                </span>
              </div>

              <h2 className="font-bignoodle mt-3 text-white text-[1.8rem] sm:text-[2.15rem] lg:text-[2.5rem] font-extrabold tracking-[-0.03em] leading-[1.02]">
                {title}
              </h2>

              <p className="font-messina mt-3 text-sm sm:text-base lg:text-lg text-white/75 leading-relaxed">
                {subtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <SmallStat
                text={`${filteredProducts.length} resultado${filteredProducts.length === 1 ? '' : 's'}`}
              />
              <SmallStat text="Asesoramiento real" />
              <SmallStat text="WhatsApp directo" />
            </div>
          </div>
        </div>

        {/* Toolbar ecommerce */}
        <div
          className="rounded-2xl p-3 sm:p-4 mb-5 sm:mb-6"
          style={{
            background:
              'linear-gradient(180deg, rgba(6,18,33,0.55), rgba(7,20,36,0.42))',
            border: '1px solid rgba(255,255,255,0.10)',
            boxShadow:
              '0 16px 34px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.02)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}
        >
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Categorías */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const active = activeCategory === category;

                return (
                  <motion.button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    whileTap={{ scale: 0.98 }}
                    className="relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors"
                    style={{
                      color: active
                        ? 'rgba(255,255,255,0.98)'
                        : 'rgba(255,255,255,0.78)',
                      background: active
                        ? 'linear-gradient(180deg, rgba(121,196,234,0.18), rgba(84,164,206,0.08))'
                        : 'rgba(255,255,255,0.03)',
                      border: active
                        ? '1px solid rgba(121,196,234,0.22)'
                        : '1px solid rgba(255,255,255,0.07)',
                      boxShadow: active
                        ? '0 10px 20px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.03)'
                        : 'inset 0 1px 0 rgba(255,255,255,0.02)'
                    }}
                  >
                    <span className="uppercase tracking-[0.08em] text-[12px]">
                      {category}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Buscar */}
            <div className="relative w-full lg:w-[360px]">
              <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/45 text-sm" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar cañas, reels, camping..."
                className="w-full rounded-full pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/45 outline-none"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Layout más ecommerce: banner destacado + grid */}
        {featuredProduct ? (
          <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-4 sm:gap-5">
            <FeaturedProductCard product={featuredProduct} />

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4 sm:gap-5 content-start auto-rows-min self-start">
              {' '}
              <AnimatePresence mode="popLayout">
                {gridProducts.slice(0, 2).map((product, idx) => (
                  <CompactProductCard
                    key={product.id}
                    product={product}
                    idx={idx}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <EmptyProductsState
            onReset={() => {
              setActiveCategory('Todos');
              setQuery('');
            }}
          />
        )}

        {/* Grid complementario */}
        {gridProducts.length > 2 && (
          <div className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
            <AnimatePresence mode="popLayout">
              {gridProducts.slice(2).map((product, idx) => (
                <ProductTileCard key={product.id} product={product} idx={idx} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Footer humano / comercial */}
        <div className="mt-6 sm:mt-8">
          <div
            className="rounded-3xl p-4 sm:p-5 lg:p-6"
            style={{
              background:
                'linear-gradient(180deg, rgba(9,27,49,0.72), rgba(6,18,33,0.62))',
              border: '1px solid rgba(255,255,255,0.10)',
              boxShadow:
                '0 20px 44px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.03)'
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="max-w-2xl">
                <div className="text-white font-semibold text-base sm:text-lg">
                  ¿Buscás algo específico para tu salida?
                </div>
                <p className="mt-1.5 text-white/74 text-sm sm:text-base leading-relaxed">
                  Decinos qué tipo de pesca querés hacer o qué necesitás para
                  camping y te recomendamos opciones reales según presupuesto y
                  uso.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.a
                  href={buildWhatsAppUrl('asesoramiento para elegir productos')}
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
                      '0 14px 28px rgba(29,185,84,0.18), inset 0 1px 0 rgba(255,255,255,0.16)'
                  }}
                >
                  <FaWhatsapp />
                  <span className="uppercase tracking-[0.08em] text-sm">
                    Pedir asesoramiento
                  </span>
                </motion.a>

                <motion.button
                  type="button"
                  onClick={() => scrollToHash('carnadas')}
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
                    Ver carnadas
                  </span>
                  <FaArrowRight className="text-xs" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedProductCard({ product }) {
  const Icon = getCategoryIcon(product.category);

  return (
    <motion.article
      layout
      variants={itemAnim}
      initial="hidden"
      animate="show"
      exit="exit"
      className="group relative overflow-hidden rounded-3xl min-h-[340px] sm:min-h-[390px] xl:min-h-[420px]"
      style={{
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow:
          '0 22px 48px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.03)',
        background: '#081a2f'
      }}
    >
      <ProductImage image={product.image} alt={product.name} />

      {/* overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(3,10,18,0.18) 0%, rgba(4,12,22,0.44) 45%, rgba(5,14,26,0.88) 100%)'
        }}
      />

      {/* glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(420px 180px at 82% 8%, rgba(121,196,234,0.16), transparent 60%)'
        }}
      />

      <div className="absolute inset-0 p-4 sm:p-5 lg:p-6 flex flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.10em] text-white/95 border border-white/15 bg-white/10 backdrop-blur-sm">
              <Icon className="text-[10px]" />
              {product.category}
            </span>

            {product.badge ? (
              <span className="inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.10em] text-white border border-cyan-200/25 bg-cyan-300/10 backdrop-blur-sm">
                {product.badge}
              </span>
            ) : null}
          </div>

          <span className="inline-flex rounded-full px-3 py-1.5 text-[11px] font-semibold text-white/92 border border-white/15 bg-black/25 backdrop-blur-sm">
            {product.priceLabel}
          </span>
        </div>

        <div>
          <h3 className="text-white text-[1.3rem] sm:text-[1.55rem] lg:text-[1.8rem] font-extrabold tracking-[-0.02em] leading-[1.05] max-w-[18ch]">
            {product.name}
          </h3>

          <p className="mt-2 text-white/80 text-sm sm:text-base leading-relaxed max-w-[55ch]">
            {product.shortDesc}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {(product.tags || []).slice(0, 4).map((tag) => (
              <span
                key={`${product.id}-${tag}`}
                className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] text-white/88 border border-white/12 bg-white/6 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <motion.a
              href={buildWhatsAppUrl(product.name)}
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
                  '0 14px 28px rgba(29,185,84,0.18), inset 0 1px 0 rgba(255,255,255,0.15)'
              }}
            >
              <FaWhatsapp />
              <span className="uppercase tracking-[0.08em] text-sm">
                Consultar por WhatsApp
              </span>
            </motion.a>

            <motion.button
              type="button"
              onClick={() => scrollToHash('info')}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.985 }}
              className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-white/92 font-semibold border border-white/12 bg-white/8 backdrop-blur-sm"
            >
              <span className="uppercase tracking-[0.08em] text-sm">
                Ver más
              </span>
              <FaArrowRight className="text-xs" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function CompactProductCard({ product, idx = 0 }) {
  const Icon = getCategoryIcon(product.category);

  return (
    <motion.article
      layout
      custom={idx}
      variants={itemAnim}
      initial="hidden"
      animate="show"
      exit="exit"
      whileHover={{ y: -2 }}
      className="group relative overflow-hidden rounded-3xl"
      style={{
        background:
          'linear-gradient(180deg, rgba(8,24,42,0.78), rgba(7,20,36,0.68))',
        border: '1px solid rgba(255,255,255,0.10)',
        boxShadow:
          '0 16px 34px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.02)'
      }}
    >
      <div className="grid grid-cols-[112px_1fr] sm:grid-cols-[120px_1fr]">
        <div className="relative h-full min-h-[128px]">
          <ProductImage image={product.image} alt={product.name} />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(4,12,22,0.20), rgba(4,12,22,0.05))'
            }}
          />
        </div>

        <div className="p-3.5 sm:p-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.10em] font-semibold text-white/88 border border-white/10 bg-white/5">
              <Icon className="text-[9px]" />
              {product.category}
            </span>
            {product.badge ? (
              <span className="inline-flex rounded-full px-2 py-1 text-[10px] uppercase tracking-[0.10em] font-semibold text-cyan-100 border border-cyan-200/20 bg-cyan-300/8">
                {product.badge}
              </span>
            ) : null}
          </div>

          <h3 className="mt-2 text-white font-semibold leading-snug text-[0.98rem]">
            {product.name}
          </h3>

          <p className="mt-1.5 text-white/68 text-xs sm:text-[13px] leading-relaxed line-clamp-2">
            {product.shortDesc}
          </p>

          <div className="mt-3 flex items-center justify-between gap-2">
            <span className="text-white/86 text-xs font-semibold">
              {product.priceLabel}
            </span>

            <motion.a
              href={buildWhatsAppUrl(product.name)}
              target="_blank"
              rel="noreferrer"
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold text-white border border-white/12 bg-white/6 hover:bg-white/10 transition-colors"
            >
              <FaWhatsapp className="text-[11px]" />
              Consultar
            </motion.a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ProductTileCard({ product, idx = 0 }) {
  const Icon = getCategoryIcon(product.category);

  return (
    <motion.article
      layout
      custom={idx}
      variants={itemAnim}
      initial="hidden"
      animate="show"
      exit="exit"
      whileHover={{ y: -2 }}
      className="group relative overflow-hidden rounded-3xl"
      style={{
        background:
          'linear-gradient(180deg, rgba(7,21,37,0.84), rgba(7,20,36,0.76))',
        border: '1px solid rgba(255,255,255,0.10)',
        boxShadow:
          '0 16px 34px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.02)'
      }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <ProductImage image={product.image} alt={product.name} />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(3,9,16,0.06) 0%, rgba(4,12,22,0.55) 100%)'
          }}
        />

        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.10em] font-semibold text-white border border-white/14 bg-black/20 backdrop-blur-sm">
            <Icon className="text-[9px]" />
            {product.category}
          </span>
        </div>

        {product.badge ? (
          <div className="absolute right-3 top-3">
            <span className="inline-flex rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.10em] font-semibold text-white border border-cyan-200/25 bg-cyan-300/10 backdrop-blur-sm">
              {product.badge}
            </span>
          </div>
        ) : null}
      </div>

      <div className="p-4 sm:p-4.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-white font-semibold text-[1rem] leading-snug">
            {product.name}
          </h3>
          <span className="shrink-0 text-white/85 text-xs font-semibold">
            {product.priceLabel}
          </span>
        </div>

        <p className="mt-2 text-white/70 text-sm leading-relaxed line-clamp-2">
          {product.shortDesc}
        </p>

        {(product.tags || []).length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={`${product.id}-${tag}`}
                className="inline-flex rounded-full px-2 py-1 text-[10px] text-white/78 border border-white/8 bg-white/4"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center gap-2">
          <motion.a
            href={buildWhatsAppUrl(product.name)}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.985 }}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-white font-semibold"
            style={{
              background:
                'linear-gradient(135deg, rgba(29,185,84,0.96), rgba(37,211,102,0.96))',
              border: '1px solid rgba(255,255,255,0.16)',
              boxShadow:
                '0 10px 20px rgba(29,185,84,0.14), inset 0 1px 0 rgba(255,255,255,0.13)'
            }}
          >
            <FaWhatsapp className="text-sm" />
            <span className="text-[12px] uppercase tracking-[0.08em]">
              Consultar
            </span>
          </motion.a>

          <motion.button
            type="button"
            onClick={() => scrollToHash('info')}
            whileTap={{ scale: 0.985 }}
            className="inline-flex items-center justify-center gap-1 rounded-full px-3 py-2.5 text-white/88 border border-white/10 bg-white/5"
          >
            <span className="text-[12px] font-semibold uppercase tracking-[0.08em]">
              Ver
            </span>
            <FaArrowRight className="text-[10px]" />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

function ProductImage({ image, alt }) {
  if (image) {
    return (
      <img
        src={image}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        loading="lazy"
      />
    );
  }

  return (
    <div
      className="h-full w-full"
      style={{
        background:
          'radial-gradient(280px 120px at 70% 20%, rgba(121,196,234,0.18), transparent 60%), linear-gradient(180deg, #0b2743 0%, #091d33 100%)'
      }}
    />
  );
}

function SmallStat({ text }) {
  return (
    <span className="inline-flex items-center rounded-full px-3 py-1.5 text-xs text-white/84 border border-white/8 bg-white/4">
      {text}
    </span>
  );
}

function EmptyProductsState({ onReset }) {
  return (
    <div
      className="rounded-3xl p-8 text-center"
      style={{
        background:
          'linear-gradient(180deg, rgba(7,20,36,0.72), rgba(7,20,36,0.58))',
        border: '1px solid rgba(255,255,255,0.10)',
        boxShadow:
          '0 18px 40px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.02)'
      }}
    >
      <div className="text-white text-lg font-semibold">
        No encontramos productos con ese filtro
      </div>
      <p className="mt-2 text-white/70 text-sm sm:text-base">
        Probá otra categoría o limpiá la búsqueda.
      </p>
      <motion.button
        type="button"
        onClick={onReset}
        whileTap={{ scale: 0.985 }}
        className="mt-4 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-white font-semibold border border-white/12 bg-white/6"
      >
        Mostrar todo
      </motion.button>
    </div>
  );
}
