import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import DressCard from '../../components/DressCard';
import { ACCESORIOS_GROUP, loadPrimaryImage } from '../../Images/Boyas/boyas';
import SearchBar from '../../components/Common/SearchBar';
import EmptyStateGalactic from '../../components/Common/EmptyStateGalactic';

const norm = (s = '') =>
  s
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

export default function FeaturedProductsBoyas({
  title = 'Productos - Boyas',
  initialBatch = 12,
  batchSize = 12
}) {
  const GOLD = 'from-[#f4f4f3] via-[#ffffff] to-[#212ca3]';

  const groups = useMemo(
    () =>
      ACCESORIOS_GROUP.map((g) => ({
        ...g,
        imageLoader: () => loadPrimaryImage(g)
      })),
    []
  );

  const [visibleCount, setVisibleCount] = useState(initialBatch);
  const [query, setQuery] = useState('');

  const handleQueryChange = (valueOrEvent) => {
    const nextValue =
      typeof valueOrEvent === 'string'
        ? valueOrEvent
        : (valueOrEvent?.target?.value ?? '');

    setQuery(nextValue);
  };

  const filteredGroups = useMemo(() => {
    if (!query) return groups;

    const q = norm(query);

    return groups.filter((g) => {
      const name = norm(g.name);
      const category = norm(g.category || '');
      const slug = norm(g.slug || '');
      return name.includes(q) || category.includes(q) || slug.includes(q);
    });
  }, [groups, query]);

  useEffect(() => {
    setVisibleCount(initialBatch);
  }, [query, initialBatch]);

  const visibleGroups = filteredGroups.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredGroups.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + batchSize);
  };

  return (
    <section className="relative px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl" id="featured-products">
        <div className="mb-6">
          <h2 className="text-center font-bignoodle text-3xl uppercase tracking-tight sm:text-4xl md:text-left md:text-5xl">
            <span
              className={`bg-gradient-to-b ${GOLD} bg-clip-text text-transparent`}
            >
              {title}
            </span>
          </h2>

          <div className="mt-4 max-w-md">
            <SearchBar
              value={query}
              onChange={handleQueryChange}
              placeholder="Buscar por nombre o categoría…"
            />

            <p className="mt-2 text-xs text-white/60">
              Total catálogo: {groups.length} · Filtrados:{' '}
              {filteredGroups.length} · Visibles: {visibleGroups.length}
            </p>
          </div>
        </div>

        {filteredGroups.length === 0 ? (
          <EmptyStateGalactic query={query} onReset={() => setQuery('')} />
        ) : (
          <>
            <div
              className="
                grid grid-cols-2 gap-2
                sm:grid-cols-3 sm:gap-3
                md:grid-cols-4
                lg:grid-cols-5
                xl:grid-cols-6
              "
              key={`${query}-${visibleCount}-${filteredGroups.length}`}
            >
              {visibleGroups.map((item) => (
                <motion.div
                  key={item.uid}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                  className="min-w-0"
                >
                  <DressCard item={item} compact />
                </motion.div>
              ))}
            </div>

            {canLoadMore && (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-black/70 px-4 py-2 text-sm text-white/90 transition hover:bg-black focus:outline-none focus:ring-2 focus:ring-[#a38321] focus:ring-offset-2 focus:ring-offset-black"
                >
                  Cargar más <ArrowRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
